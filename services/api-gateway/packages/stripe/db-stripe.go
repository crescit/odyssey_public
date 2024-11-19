package stripe

import (
	"encoding/json"
	"log"

	// "strconv"
	"time"

	"github.com/crescit/odyssey/api/packages/cart"
	"github.com/crescit/odyssey/api/packages/products"
	pg "github.com/crescit/odyssey/api/postgres"
	"github.com/gin-gonic/gin"
	// "github.com/lib/pq"
)

// PostCreateStripeAccountDatabaseHandler registers the stripe id for the user
func PostCreateStripeAccountDatabaseHandler(stripeID string, email string) error {
	prepState := `INSERT INTO public.stripe (auth_id, stripe_id, company_id) 
	SELECT public.user.auth_id, :stripe_id, company.id
	FROM public.user INNER JOIN public.company as company ON public.user.email = company.email
	WHERE public.user.email = :email;`

	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return err
	}
	defer db.Close()

	_, err = db.NamedExec(prepState, map[string]interface{}{
		"stripe_id": stripeID,
		"email":     email,
	})
	if err != nil {
		log.Printf("%v%s", err, "error writing user to postgres")
		return err
	}
	db.Close()
	return nil
}

// GetStripeIDDatabaseHandler get the stripe id by user/auth id from the db
func GetStripeIDDatabaseHandler(userID string) (string, error) {
	getStripeID := "SELECT stripe_id FROM public.stripe WHERE public.stripe.auth_id = $1"

	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v %s", err, "error with database connection")
		return "", err
	}
	defer db.Close()

	var stripeID string
	row := db.QueryRow(getStripeID, userID)
	err = row.Scan(&stripeID)
	if err != nil {
		log.Printf("%v %s", err, "error with getting Stripe acct numbers")
		return "", err
	}
	db.Close()
	return stripeID, nil
}

// GetStripeIDByCompanyDatabaseHandler get the stripe id by company id from the db
func GetStripeIDByCompanyDatabaseHandler(companyID int) (string, error) {
	getStripeID := "SELECT stripe_id FROM public.stripe WHERE public.stripe.company_id = $1"

	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v %s", err, "error with database connection")
		return "", err
	}
	defer db.Close()

	var stripeID string
	row := db.QueryRow(getStripeID, companyID)
	err = row.Scan(&stripeID)
	if err != nil {
		log.Printf("%v %s", err, "error with getting Stripe acct numbers")
		return "", err
	}
	db.Close()
	return stripeID, nil
}

// SaveOrderDatabaseHandler saves a user's cart into orders and saves it with the stripe info
func SaveOrderDatabaseHandler(userID string, intentID string, cart *[]cart.CartStruct, total int64) error {
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return err
	}
	defer db.Close()
	Time := time.Now()
	prepState := "INSERT INTO public.order (customer_id, company_id, items, total, status, created, updated, intent_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);"

	// init transaction
	tx, err := db.Begin()
	if err != nil {
		log.Printf("%v%s", err, " unable to init transaction")
		return err
	}
	marshalled, _ := json.Marshal(cart)

	// init the order
	_, err = tx.Exec(prepState, userID, (*cart)[0].CompanyID, string(marshalled), total, "NEW", Time, Time, intentID)
	if err != nil {
		log.Printf("%v%s", err, "error inserting the order")
		tx.Rollback()
		return err
	}

	var vids []int
	for i := 0; i < len(*cart); i += 1 {
		vids = append(vids, (*cart)[i].VID)
	}

	//!!! CANNOT clear the cart until the payment success; should only delete items from the specific merchant; clearing the items from the cart is being executed through frontend after payment success
	// // clear the cart
	// deleteUserCart := "DELETE FROM public.cart WHERE customer_id = $1 AND vid=ANY($2)"
	// _, err = tx.Exec(deleteUserCart, userID, pq.Array(vids))
	// if err != nil {
	// 	log.Printf("%v%s", err, "unable to clear user's cart")
	// 	tx.Rollback()
	// 	return err
	// }

	tx.Commit()
	db.Close()
	return nil
}

// PostPaymentSucceededDatabaseHandler finds an order by payment intent id to update the order status, update customer cart items, and update product inventory_count
func PostPaymentSucceededDatabaseHandler(c *gin.Context, id string) error {
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return err
	}
	defer db.Close()
	// log.Print(id)
	Time := time.Now()
	updateCartStatus := "UPDATE public.order SET status = :status, updated = :updated WHERE intent_id = :intent_id"
	_, err = db.NamedExec(updateCartStatus, map[string]interface{}{
		"status":    "PAID",
		"updated":   Time,
		"intent_id": id,
	})
	if err != nil {
		log.Printf("%v%s", err, "error updating the order")
		return err
	}

	getOrderItemsDetails := `SELECT customer_id, company_id, items, status FROM public.order WHERE intent_id = $1`
	row := db.QueryRow(getOrderItemsDetails, id)
	var (
		uid, status string
		compid      int64
		items       string
	)
	err = row.Scan(&uid, &compid, &items, &status)

	var cartItems []cart.CartStruct
	err = json.Unmarshal([]byte(items), &cartItems)
	if err != nil {
		log.Printf("%v %s", err, "error with cart item array of metadata")
		return err
	}
	db.Close()

	// getting list of products to update count; user cart items are removed through frontend
	// var vids []int64
	prodNumSold := make(map[int]int) // key is the pid and value is the quantity sold
	for _, item := range cartItems {
		// vidStr := strconv.Itoa(item.VID)
		// vid, _ := strconv.ParseInt(vidStr, 10, 64)
		// vids = append(vids, vid)
		if prodNumSold[item.ProductID] == 0 {
			prodNumSold[item.ProductID] = -item.Quantity
		} else {
			prodNumSold[item.ProductID] -= item.Quantity
		}
	}

	// err = cart.DeleteUserCartDatabaseHandler(c, uid, vids)
	if err != nil {
		log.Printf("%v %s", err, "error deleteing product from user cart, in db-stripe.go")
		return err
	}
	err = products.PatchProductCountDatabaseHandler(prodNumSold)
	if err != nil {
		log.Printf("%v %s", err, "error update product counts, in db-stripe.go")
		return err
	}

	return nil
}
