package shopify

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"regexp"
	"strconv"
	"strings"

	"github.com/crescit/odyssey/api/packages/auth0"

	"github.com/gin-gonic/gin"
)

// GetCompanyByEmailHandler returns a specific company info based on user email
func GetCompanyByEmailHandler(c *gin.Context) {
	userEmail := auth0.GetUserInformationFromToken(c).Email
	company, err := GetCompanyByEmailDatabaseHandler(c, userEmail)
	if err != nil {
		c.AbortWithStatus(400)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"stores": company,
	})
	// c.JSON(http.StatusOK, company)
}

// GetCompanyByIDHandler returns a specific company info based on company id
func GetCompanyByIDHandler(c *gin.Context) {
	cid, err := strconv.Atoi(c.Param("companyID"))
	if err != nil {
		log.Print("unable to parse company id")
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	companies, err := GetCompanyByIDDatabaseHandler(c, cid)
	if err != nil {
		log.Print("unable to get company")
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"stores": companies,
	})
}

// SearchCompaniesHandler takes in the search terms and returns companies match them
func SearchCompaniesHandler(c *gin.Context) {
	getall := c.Request.URL.Path
	if len(getall) < 8 {
		c.JSON(http.StatusBadRequest, "url route too short")
		return
	}
	getall = getall[1:7]
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
			searchLikeWordList = append(searchLikeWordList, "%"+word+"%")
		}
	}
	log.Print(searchWordList)
	var companies []DataReturnCompanyStruct
	var hasMoreData int
	var err error
	if len(searchWordList) == 0 {
		orderby := "company_name ASC "
		// if getall == "getall" {
		// 	orderby = "random()"
		// }
		companies, hasMoreData, err = GetAllCompaniesDatabaseHandler(c, orderby, limit, offset)
	} else {
		companies, hasMoreData, err = SearchCompaniesDatabaseHandler(c, searchWordList, searchLikeWordList, limit, offset)
	}

	if err != nil {
		c.AbortWithStatus(400)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"stores":      companies,
		"hasMoreData": hasMoreData,
	})
}

// PostCreateCompanyLogoHandler takes in an s3 url and idenitifers and replaces the link in the metadata
func PostCreateCompanyLogoHandler(c *gin.Context) {
	var LogoRequest LogoUploadRequest
	body, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		log.Print("Unable to bind request body")
		c.AbortWithStatus(400)
		return
	}
	json.Unmarshal(body, &LogoRequest)
	err = PostCreateCompanyLogoDatabaseHandler(c, LogoRequest)
	if err != nil {
		log.Print("Unable to save logo url in db")
		c.AbortWithStatus(400)
		return
	}
	c.JSON(http.StatusOK, LogoRequest.Link)
}

// PostCreateShopifyBusinessHandler registers a shopify business under a user and starts the scrapers
func PostCreateShopifyBusinessHandler(c *gin.Context) {
	// unmarshal request body
	var body BusinessInitStruct
	err := c.Bind(&body)
	if err != nil {
		log.Print("Unable to bind body in PostCreateShopifyBusinessHandler")
		c.AbortWithStatus(400)
		return
	}

	// write to business table with auth0 email as main email
	companyID, error := PostCreateInitShopifyBusinessHandler(c, body)
	if error != nil {
		// check if companyID already exists if it does return it (CASE FOR USER ALREADY CALLED BUT STUCK ON STEP 1)
		company, err := GetCompanyByEmailDatabaseHandler(c, body.Email)
		if err != nil {
			log.Print(error)
			c.AbortWithStatus(400)
			return
		}
		c.JSON(http.StatusOK, company.ID)
		return
	}

	// call python microservice with shopify url and some other information
	values := map[string]string{"URL": body.URL, "email": body.Email, "name": body.Name}
	payload, _ := json.Marshal(values)
	postURL := os.Getenv("SCRAPER_URL") + "/scrape"
	req, err := http.NewRequest("POST", postURL, bytes.NewBuffer(payload))
	if err != nil {
		log.Print("Unable to call scraper microservice")
		c.AbortWithStatus(400)
		return
	}
	bearerString := "Bearer " + auth0.GetClientAccessToken()
	req.Header.Set("Authorization", bearerString)
	res, err := http.DefaultClient.Do(req)
	if err != nil || res.StatusCode != http.StatusOK {
		log.Print("scraper request failed")
		c.AbortWithStatus(400)
		return
	}

	c.JSON(http.StatusOK, companyID)
}

// PostCreateShopifyProductDataHandler takes data from body and sends it to Postgres
func PostCreateShopifyProductDataHandler(c *gin.Context) {
	// Unmarshal body from request
	var ProductResponse ShopifyProductsResponse
	body, _ := ioutil.ReadAll(c.Request.Body)
	json.Unmarshal(body, &ProductResponse)

	// write products to product table with auth0 email as main index
	err := PostCreateShopifyProductDatabaseHandler(c, ProductResponse)
	if err != nil {
		log.Print(err)
		c.AbortWithStatus(400)
		return
	}

	c.JSON(http.StatusOK, body)
}

// PatchShopifyVariantHandler takes in a variant struct and updates it in POSTGRES
func PatchShopifyVariantHandler(c *gin.Context) {
	userEmail := auth0.GetUserInformationFromToken(c).Email
	company, err := GetCompanyByEmailDatabaseHandler(c, userEmail)
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

	var body ShopifyProductVariantStruct
	err = c.Bind(&body)
	if err != nil {
		log.Print(err)
		c.AbortWithStatus(400)
		return
	}
	error := PatchShopifyVariantDatabaseHandler(c, body)
	if error != nil {
		c.AbortWithStatus(400)
		return
	}
	c.JSON(http.StatusOK, nil)
}

// DeleteShopifyVariantHandler takes in a variant id and removes it from POSTGRES
func DeleteShopifyVariantHandler(c *gin.Context) {
	userEmail := auth0.GetUserInformationFromToken(c).Email
	id, err := strconv.Atoi(c.Param("variantID"))
	if err != nil {
		c.AbortWithStatus(400)
		return
	}

	company, err := GetCompanyByEmailDatabaseHandler(c, userEmail)
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

	err = DeleteShopifyVariantDatabaseHandler(c, id)
	if err != nil {
		c.AbortWithStatus(400)
		return
	}
	c.JSON(http.StatusOK, nil)
}

// DeleteShopifyProductHandler takes in a product id and removes it from POSTGRES
func DeleteShopifyProductHandler(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("productID"))
	if err != nil {
		c.AbortWithStatus(400)
		return
	}

	userEmail := auth0.GetUserInformationFromToken(c).Email
	company, err := GetCompanyByEmailDatabaseHandler(c, userEmail)
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

	err = DeleteShopifyProductDatabaseHandler(c, id)
	if err != nil {
		c.AbortWithStatus(400)
		return
	}
	c.JSON(http.StatusOK, nil)
}
