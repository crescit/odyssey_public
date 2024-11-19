package shopify

import "time"

// ShopifyImageStruct represents the scraped image, it can be none so we aren't setting it to required
type ShopifyImageStruct struct {
	Src              string    `form:"src" json:"src"`
	Alt              string    `form:"alt" json:"alt"`
	CreatedAt        string    `form:"created_at" json:"created_at"`
	UpdatedAt        time.Time `form:"updated_at" json:"updated_at"`
	ID               string    `form:"id" json:"id"`
	VariantIds       []string  `form:"variant_ids" json:"variant_ids"`
	Position         int       `form:"position" json:"position"`
	ShopifyProductID int       `form:"product_id" json:"product_id"`
}

// ShopifyOptionsStruct Represents options scraped from shopify products
type ShopifyOptionsStruct struct {
	Name     string   `form:"name" json:"name"`
	Position int      `form:"position" json:"position"`
	Values   []string `form:"values" json:"values"`
}

// ShopifyProductStruct represents an instance of a scraped product
type ShopifyProductStruct struct {
	Description    string                        `form:"description" json:"description"`
	ID             int                           `form:"id" json:"id"`
	PID            string                        `form:"pid" json:"pid"`
	Images         []ShopifyImageStruct          `form:"images" json:"images"`
	Handle         string                        `form:"handle" json:"handle"`
	HTMLBody       string                        `form:"body_html" json:"body_html"`
	CreatedAt      time.Time                     `form:"created_at" json:"created_at"`
	UpdatedAt      time.Time                     `form:"updated_at" json:"updated_at"`
	PublishedAt    time.Time                     `form:"published_at" json:"published_at"`
	Vendor         string                        `form:"vendor" json:"vendor"`
	Category       string                        `form:"product_type" json:"product_type"`
	Tags           []string                      `form:"tags" json:"tags"`
	Title          string                        `form:"title" json:"title"`
	InventoryCount int                           `form:"products_count" json:"products_count"`
	Variants       []ShopifyProductVariantStruct `form:"variants" json:"variants"`
}

// ShopifyProductVariantStruct represents the information inside a variant
type ShopifyProductVariantStruct struct {
	VID              string    `form:"vid" json:"vid"`
	ID               string    `form:"id" json:"id"`
	Title            string    `form:"title" json:"title"`
	Option1          string    `form:"option1" json:"option1"`
	Option2          string    `form:"option2" json:"option2"`
	Option3          string    `form:"option3" json:"option3"`
	RequiresShipping bool      `form:"requires_shipping" json:"requires_shipping"`
	Taxable          bool      `form:"taxable" json:"taxable"`
	FeaturedImage    string    `form:"featured_image" json:"featured_image"`
	Available        bool      `form:"available" json:"available"`
	Price            string    `form:"price" json:"price"`
	Grams            int       `form:"grams" json:"grams"`
	ComparePrice     string    `form:"compare_at_price" json:"compare_at_price"`
	Position         int       `form:"position" json:"position"`
	ShopifyID        string    `form:"product_id" json:"product_id"`
	CreatedAt        time.Time `form:"created_at" json:"created_at"`
	UpdatedAt        time.Time `form:"updated_at" json:"updated_at"`
	SKU              string    `form:"sku" json:"sku"`
	Inventory        int       `form:"inventory_quantity" json:"inventory_quantity"`
	Barcode          string    `form:"barcode" json:"barcode"`
}

// ShopifyProductsResponse is what the webhook data is bound to
type ShopifyProductsResponse struct {
	BusinessName string                 `form:"name" json:"name"`
	Email        string                 `form:"email" json:"email"`
	Products     []ShopifyProductStruct `form:"products" json:"products"`
}

// LogoUploadRequest represents the body of a logo upload from scraper
type LogoUploadRequest struct {
	BusinessName string `form:"name" json:"name"`
	Email        string `form:"email" json:"email"`
	Link         string `form:"link" json:"link"`
}
