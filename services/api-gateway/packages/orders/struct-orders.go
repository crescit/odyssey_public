package orders

import (
	"database/sql"
	"time"

	"github.com/lib/pq"
)

type OrderItems struct {
	CartStruct []uint8 `json:"items"`
}

// Duplicating to avoid insertion of cart
// CartStruct is the return type of the get cart endpoint
type CartStruct struct {
	ProductID    int           `json:"id"`            // from product table
	VID          int           `json:"vid"`           // from cart table
	CustomerID   string        `json:"customer_id"`   // from cart table
	CompanyID    int           `json:"company_id"`    // from company table
	Product      string        `json:"name"`          // from product table
	Category     string        `json:"category"`      // from product table
	Image        string        `json:"img"`           // from product table
	Images       []string      `json:"images"`        // from product table
	Company      string        `json:"merchant"`      // from company table
	CompanyImg   string        `json:"merchant_img"`  // from company table
	Price        float64       `json:"price"`         // from variant table
	Description  string        `json:"desc"`          // from product table
	VariantTitle string        `json:"variant_title"` // from variant table
	Quantity     int           `json:"count"`         // from cart table
	Total        float64       `json:"total"`         // derive from qty and price in the DB handler
	ProductVIDs  pq.Int64Array `form:"prod_vids" json:"prod_vids"`
	Added        time.Time     `json:"added"` // from cart table
}

// ItemStruct is a definition of a product shared with postgres
type ItemStruct struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Image string `json:"image"`
	Price string `json:"price"`
	Brand string `json:"brand"`
}

// OrderStruct is the return type of the get order endpoint
type OrderStruct struct {
	ID       int          `json:"id"`
	Customer string       `json:"customer"`
	Company  string       `json:"company"`
	Total    string       `json:"total"`
	Status   string       `json:"status"`
	Items    []ItemStruct `json:"items"`
	Created  time.Time    `json:"created"`
	Updated  time.Time    `json:"updated"`
}

// OrderStruct is the return type of the get order endpoint
type OrdersStruct struct {
	ID            int          `json:"id"`
	Customer      string       `json:"customer"`
	CustomerEmail string       `json:"customer_email"`
	Company       string       `json:"company"`
	Total         string       `json:"total"`
	Status        string       `json:"status"`
	Items         sql.RawBytes `json:"items"`
	Created       time.Time    `json:"created"`
	Updated       time.Time    `json:"updated"`
	IntentId      string       `json:"intent_id"`
	Products      []CartStruct `json:"products"`
}

// OrderPostRequestStruct serves to demarshal the body of the request to make a new order record
type OrderPostRequestStruct struct {
	CustomerID string  `form:"customer_id" json:"customer_id" binding:"required"`
	CompanyID  string  `form:"company_id" json:"company_id" binding:"required"`
	Items      []int   `form:"items" json:"items" binding:"required"`
	Total      float64 `form:"total" json:"total" binding:"required"`
	Status     string  `form:"status" json:"status" binding:"required"`
}
