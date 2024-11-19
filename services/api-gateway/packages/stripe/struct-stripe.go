package stripe

// StripeCreateAccountRequest represents the request to create a stripe user
type StripeCreateAccountRequest struct {
	Email string `form:"email" json:"email"`
}

type PostStripePaymentRequestStruct struct {
	CompanyID int `form:"company_id" json:"company_id"`
}
