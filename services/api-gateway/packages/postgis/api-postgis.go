package postgis

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/crescit/odyssey/api/packages/auth0"

	"github.com/gin-gonic/gin"
)

// GetCompaniesWithLocationHandler returns all companies within a user's bound takes in queryParams lat, long
func GetCompaniesWithLocationHandler(c *gin.Context) {
	var lat float64
	var long float64
	var err error

	longQueryNegIndex := strings.Index(c.Query("long"), "-")
	longQueryDotIndex := strings.Index(c.Query("long"), ".")

	if longQueryNegIndex != -1 {
		long, err = strconv.ParseFloat(c.Query("long")[:longQueryDotIndex+4], 64)
		if err != nil {
			log.Print("no longitude found in request")
			log.Printf("%v", err)
			c.AbortWithStatus(400)
			return
		}
	} else {
		long, err = strconv.ParseFloat(c.Query("long"), 64)
		if err != nil {
			log.Print("no longitude found in request")
			log.Printf("%v", err)
			c.AbortWithStatus(400)
			return
		}
	}

	latQueryNegIndex := strings.Index(c.Query("lat"), "-")
	latQueryDotIndex := strings.Index(c.Query("lat"), ".")
	if latQueryNegIndex != -1 {
		lat, err = strconv.ParseFloat(c.Query("lat")[:latQueryDotIndex+4], 64)
		if err != nil {
			log.Printf("%s %v", "no latitude found in request", err)
			c.AbortWithStatus(400)
			return
		}
	} else {
		lat, err = strconv.ParseFloat(c.Query("lat"), 64)
		if err != nil {
			log.Printf("%s %v", "no latitude found in request", err)
			c.AbortWithStatus(400)
			return
		}
	}

	companies, err := GetCompaniesWithLocationDatabaseHandler(c, lat, long, 25)
	if err != nil {
		log.Print("error finding companies within the location")
		c.AbortWithStatus(400)
		return
	}

	c.JSON(http.StatusOK, companies)
}

// takes in odyssey standard address struct and returns address for position stack query
func makeAddrStngFromStandardAddress(address StandardAddress) string {
	// TODO further sanitize the input, fuzzy match the strings to handle typos

	// Case for Washington DC, US Territories (state doesn't exist)
	if address.State == "" {
		return fmt.Sprintf("%s %s , %s %s", address.Street1, address.Street2, address.City, address.Zip)
	}
	return fmt.Sprintf("%s %s, %s, %s", address.Street1, address.Street2, address.State, address.Zip)
}

// PostCreateUserAddressHandler takes in an address and stores it for the user
func PostCreateUserAddressHandler(c *gin.Context) {
	// bind the body and get the user information
	var body StandardAddress
	err := c.Bind(&body)
	if err != nil {
		log.Print("Unable to bind body in PostCreateUserAddressHandler")
		c.AbortWithStatus(400)
		return
	}
	authID := auth0.GetUserInformationFromToken(c).AuthID

	// https://en.wikipedia.org/wiki/Null_Island anybody shopping here will force the positionstack call
	// get address coordinates if coordinates weren't passed
	var points []PositionStackAddress
	if body.Latitude == 0 && body.Longitude == 0 {
		address := makeAddrStngFromStandardAddress(body)
		points, err = returnPointsFromPositionStack(address)
		if err != nil {
			log.Print("Unable to retrieve address coordinatees")
			c.JSON(http.StatusBadRequest, err)
			return
		}
	}

	// if we called positionstack store the coordinates on the address object
	if len(points) != 0 {
		if points[0].Latitude == 0 && points[0].Longitude == 0 {
			log.Print("Unable to get coordinates from address")
			c.AbortWithStatus(400)
			return
		}
		body.Latitude = points[0].Latitude
		body.Longitude = points[0].Longitude
	}

	// store points with user's information and address plain text as metadata
	err = PostCreateUserAddressDatabaseHandler(c, body, authID)
	if err != nil {
		log.Print("Unable to save user address")
		c.AbortWithStatus(400)
		return
	}

	c.JSON(http.StatusOK, body)
}

// calls position stack foward vector on an address and returns the geographic coordinates
func returnPointsFromPositionStack(addrQuery string) ([]PositionStackAddress, error) {
	var response PositionStackAddressResponse

	// set up request URL
	accessKey := os.Getenv("POSITIONSTACK_SECRET")
	url := "http://api.positionstack.com/v1/forward?access_key=" + accessKey
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Printf("%s%v", "error setting up request", err)
		return nil, err
	}
	q := req.URL.Query()
	q.Add("query", addrQuery)
	req.URL.RawQuery = q.Encode()

	// parse response to appropriate struct
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Printf("%s%v", "error getting response from positionstack", err)
		return nil, err
	}
	defer res.Body.Close()
	json.NewDecoder(res.Body).Decode(&response)
	return response.Data, nil
}
