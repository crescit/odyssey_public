package stripe

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/crescit/odyssey/api/packages/auth0"
	"github.com/crescit/odyssey/api/packages/cart"
	"github.com/gin-gonic/gin"

	"github.com/shopspring/decimal"
	"github.com/stripe/stripe-go/v72"
	stripeAccount "github.com/stripe/stripe-go/v72/account"
	stripeAcctLink "github.com/stripe/stripe-go/v72/accountlink"
	paymentIntent "github.com/stripe/stripe-go/v72/paymentintent"
	paymentMethod "github.com/stripe/stripe-go/v72/paymentmethod"
	"github.com/stripe/stripe-go/webhook"
)

// ---- HELPER FUNCTIONS -----------

// return the appropriate stripe key depending on the environment
func getStripeKey() string {
	if os.Getenv("IS_PRODUCTION_ENV") == "true" {
		return os.Getenv("STRIPE_PROD_KEY")
	}
	return os.Getenv("STRIPE_TEST_KEY")
}

// return the appropriate stripe password depending on the environment
func getStripePassword() string {
	if os.Getenv("RUNNING_DEV_SERVER") == "false" {
		return os.Getenv("STRIPE_PROD_PASSWORD")
	}
	return os.Getenv("STRIPE_TEST_PASSWORD")
}

// return the appropriate refresh or return urls for stripe acct link depending on the environment
func getRefreshReturnURL(key string) string {
	if os.Getenv("RUNNING_DEV_SERVER") == "false" {
		return os.Getenv("STRIPELINK_" + key + "_PROD_URL")
	}
	return os.Getenv("STRIPELINK_" + key + "_TEST_URL")
}

// CreateStripeAccount creates a new stripe express account
func createStripeAccount(email string) (stripe.Account, error) {
	stripe.Key = getStripeKey()

	params := &stripe.AccountParams{
		Country: stripe.String("US"),
		Email:   stripe.String(email),
		Type:    stripe.String(string(stripe.AccountTypeExpress)),
	}

	account, error := stripeAccount.New(params)
	if error != nil {
		log.Printf("%v%s", error, "unable to link stripe account")
		return *account, error
	}

	return *account, nil
}

// createStripeAcctLinkAndRedirect create Stripe acct link which grants a connected account permission to access Stripe-hosted applications; when successful redirect users to the one-time use URL to send them into the Connect Onboarding flow
func createStripeAcctLinkAndRedirect(c *gin.Context, acct string) (stripe.AccountLink, error) {
	stripe.Key = getStripeKey()
	refreshurl := getRefreshReturnURL("REFRESH")
	returnurl := getRefreshReturnURL("RETURN")

	params := &stripe.AccountLinkParams{
		Account:    stripe.String(acct),
		RefreshURL: stripe.String(refreshurl),
		// TODO need to find a better return URL
		ReturnURL: stripe.String(returnurl),
		Type:      stripe.String("account_onboarding"),
	}
	acctlink, error := stripeAcctLink.New(params)
	if error != nil {
		log.Printf("%v%s", error, "unable to create stripe account link")
		return *acctlink, error
	}

	return *acctlink, nil
}

// takes in an array of floats and returns the int64 of that total x 100 (for cents)
func newStripePricing(cart *[]cart.CartStruct) int64 {
	// stripe will return an error if total is 0 so return 0 on error state
	total := decimal.NewFromInt(0)
	for i := 0; i < len(*cart); i++ {
		itemPrice := decimal.NewFromFloat((*cart)[i].Total)
		total = total.Add(itemPrice)
	}
	totalInt := total.Mul(decimal.NewFromInt(100)).IntPart()
	return totalInt
}

// ---- ROUTE HANDLERS -----------

// GetStripeAcctInfoHandler retrieves acct info from Stripe's Account API
func GetStripeAcctInfoHandler(c *gin.Context) {
	userID := auth0.GetUserInformationFromToken(c).AuthID
	stripeID, err := GetStripeIDDatabaseHandler(userID)
	if err != nil || stripeID == "" {
		log.Print("can not find user's Stripe ID")
		c.AbortWithStatus(404)
		return
	}

	stripe.Key = getStripeKey()
	acctInfo, err := stripeAccount.GetByID(stripeID, nil)
	if err != nil || stripeID == "" {
		log.Print("error in getting Stripe Acct info")
		c.AbortWithStatus(404)
		return
	}

	c.JSON(http.StatusOK, acctInfo)
}

// GetStripeIDByCompanyIDHandler retrieves Stripe ID via company ID
func GetStripeIDByCompanyIDHandler(c *gin.Context) {
	companyID, err := strconv.Atoi(c.Param("companyID"))
	if err != nil {
		log.Print("bad company ID")
		c.AbortWithStatus(400)
		return
	}

	stripeID, err := GetStripeIDByCompanyDatabaseHandler(companyID)
	if err != nil || stripeID == "" {
		log.Print("can not find merchant's Stripe ID")
		c.AbortWithStatus(404)
		return
	}

	c.JSON(http.StatusOK, stripeID)
}

// GetPaymentMethodHandler retrieves Stripe payment method obj via payment method ID
func GetPaymentMethodHandler(c *gin.Context) {
	stripe.Key = getStripeKey()

	pmtMethID := c.Param("pmid")
	pmtMethod, err := paymentMethod.Get(pmtMethID, nil)
	if err != nil {
		log.Print("can not find payment method for the ID provided")
		// c.AbortWithStatus(404)
		// return
	}

	c.JSON(http.StatusOK, pmtMethod)
}

