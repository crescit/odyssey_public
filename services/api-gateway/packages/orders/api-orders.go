package orders

import (
	"log"
	"net/http"
	"strconv"

	"github.com/crescit/odyssey/api/packages/auth0"
	"github.com/gin-gonic/gin"
)

// GetOrderHandler returns the information stored about a specific order
func GetOrderHandler(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("orderID"))
	if err != nil {
		c.AbortWithStatus(400)
		return
	}
	order, error := GetOrderDatabaseHandler(c, id)
	if error != nil {
		c.AbortWithStatus(400)
		return
	}
	c.JSON(http.StatusOK, order)
}

// GetUserOrdersHandler returns all of the user's orders
func GetUserOrdersHandler(c *gin.Context) {
	userID := auth0.GetUserInformationFromToken(c).AuthID
	status := c.Query("status")
	orders, error := GetUserOrdersDatabaseHandler(c, userID, status)
	if error != nil {
		c.AbortWithStatus(400)
		return
	}
	c.JSON(http.StatusOK, orders)
}

// PatchOrderStatusHandler updates the status of an order
func PatchOrderStatusHandler(c *gin.Context) {
	var orderID, err = strconv.Atoi(c.Param("orderID"))
	// confirm orderID sent is valid
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}
	var status = c.Param("status")
	validStatuses := map[string]bool{
		"NEW":          true,
		"PAID":         true,
		"RETURNED":     true,
		"PICKUP_READY": true,
	}
	if !validStatuses[status] {
		log.Print("Invalid status provided to call")
		c.AbortWithStatus(400)
		return
	}
	error := PatchOrderStatusDatabaseHandler(c, orderID, status)
	if error != nil {
		c.AbortWithStatus(400)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"orderID": orderID,
		"status":  status,
	})
}

// PostCreateOrderHandler takes in items and creates an order
func PostCreateOrderHandler(c *gin.Context) {
	var body OrderPostRequestStruct
	err := c.Bind(&body)
	if err != nil {
		log.Print(err)
		c.AbortWithStatus(400)
		return
	}
	error := PostCreateOrderDatabaseHandler(c, body)
	if error != nil {
		c.AbortWithStatus(400)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "SUCCESS",
	})
}
