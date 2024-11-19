package postgis

// StandardAddress represents how an address is structured on odyssey's onboarding form
type StandardAddress struct {
	Street1   string  `form:"street1" json:"street1"`
	Street2   string  `form:"street2" json:"street2"`
	City      string  `form:"city" json:"city"`
	State     string  `form:"state" json:"state"`
	Zip       string  `form:"zip" json:"zip"`
	Phone     string  `form:"phone" json:"phone"`
	Latitude  float64 `form:"latitude" json:"latitude"`
	Longitude float64 `form:"longitude" json:"longitude"`
}

// PositionStackAddress represents a position stack address
type PositionStackAddress struct {
	Latitude      float64 `form:"latitude" json:"latitude"`
	Longitude     float64 `form:"longitude" json:"longitude"`
	Label         string  `form:"label" json:"label"`
	Name          string  `form:"name" json:"name"`
	Type          string  `form:"type" json:"type"`
	Number        int     `form:"number" json:"number"`
	Street        string  `form:"street" json:"street"`
	PostalCode    string  `form:"postal_code" json:"postal_code"`
	Region        string  `form:"region" json:"region"`
	RegionCode    string  `form:"region_code" json:"region_code"`
	Neighbourhood string  `form:"neighbourhood" json:"neighbourhood"`
	Country       string  `form:"country" json:"country"`
	CountryCode   string  `form:"country_code" json:"country_code"`
	MapURL        string  `form:"map_url" json:"map_url"`
}

// CompaniesLocationStruct represents a business address
type CompaniesLocationStruct struct {
	Name        string          `form:"name" json:"name"`
	Email       string          `form:"email" json:"email"`
	CompanyID   string          `form:"company_id" json:"company_id"`
	Address     StandardAddress `form:"addresses" json:"addresses" db:"addresses"`
	Point       string          `form:"point" json:"point"`
	Image       string          `form:"img" json:"img"`
	Description string          `form:"desc" json:"desc"`
	Phone       string          `form:"phone" json:"phone"`
	City        string          `form:"city" json:"city"`
	Category    string          `form:"category" json:"category"`
	Distance    string          `form:"distance" json:"distance"`
}

// PositionStackAddressResponse is what position stack returns from the forward encoding call
type PositionStackAddressResponse struct {
	Data []PositionStackAddress `form:"data" json:"data"`
}
