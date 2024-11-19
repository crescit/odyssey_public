package shopify

// BusinessInitStruct represents all information about a business before scraping
type BusinessInitStruct struct {
	URL      string `form:"URL" json:"URL" binding:"required"`
	Email    string `form:"email" json:"email" binding:"required"`
	Name     string `form:"name" json:"name" binding:"required"`
	Metadata string `form:"metadata" json:"metadata"`
}

// CompanyStruct represents the information available in the company table
type CompanyStruct struct {
	ID       int    `form:"id" json:"id"`
	Name     string `form:"name" json:"name"`
	Email    string `form:"email" json:"email"`
	Metadata string `form:"metadata" json:"metadata"`
}

// HoursWrapper is an hour object ie {"day":"Tuesday","from":"12:00","order":2,"to":"17:00"} used in DataReturnCompanyStruct
type HoursWrapper struct {
	Day				string `json:"day"`
	From			string `json:"from"`
	To				string `json:"to"`
	Order			int 	 `json:"order"`
}

// DataReturnCompanyStruct is the return data structure that unmarshal metadata after finding companies/businesses/stores/merchant
type DataReturnCompanyStruct struct {
	ID          int    `form:"id" json:"id"`
	Name        string `form:"name" json:"name"`
	Image       string `form:"img" json:"img"`
	Logo        string `form:"logo" json:"logo"`
	City        string `form:"city" json:"city"`
	State       string `form:"state" json:"state"`
	ZipCode     string `form:"zipCode" json:"zipCode"`
	Address     string `form:"address" json:"address"`
	Address2    string `form:"address2" json:"address2"`
	Phone     	string `form:"phone" json:"phone"`
	Category    string `form:"category" json:"category"`
	Description string `form:"desc" json:"desc"`
	Email       string `form:"email" json:"email"`
	URL         string `form:"url" json:"url"`
	Hours       []HoursWrapper `form:"hours" json:"hours"`
	TimeZone		string	`form:"timezone" json:"timezone"`
	NumOfLocations	int	`form:"num_locations" json:"num_locations"`
}
