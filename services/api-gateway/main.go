package main

import (
	"encoding/json"
	"log"
	"os"
	"time"

	"github.com/crescit/odyssey/api/packages/auth0"
	"github.com/crescit/odyssey/api/packages/cart"
	"github.com/crescit/odyssey/api/packages/orders"
	"github.com/crescit/odyssey/api/packages/postgis"
	"github.com/crescit/odyssey/api/packages/products"
	"github.com/crescit/odyssey/api/packages/shopify"
	"github.com/crescit/odyssey/api/packages/stripe"
	"github.com/crescit/odyssey/api/packages/users"
	pg "github.com/crescit/odyssey/api/postgres"
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func init() {
	// loads values from .env into the system
	if err := godotenv.Load(); err != nil {
		log.Print("No .env file found")
	}

	if os.Getenv("RUNNING_DEV_SERVER") == "false" {
		log.Printf("RUNNING API-GATEWAY IN RELEASE MODE")
		gin.SetMode(gin.ReleaseMode)
		os.Setenv("GIN_MODE", "release")
	}
}

// main entry point for the server
func main() {
	r := gin.New()

	// Gin middleware
	r.Use(gin.Recovery())
	r.Use(gzip.Gzip(gzip.DefaultCompression))
	r.Use(jsonLoggerMiddleware())

	// set up cors
	var corsConfig cors.Config

	prodConfig := cors.Config{
		AllowOrigins:     []string{"http://localhost", "http://localhost:3000", "https://odysseycommerce.com", "http://odysseycommerce.com", "https://www.odysseycommerce.com", "http://www.odysseycommerce.com"},
		AllowMethods:     []string{"PUT", "PATCH", "GET", "POST", "HEAD", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization", "X-HTTP-Method-Override"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}

	devConfig := cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"PUT", "PATCH", "GET", "POST", "HEAD", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization", "X-HTTP-Method-Override"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}

	if os.Getenv("RUNNING_DEV_SERVER") == "true" {
		corsConfig = devConfig
	} else {
		corsConfig = prodConfig
	}
	r.Use(cors.New(corsConfig))

	// auth0 environmental handlers
	api := r.Group("/")
	apiUnrestricted := r.Group("/")

	if os.Getenv("RUNNING_DEV_SERVER") != "true" {
		auth0.SetAuth0Variables()
		api.Use(auth0.AuthRequired())
	}

	// ! only run when there's db migrations to be made
	if os.Getenv("RUN_POSTGRES_MIGRATIONS") == "true" {
		pg.RunMigrations()
	}

	// CART ENDPOINTS
	api.GET("/cart/user", cart.GetUserCartHandler)
	api.POST("/cart", cart.PostCreateCartHandler)
	api.PATCH("/cart", cart.PatchUserCartHandler)
	api.POST("/cart/user", cart.DeleteUserCartHandler) // DELETE call
	// api.POST("/cart/user/:variantID", cart.DeleteUserCartHandler) // DELETE call

	// ORDER ENDPOINTS
	api.GET("/order/:orderID", orders.GetOrderHandler)
	api.GET("/orders", orders.GetUserOrdersHandler)
	api.POST("/order", orders.PostCreateOrderHandler)
	api.PATCH("/order/:orderID/:status", orders.PatchOrderStatusHandler)

	// POSTGIS (GEOLOCATION) ENDPOINTS
	apiUnrestricted.GET("/geolocation/companies", postgis.GetCompaniesWithLocationHandler)
	api.POST("/geolocation/user-address", postgis.PostCreateUserAddressHandler)

	// PRODUCT ENDPOINTS
	apiUnrestricted.GET("/getall/products", products.SearchProductOrCategoriesHandler)
	apiUnrestricted.GET("/search/products", products.SearchProductOrCategoriesHandler)
	apiUnrestricted.GET("/search/categories", products.SearchProductOrCategoriesHandler)
	apiUnrestricted.GET("/products/:companyID", products.GetCompanyProductsHandler)
	apiUnrestricted.GET("/product/:productID", products.GetProductByPIDHandler)
	api.GET("/variants/:productID", products.GetVariantsFromPIDHandler)
	api.POST("/variant", products.PostCreateVariantHandler)
	api.POST("/product", products.PostCreateProductHandler)
	api.POST("/product/img", products.PostCreateProductImageHandler)
	api.PATCH("/product", products.PATCHProductHandler)
	api.PATCH("/product/img", products.PATCHProductImageHandler)
	api.POST("/product/img/:productID/:companyID", products.DELETEProductImageHandler) // DELETE call

	// SHOPIFY ENDPOINTS
	apiUnrestricted.GET("/companies/:companyID", shopify.GetCompanyByIDHandler)
	apiUnrestricted.GET("/getall/companies", shopify.SearchCompaniesHandler)
	apiUnrestricted.GET("/search/companies", shopify.SearchCompaniesHandler)
	api.GET("/company", shopify.GetCompanyByEmailHandler)
	api.POST("/company/logo", shopify.PostCreateCompanyLogoHandler)
	api.POST("/shopify-business", shopify.PostCreateShopifyBusinessHandler)
	api.POST("/shopify-product-data", shopify.PostCreateShopifyProductDataHandler)
	api.POST("/shopify-business/variant/:variantID/:companyID", shopify.DeleteShopifyVariantHandler)  // DELETE call
	api.POST("/shopify-business/products/:productID/:companyID", shopify.DeleteShopifyProductHandler) // DELETE call
	api.PATCH("/shopify-business/variant/:variantID/:companyID", shopify.PatchShopifyVariantHandler)

	// STRIPE ENDPOINTS
	apiUnrestricted.POST("/stripe/payment-succeeded", stripe.PostPaymentSucceededHandler)
	api.GET("/stripe/acctinfo/user", stripe.GetStripeAcctInfoHandler)
	api.GET("/stripe/acctinfo/company/:companyID", stripe.GetStripeIDByCompanyIDHandler)
	api.GET("/stripe/payment-methods/:pmid", stripe.GetPaymentMethodHandler)
	api.POST("/stripe/payment-intent", stripe.PostStripePaymentIntentHandler)
	api.POST("/stripe/onboardstripeacctlink", stripe.PostOnboardStripeAcctLinkHandler)
	api.POST("/stripe/user", stripe.PostCreateStripeAccountHandler)

	// USER ENDPOINTS
	api.GET("/user", users.GetUserInfoHandler)
	api.POST("/user", users.PostCreateUserHandler)
	api.PATCH("/user", users.PatchUserHandler)

	r.Run()
}

func jsonLoggerMiddleware() gin.HandlerFunc {
	return gin.LoggerWithFormatter(
		func(params gin.LogFormatterParams) string {
			log := make(map[string]interface{})

			log["status_code"] = params.StatusCode
			log["path"] = params.Path
			log["method"] = params.Method
			log["start_time"] = params.TimeStamp.Format("2006/01/02 - 15:04:05")
			log["remote_addr"] = params.ClientIP
			log["response_time"] = params.Latency.String()

			s, _ := json.Marshal(log)
			return string(s) + "\n"
		},
	)
}