// PostCreateStripeAccountHandler takes in an email and creates an express stripe account
func PostCreateStripeAccountHandler(c *gin.Context) {
	// unmarshal request body
	var body StripeCreateAccountRequest
	err := c.Bind(&body)
	if err != nil {
		log.Print("Unable to bind body in PostCreateStripeAccountHandler")
		c.AbortWithStatus(400)
		return
	}

	// create the stripe account
	acc, error := createStripeAccount(body.Email)
	if error != nil {
		log.Print("Unable to register stripe user")
		c.AbortWithStatus(400)
		return
	}

	// register in postgres
	error = PostCreateStripeAccountDatabaseHandler(acc.ID, body.Email)
	if error != nil {
		log.Print("Unable to register stripe user in SQL")
		c.AbortWithStatus(400)
		return
	}

	// create the stripe accountlink and redirect
	acctlink, _ := createStripeAcctLinkAndRedirect(c, acc.ID)

	c.JSON(http.StatusOK, gin.H{
		"message":  "SUCCESS",
		"account":  acc,
		"acctlink": acctlink,
	})
}

func removeCartItem(s []cart.CartStruct, i int) []cart.CartStruct {
	s[i] = s[len(s)-1]
	return s[:len(s)-1]
}

// PostStripePaymentIntentHandler creates a payment intent for a user
func PostStripePaymentIntentHandler(c *gin.Context) {
	var body PostStripePaymentRequestStruct
	err := c.Bind(&body)
	if err != nil {
		log.Print(err)
		c.AbortWithStatus(400)
		return
	}
	// get stripe and authid from context
	stripe.Key = getStripeKey()
	userID := auth0.GetUserInformationFromToken(c).AuthID
	// retrieve user's cart information for the selected merchant/company
	cartItems, err := cart.GetUserCartDatabaseHandler(c, userID)

	i := 0
	for i < len(*cartItems) {
		companyID := (*cartItems)[i].CompanyID
		if companyID != body.CompanyID {
			*cartItems = removeCartItem(*cartItems, i)
		} else {
			i += 1
		}
	}

	if err != nil || len(*cartItems) == 0 {
		log.Print("unable to fetch users cart")
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	total := newStripePricing(cartItems)

	// get the merchant stripe id from the company cart
	stripeID, err := GetStripeIDByCompanyDatabaseHandler(body.CompanyID)
	if err != nil || stripeID == "" {
		log.Print("can not find merchant's Stripe ID")
		c.AbortWithStatus(404)
		return
	}

	// parse the odyssey application fee percentage
	appFee, _ := decimal.NewFromString(os.Getenv("ODYSSEY_APPLICATION_FEE"))
	appFeeTotal := decimal.NewFromInt(total).Mul(appFee.Mul(decimal.NewFromFloat(.01))).IntPart()

	// set up the payment intent
	params := &stripe.PaymentIntentParams{
		PaymentMethodTypes: stripe.StringSlice([]string{
			"card",
		}),
		Amount:               stripe.Int64(total),
		Currency:             stripe.String(string(stripe.CurrencyUSD)),
		ApplicationFeeAmount: stripe.Int64(appFeeTotal),
	}

	params.SetStripeAccount(stripeID)
	pi, err := paymentIntent.New(params)
	if err != nil {
		log.Print("unable to make payment intent")
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	// !!! the order have not been paid at this point
	err = SaveOrderDatabaseHandler(userID, pi.ID, cartItems, total)
	if err != nil {
		log.Print("unable to save user's order")
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	c.JSON(200, pi)
}

// PostOnboardStripeAcctLinkHandler retry creating account link again
func PostOnboardStripeAcctLinkHandler(c *gin.Context) {
	// get user's stripe acct id
	userID := auth0.GetUserInformationFromToken(c).AuthID
	stripeAcct, err := GetStripeIDDatabaseHandler(userID)
	if err != nil || stripeAcct == "" {
		log.Print("error in getting user's Stripe acct")
		c.AbortWithStatus(404)
		return
	}

	// create acct link
	acctlink, _ := createStripeAcctLinkAndRedirect(c, stripeAcct)

	c.JSON(http.StatusOK, gin.H{
		"message":  "SUCCESS",
		"acctlink": acctlink,
	})
}

// PostPaymentSucceededHandler updates the status of an order when stripe confirms a payment intent, remove items from user's cart, and update product inventory_count
func PostPaymentSucceededHandler(c *gin.Context) {
	stripeSigningSecret := os.Getenv("STRIPE_SIGNING_SECRET")
	payload, _ := ioutil.ReadAll(c.Request.Body)
	event, err := webhook.ConstructEvent(payload, c.Request.Header.Get("Stripe-Signature"), stripeSigningSecret)
	if err != nil {
		c.AbortWithStatus(403)
		return
	}
	if event.Type == "payment_intent.succeeded" {
		ID := fmt.Sprintf("%v", event.Data.Object["id"])
		// example := "pi_1IV21hQWqJnpCBffj6iWFl2T"
		err := PostPaymentSucceededDatabaseHandler(c, ID)
		if err != nil {
			c.AbortWithStatus(403)
			return
		}
	}
}
