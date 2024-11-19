package cart

import (
	"time"
	"github.com/lib/pq"
)

// CartStruct is the return type of the get cart endpoint
type CartStruct struct {
	ProductID   int       `json:"id"`          // from product table
	VID         int       `json:"vid"`         // from cart table
	CustomerID  string    `json:"customer_id"` // from cart table
	CompanyID  	int    		`json:"company_id"`  // from company table
	Product     string    `json:"name"`        // from product table
	Category    string    `json:"category"`    // from product table
	Image       string    `json:"img"`         // from product table
	Images      []string  `json:"images"`      // from product table
	Company     string    `json:"merchant"`    // from company table
	CompanyImg  string    `json:"merchant_img"`  // from company table
	Price       float64   `json:"price"`       // from variant table
	Description string    `json:"desc"`        // from product table
	VariantTitle string   `json:"variant_title"`   // from variant table
	Quantity    int       `json:"count"`       // from cart table
	Total       float64   `json:"total"`       // derive from qty and price in the DB handler
	ProductVIDs pq.Int64Array  `form:"prod_vids" json:"prod_vids"`
	Added       time.Time `json:"added"`       // from cart table
}

// CartPostPatchRequestStruct serves to demarshal the body of the request to make a new cart record or to patch existing cart record
type CartPostPatchRequestStruct struct {
	CustomerID string `form:"customer_id" json:"customer_id"`
	VID        int    `form:"vid" json:"vid" binding:"required"`
	Quantity   int    `form:"quantity" json:"quantity" binding:"required"`
}
