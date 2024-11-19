package auth0

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/auth0-community/go-auth0"
	"github.com/gin-gonic/gin"
	jose "gopkg.in/square/go-jose.v2"
)

var (
	// Audience represents auth0s api audience
	Audience string
	// Domain represents auth0s api audience
	Domain string
)

// SetAuth0Variables sets the auth0 globals
func SetAuth0Variables() {
	Audience = os.Getenv("AUTH0_API_IDENTIFIER")
	Domain = os.Getenv("AUTH0_DOMAIN")
}

// AuthRequired will verify that a token received from an http request
func AuthRequired() gin.HandlerFunc {
	return func(c *gin.Context) {
		var auth0Domain = "https://" + Domain + "/"
		client := auth0.NewJWKClient(auth0.JWKClientOptions{URI: auth0Domain + ".well-known/jwks.json"}, nil)
		configuration := auth0.NewConfiguration(client, []string{Audience}, auth0Domain, jose.RS256)
		validator := auth0.NewValidator(configuration, nil)
		_, err := validator.ValidateRequest(c.Request)

		if err != nil && os.Getenv("RUNNING_DEV_SERVER") != "true" {
			log.Println(err)
			terminateWithError(http.StatusUnauthorized, "token is not valid", c)
			return
		}
		c.Next()
	}
}

// SetUserBusinessMetadata will set the isBusiness flag in auth0
func SetUserBusinessMetadata(user UserStruct) error {
	userURL := "https://odysseycommerce.auth0.com/api/v2/users/" + user.ID
	pay := strings.NewReader("{\"user_metadata\":" + "{ \"isBusiness\":" + strconv.FormatBool(user.IsBusiness) + "}" + "}")
	req, _ := http.NewRequest("PATCH", userURL, pay)
	var authString = "Bearer " + GetManagementAccessToken()
	req.Header.Add("authorization", authString)
	req.Header.Add("content-type", "application/json")
	http.DefaultClient.Do(req)
	return nil
}

// SetUserBusinessIDMetadata will set the businessName flag in auth0
func SetUserBusinessIDMetadata(ID string, companyID int64) error {
	userURL := "https://odysseycommerce.auth0.com/api/v2/users/" + ID
	pay := strings.NewReader("{\"user_metadata\":" + "{ \"businessName\":" + strconv.FormatInt(companyID, 10) + "}" + "}")
	req, _ := http.NewRequest("PATCH", userURL, pay)
	var authString = "Bearer " + GetManagementAccessToken()
	req.Header.Add("authorization", authString)
	req.Header.Add("content-type", "application/json")
	http.DefaultClient.Do(req)
	return nil
}

// GetClientAccessToken gets a token for accessing the services protected with auth0
func GetClientAccessToken() string {
	tokenURL := "https://odysseycommerce.auth0.com/oauth/token"
	str := "{\"client_id\":\"" + os.Getenv("AUTH0_CLIENT_ID") + "\",\"client_secret\":\"" + os.Getenv("AUTH0_CLIENT_SECRET") + "\",\"audience\":\"https://odysseycommerce.com/api\",\"grant_type\":\"client_credentials\"}"
	payload := strings.NewReader(str)
	req, _ := http.NewRequest("POST", tokenURL, payload)
	req.Header.Add("content-type", "application/json")
	res, _ := http.DefaultClient.Do(req)
	defer res.Body.Close()
	token, _ := ioutil.ReadAll(res.Body)
	type Token struct {
		AccessToken string `form:"access_token" json:"access_token"`
	}
	var data Token
	_ = json.Unmarshal(token, &data)
	return data.AccessToken
}

// GetManagementAccessToken gets a token for accessing the auth0 management api
func GetManagementAccessToken() string {
	tokenURL := "https://odysseycommerce.auth0.com/oauth/token"
	str := "{\"client_id\":\"" + os.Getenv("AUTH0_MGMT_CLIENT_ID") + "\",\"client_secret\":\"" + os.Getenv("AUTH0_MGMT_CLIENT_SECRET") + "\",\"audience\":\"https://odysseycommerce.auth0.com/api/v2/\",\"grant_type\":\"client_credentials\"}"
	payload := strings.NewReader(str)
	req, _ := http.NewRequest("POST", tokenURL, payload)
	req.Header.Add("content-type", "application/json")
	res, _ := http.DefaultClient.Do(req)
	defer res.Body.Close()
	token, _ := ioutil.ReadAll(res.Body)
	type Token struct {
		AccessToken string `form:"access_token" json:"access_token"`
	}
	var data Token
	_ = json.Unmarshal(token, &data)
	return data.AccessToken
}

// AuthClaims defines some information we are getting from the JWT
type AuthClaims struct {
	AuthID string `json:"sub"`
	Email  string `json:"https://odysseycommerce.com/apiemail"`
}

// GetUserInformationFromToken validates the JWT and then returns the appropriate claims
func GetUserInformationFromToken(c *gin.Context) AuthClaims {
	Claims := AuthClaims{}
	var auth0Domain = "https://" + Domain + "/"
	client := auth0.NewJWKClient(auth0.JWKClientOptions{URI: auth0Domain + ".well-known/jwks.json"}, nil)
	configuration := auth0.NewConfiguration(client, []string{Audience}, auth0Domain, jose.RS256)
	validator := auth0.NewValidator(configuration, nil)
	token, err := validator.ValidateRequest(c.Request)
	if err != nil {
		log.Println(err)
		return Claims
	}
	err = token.UnsafeClaimsWithoutVerification(&Claims)
	if err != nil {
		log.Println(err)
		return Claims
	}
	return Claims
}

func terminateWithError(statusCode int, message string, c *gin.Context) {
	c.JSON(statusCode, gin.H{"error": message})
	c.Abort()
}

// UserStruct reflects the user values stored in the DB and is used for /login
type UserStruct struct {
	ID          string  `form:"sub" json:"sub"`
	First       string  `form:"given_name" json:"given_name" `
	Last        string  `form:"family_name" json:"family_name" `
	Email       string  `form:"email" json:"email" binding:"required"`
	IsBusiness  bool    `form:"isBusiness" json:"isBusiness"`
	OnboardStep float32 `form:"onboard_step" json:"onboard_step"`
}

// PatchUserStruct serves to patch existing user
type PatchUserStruct struct {
	ID          string  `form:"id" json:"id"`
	OnboardStep float32 `form:"onboard_step" json:"onboard_step"`
	CompanyID   int64   `form:"company_id" json:"company_id"`
}
