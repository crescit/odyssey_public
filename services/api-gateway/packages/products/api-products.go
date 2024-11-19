package products

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"regexp"
	"strconv"
	"strings"

	"github.com/crescit/odyssey/api/packages/auth0"
	"github.com/crescit/odyssey/api/packages/shopify"

	"github.com/gin-gonic/gin"
)

//----------------- Products ------------------

// SearchProductOrCategoriesHandler takes in the search terms and returns products match them
func SearchProductOrCategoriesHandler(c *gin.Context) {
	urlPath := c.Request.URL.Path
	if len(urlPath) < 8 {
		c.JSON(http.StatusBadRequest, "url route too short")
		return
	}
	searchfor := urlPath[8:len(urlPath)]
	// getall := urlPath[1:7]
	searchterm := c.DefaultQuery("searchterm", "")
	limit := c.DefaultQuery("limit", "48")
	offset := c.DefaultQuery("offset", "0")

	var searchWordList []string
	var searchLikeWordList []string
	// parsing the search term into individual word
	// re := regexp.MustCompile(`\s+|,+|\.+|\"+|\'+`)
	re := regexp.MustCompile(`\s+|\W+`)
	for _, word := range re.Split(searchterm, -1) {
		if word != "" && strings.ToLower(word) != "the" && strings.ToLower(word) != "a" {
			searchWordList = append(searchWordList, word)
			searchLikeWordList = append(searchLikeWordList, "%" + word + "%")
		}
	}

	var products []SearchReturnProductStruct
	var categories []CategoryStruct
	var hasMoreData int
	var err error
	if searchfor == "products" {
		if len(searchWordList) == 0 {
			orderby := "title ASC "
			// if getall == "getall" {
			// 	orderby = "random() "
			// }
			products, hasMoreData, err = GetAllProductsDatabaseHandler(c, orderby, limit, offset)
		} else {
			products, hasMoreData, err = SearchProductsDatabaseHandler(c, searchWordList, searchLikeWordList, limit, offset)
		}
	} else if searchfor == "categories" {
		if len(searchWordList) == 0 {
			categories, hasMoreData, err = GetAllCategoriesDatabaseHandler(c, limit, offset)
		} else {
			categories, hasMoreData, err = SearchCategoriesDatabaseHandler(c, searchWordList, searchLikeWordList, limit, offset)
		}
	}

	if err != nil {
		c.AbortWithStatus(400)
		return
	}
	if searchfor == "products" {
		// c.JSON(http.StatusOK, products)
		c.JSON(http.StatusOK, gin.H{
			"products": products,
			"hasMoreData":  hasMoreData,
		})
	} else if searchfor == "categories" {
		// c.JSON(http.StatusOK, categories)
		c.JSON(http.StatusOK, gin.H{
			"categories": categories,
			"hasMoreData":  hasMoreData,
		})
	} else {
		c.JSON(http.StatusBadRequest, "Wrong search type")
	}
}

// GetProductByPIDHandler takes in the product ID and returns the product details
func GetProductByPIDHandler(c *gin.Context) {
	pid, err := strconv.Atoi(c.Param("productID"))
	if err != nil {
		c.AbortWithStatus(400)
		return
	}

	products, hasMoreData, error := GetProductsByPIDDatabaseHandler(c, pid)
	if error != nil {
		c.AbortWithStatus(400)
		return
	}
	// c.JSON(http.StatusOK, products)
	c.JSON(http.StatusOK, gin.H{
		"products": products,
		"hasMoreData":  hasMoreData,
	})
}

// GetCompanyProductsHandler takes in the company ID and returns the products associated with it
func GetCompanyProductsHandler(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("companyID"))
	if err != nil {
		c.AbortWithStatus(400)
		return
	}

	// limit := c.DefaultQuery("limit", "4800")
	limit := c.Query("limit")
	offset := c.DefaultQuery("offset", "0")

	products, hasMoreData, error := GetCompanyProductsDatabaseHandler(c, id, limit, offset)
	if error != nil {
		c.AbortWithStatus(400)
		return
	}
	// c.JSON(http.StatusOK, products)
	c.JSON(http.StatusOK, gin.H{
		"products": products,
		"hasMoreData":  hasMoreData,
	})
}

// GetVariantsFromPIDHandler returns the variants for a PRODUCT
func GetVariantsFromPIDHandler(c *gin.Context) {
	var productID, err = strconv.Atoi(c.Param("productID"))
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	variants, error := GetCompanyVariantsDatabaseHandler(c, productID)
	if error != nil {
		c.AbortWithStatus(400)
		return
	}

	c.JSON(http.StatusOK, variants)
}

