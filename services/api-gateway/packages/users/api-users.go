package users

import (
	"log"
	"net/http"

	"github.com/crescit/odyssey/api/packages/auth0"
	"github.com/gin-gonic/gin"
)

// GetUserInfoHandler retrieves existing user info
func GetUserInfoHandler(c *gin.Context) {
	userID := auth0.GetUserInformationFromToken(c).AuthID
	user, err := GetUserDatabaseHandler(c, userID)
	if err != nil {
		log.Print(err)
		c.AbortWithStatus(400)
	}

	c.JSON(http.StatusOK, user)
}

// PostCreateUserHandler takes in user information and passes the information to the database handler
func PostCreateUserHandler(c *gin.Context) {
	var body auth0.UserStruct
	err := c.Bind(&body)
	if err != nil {
		log.Print(err)
		c.AbortWithStatus(400)
		return
	}
	body.ID = auth0.GetUserInformationFromToken(c).AuthID
	// register user in postgres database
	error := PostCreateUserDatabaseHandler(c, body)
	if error != nil {
		log.Print(err)
		c.AbortWithStatus(400)
		return
	}
	// set user metadata in auth0
	error = auth0.SetUserBusinessMetadata(body)
	if error != nil {
		log.Print(error)
		c.AbortWithStatus(400)
		return
	}

	c.JSON(http.StatusOK, nil)
}

// PatchUserHandler serves to update existing user info
func PatchUserHandler(c *gin.Context) {
	var body auth0.PatchUserStruct
	err := c.Bind(&body)
	if err != nil {
		log.Print(err)
		c.AbortWithStatus(400)
	}
	body.ID = auth0.GetUserInformationFromToken(c).AuthID
	error := PatchUserDatabaseHandler(c, body)
	if error != nil {
		log.Print(error)
		c.AbortWithStatus(400)
	}

	// they completed onboarding, set auth0 business flag
	if body.OnboardStep == 4 {
		auth0.SetUserBusinessIDMetadata(body.ID, body.CompanyID)
	}

	c.JSON(http.StatusOK, gin.H{
		"message":      "SUCCESS",
		"customer_id":  body.ID,
		"onboard_step": body.OnboardStep,
		"company_id":   body.CompanyID,
	})
}
