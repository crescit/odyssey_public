package cart

import (
	"log"
	"net/http"
	// "strconv"

	"github.com/crescit/odyssey/api/packages/auth0"
	"github.com/gin-gonic/gin"
)

// GetUserCartHandler returns the cart item, quantity, date added information for the specific user
func GetUserCartHandler(c *gin.Context) {
	userID := auth0.GetUserInformationFromToken(c).AuthID
	cart, error := GetUserCartDatabaseHandler(c, userID)
	if error != nil {
		c.AbortWithStatus(400)
		return
	}
	c.JSON(http.StatusOK, cart)
}

// PatchUserCartHandler updates the items in the cart i.e. products and quantity
func PatchUserCartHandler(c *gin.Context) {
	var body CartPostPatchRequestStruct
	err := c.Bind(&body)
	if err != nil {
		log.Print(err)
		c.AbortWithStatus(400)
		return
	}
	body.CustomerID = auth0.GetUserInformationFromToken(c).AuthID
	error := PatchUserCartDatabaseHandler(c, body)
	if error != nil {
		c.AbortWithStatus(400)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":  "SUCCESS",
		"vid":      body.VID,
		"quantity": body.Quantity,
	})
}

// PostCreateCartHandler takes in items, quantity, and userID then creates a cart
func PostCreateCartHandler(c *gin.Context) {
	var body CartPostPatchRequestStruct
	err := c.Bind(&body)
	if err != nil {
		log.Print(err)
		c.AbortWithStatus(400)
		return
	}
	body.CustomerID = auth0.GetUserInformationFromToken(c).AuthID
	error := PostCreateCartDatabaseHandler(c, body)
	if error != nil {
		c.AbortWithStatus(400)
		return
	}
	c.JSON(http.StatusOK, nil)
}

// DeleteUserCartHandler takes in a user id and removes corresponding cart from POSTGRES
func DeleteUserCartHandler(c *gin.Context) {
	userID := auth0.GetUserInformationFromToken(c).AuthID
	
	// vid, err := strconv.ParseInt(c.Param("variantID"), 10, 64)
	// vid, err := strconv.Atoi(c.Param("variantID"))
	var body CartPostPatchRequestStruct
	err := c.Bind(&body)
	if err != nil {
		c.AbortWithStatus(400)
		return
	}
	
	vids := []int64{int64(body.VID)}
	// vids := []int64{int64(vid)}
	err = DeleteUserCartDatabaseHandler(c, userID, vids)
	if err != nil {
		c.AbortWithStatus(400)
		return
	}
	c.JSON(http.StatusOK, nil)
}