// PostCreateProductHandler creates a product for business
func PostCreateProductHandler(c *gin.Context) {
	var product ProductStruct
	err := c.Bind(&product)
	if err != nil {
		log.Print(err)
		c.AbortWithStatus(400)
		return
	}

	var Response PostProductResponseStruct
	userID := auth0.GetUserInformationFromToken(c).AuthID

	ID, error := PostCreateProductDatabaseHandler(c, product, userID)
	if error != nil {
		c.AbortWithStatus(400)
		return
	}
	Response.PID = ID

	c.JSON(http.StatusOK, Response)
}

// PostCreateVariantHandler creates a variant for a product
func PostCreateVariantHandler(c *gin.Context) {
	var variant VariantStruct
	err := c.Bind(&variant)
	if err != nil {
		log.Print(err)
		c.AbortWithStatus(400)
		return
	}

	var Response PostVariantResponseStruct

	ID, error := PostCreateVariantDatabaseHandler(c, variant)
	if error != nil {
		c.AbortWithStatus(400)
		return
	}

	Response.VID = ID

	c.JSON(http.StatusOK, Response)
}

// PostCreateProductImageHandler saves an image link for a certain product ID
func PostCreateProductImageHandler(c *gin.Context) {
	var ProductImageRequest ProductImageUploadRequest
	body, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		log.Print("Unable to bind request body")
		c.AbortWithStatus(400)
		return
	}
	json.Unmarshal(body, &ProductImageRequest)
	err = PostCreateProductImageDatabaseHandler(c, ProductImageRequest)
	if err != nil {
		log.Print(err)
		c.AbortWithStatus(400)
		return
	}
	c.JSON(http.StatusOK, ProductImageRequest.Link)
}

// PATCHProductHandler updates product fields for a specific product ID
func PATCHProductHandler(c *gin.Context) {
	var product PatchProductStruct
	err := c.Bind(&product)
	if err != nil {
		log.Print(err)
		c.AbortWithStatus(400)
		return
	}

	userEmail := auth0.GetUserInformationFromToken(c).Email
	company, err := shopify.GetCompanyByEmailDatabaseHandler(c, userEmail)
	if err != nil {
		c.AbortWithStatus(400)
		return
	}

	if company.ID != product.CompanyID {
		c.AbortWithStatus(403)
		return
	}

	response, err := PATCHProductDatabaseHandler(c, product)
	if err != nil {
		log.Print(err)
		c.AbortWithStatus(400)
		return
	}

	c.JSON(http.StatusOK, response)
}

// PATCHProductImageHandler adding an image link to existing list of images for a certain product ID
func PATCHProductImageHandler(c *gin.Context) {
	var ProductImageRequest ProductImageUploadRequest
	body, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		log.Print("Unable to bind request body")
		c.AbortWithStatus(400)
		return
	}
	json.Unmarshal(body, &ProductImageRequest)
	err = PatchProductImageDatabaseHandler(c, ProductImageRequest)
	if err != nil {
		log.Print(err)
		c.AbortWithStatus(400)
		return
	}
	c.JSON(http.StatusOK, ProductImageRequest.Link)
}

// DELETEProductImageHandler deletes an image link from existing list of images for a certain product ID
func DELETEProductImageHandler(c *gin.Context) {
	var imgToDelete DeleteProductImageRequest
	err := c.Bind(&imgToDelete)
	if err != nil {
		log.Print(err)
		c.AbortWithStatus(400)
		return
	}

	pid, err := strconv.Atoi(c.Param("productID"))
	if err != nil {
		c.AbortWithStatus(400)
		return
	}

	userEmail := auth0.GetUserInformationFromToken(c).Email
	company, err := shopify.GetCompanyByEmailDatabaseHandler(c, userEmail)
	if err != nil {
		c.AbortWithStatus(400)
		return
	}

	cid, err := strconv.Atoi(c.Param("companyID"))
	if err != nil {
		c.AbortWithStatus(400)
		return
	}

	if cid != company.ID {
		c.AbortWithStatus(403)
		return
	}

	err = DeleteProductImageDatabaseHandler(c, pid, cid, imgToDelete)
	if err != nil {
		c.AbortWithStatus(400)
		return
	}
	c.JSON(http.StatusOK, nil)
}