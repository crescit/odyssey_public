package products

import (
	"github.com/lib/pq"
)

// ProductStruct is the return type for products and used to create one in postgres outside of scraping
type ProductStruct struct {
	PID            int            `form:"pid" json:"pid"`
	Title          string         `form:"title" json:"title" binding:"required"`
	CompanyID      int            `form:"company_id" json:"company_id"`
	Category       string         `form:"category" json:"category"`
	Description    string         `form:"description" json:"description"`
	Price          float64        `form:"price" json:"price"`
	Images         pq.StringArray `form:"images" json:"images"`
	Vendor         string         `form:"vendor" json:"vendor"`
	InventoryCount int            `form:"inventory" json:"inventory"`
	Handle         string         `form:"handle" json:"handle"`
}

// SearchReturnProductStruct is the return type after finding the products based on the search terms
type SearchReturnProductStruct struct {
	PID            int             `form:"id" json:"id"`
	VIDs           pq.Int64Array   `form:"vids" json:"vids"`
	Title          string          `form:"name" json:"name"`
	VariantTitles  pq.StringArray  `form:"variant_titles" json:"variant_titles"`
	CompanyID      int             `form:"company_id" json:"company_id"`
	CompanyName    string          `form:"merchant" json:"merchant"` // from Company table
	Category       string          `form:"category" json:"category"`
	Description    string          `form:"desc" json:"desc"`
	Price          float64         `form:"price" json:"price"`   // from product table
	Prices         pq.Float64Array `form:"prices" json:"prices"` // from variant table
	Total          float64         `form:"total" json:"total"`
	Image          string          `form:"img" json:"img"`
	Images         pq.StringArray  `form:"images" json:"images"`
	Store          string          `form:"store" json:"store"`
	Vendor         string          `form:"vendor" json:"vendor"`
	InventoryCount int             `form:"count" json:"count"`
	Handle         string          `form:"handle" json:"handle"`
	InCart         bool            `form:"inCart" json:"inCart"`
}

// CategoryStruct is the return type for category search
type CategoryStruct struct {
	Category string `form:"category" json:"category"`
}

// PostProductResponseStruct is used to send the product id back on success
type PostProductResponseStruct struct {
	PID int `form:"pid" json:"pid"`
}

// PostVariantResponseStruct is used to send the variant id back on success
type PostVariantResponseStruct struct {
	VID int `form:"vid" json:"vid"`
}

// VariantStruct is used to create a variant in postgres outside of scraping
type VariantStruct struct {
	PID           int      `form:"pid" json:"pid"`
	Title         string   `form:"title" json:"title" binding:"required"`
	Options       []string `form:"options" json:"options"`
	Taxable       bool     `form:"taxable" json:"taxable"`
	FeaturedImage string   `form:"featured_image" json:"featured_image"`
	Available     bool     `form:"available" json:"available"`
	Price         string   `form:"price" json:"price"`
	Grams         int      `form:"grams" json:"grams"`
	ComparePrice  string   `form:"compare_at_price" json:"compare_at_price"`
	Position      int      `form:"position" json:"position"`
	InventoryCount int     `form:"inventory_quantity" json:"inventory_quantity"`
	SKU						string	 `form:"sku" json:"sku"`
	Barcode				string	 `form:"barcode" json:"barcode"`
	RequiresShipping       bool     `form:"requires_shipping" json:"requires_shipping"`
}

// ProductImageUploadRequest represents the body of a logo upload from scraper
type ProductImageUploadRequest struct {
	ProductID string `form:"pid" json:"pid"`
	Link      string `form:"link" json:"link"`
}

// DeleteProductImageRequest represents the body of an image to be delete from porduct images field
type DeleteProductImageRequest struct {
	ImgIdx int `form:"img_idx" json:"img_idx"`
	ImgLink string `form:"img_to_delete" json:"img_to_delete"`
}

// PatchProductStruct is used to patch a spcific product
type PatchProductStruct struct {
	PID            int             `form:"id" json:"id"`
	Title          string          `form:"name" json:"name"` // user editable
	CompanyID      int             `form:"company_id" json:"company_id"`
	CompanyName    string          `form:"merchant" json:"merchant"`
	Category       string          `form:"category" json:"category"` // user editable
	Description    string          `form:"desc" json:"desc"` // user editable
	Vendor         string          `form:"vendor" json:"vendor"` // user editable
}