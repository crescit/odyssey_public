package shopify

import (
	"encoding/json"
	"log"
	"strconv"
	"time"

	pg "github.com/crescit/odyssey/api/postgres"
	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
)

// GetCompanyByIDDatabaseHandler returns a company based on company ID
func GetCompanyByIDDatabaseHandler(c *gin.Context, id int) ([]DataReturnCompanyStruct, error) {
	var companies []DataReturnCompanyStruct

	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return nil, err
	}
	defer db.Close()

	var getCompaniesSQL = `SELECT id, company_name, email, metadata
	FROM public.company WHERE id = $1`

	row := db.QueryRow(getCompaniesSQL, id)
	var company DataReturnCompanyStruct
	var rawMeta string

	err = row.Scan(&company.ID, &company.Name, &company.Email, &rawMeta)
	if err != nil {
		log.Printf("%v%s", err, "error scanning company")
		return nil, err
	}

	err = json.Unmarshal([]byte(rawMeta), &company)
	if err != nil {
		log.Printf("%v%s", err, "error with company metadata")
		return nil, err
	}
	companies = append(companies, company)

	db.Close()
	return companies, nil
}

// GetCompanyByEmailDatabaseHandler returns a company based on user email
func GetCompanyByEmailDatabaseHandler(c *gin.Context, email string) (*DataReturnCompanyStruct, error) {
	var company DataReturnCompanyStruct
	var rawMeta string
	getCompSQL := `SELECT id, company_name, email, metadata FROM public.company WHERE email = $1`
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v %s", err, "error with database connection")
		return nil, err
	}
	defer db.Close()
	row := db.QueryRow(getCompSQL, email)
	err = row.Scan(&company.ID, &company.Name, &company.Email, &rawMeta)
	if err != nil {
		log.Printf("%v %s", err, "error with SQL select row")
		return nil, err
	}
	err = json.Unmarshal([]byte(rawMeta), &company)

	return &company, nil
}

// GetAllCompaniesDatabaseHandler returns list of all companies
func GetAllCompaniesDatabaseHandler(c *gin.Context, orderBy string, limit string, offset string) ([]DataReturnCompanyStruct, int, error) {
	var companies []DataReturnCompanyStruct
	moreDataThanRequested, err := strconv.Atoi(limit)
	if err != nil {
		log.Printf("%v %s", err, "error converting limit to integer")
		return nil, 0, err
	}
	moreDataThanRequested++
	limit = strconv.Itoa(moreDataThanRequested)

	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return nil, 0, err
	}
	defer db.Close()

	var getAllCompaniesSQL = `SELECT id, company_name, email, metadata
	FROM public.company ORDER BY `
	if limit == "0" {
		limit = "1000"
	}
	limitOffset := "LIMIT $2 OFFSET $1;"
	getAllCompaniesSQL = getAllCompaniesSQL + orderBy + limitOffset
	rows, err := db.Query(getAllCompaniesSQL, offset, limit)
	if err != nil {
		log.Printf("%v%s", err, "error querying company")
		return nil, 0, err
	}

	var count = 0
	var hasMoreData = 0
	for rows.Next() {
		var company DataReturnCompanyStruct
		var rawMeta string
		err = rows.Scan(&company.ID, &company.Name, &company.Email, &rawMeta)
		if err != nil {
			log.Printf("%v%s", err, "error scanning company")
			return nil, 0, err
		}
		err = json.Unmarshal([]byte(rawMeta), &company)

		count++
		if count < moreDataThanRequested {
			companies = append(companies, company)
		} else {
			hasMoreData = 1
		}
	}

	db.Close()
	return companies, hasMoreData, nil
}

// SearchCompaniesDatabaseHandler returns list of company based on the search terms; with pagination
func SearchCompaniesDatabaseHandler(c *gin.Context, searchWordList []string, searchLikeWordList []string, limit string, offset string) ([]DataReturnCompanyStruct, int, error) {
	var companies []DataReturnCompanyStruct
	moreDataThanRequested, err := strconv.Atoi(limit)
	if err != nil {
		log.Printf("%v %s", err, "error converting limit to integer")
		return nil, 0, err
	}
	moreDataThanRequested++
	limit = strconv.Itoa(moreDataThanRequested)

	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return nil, 0, err
	}
	defer db.Close()

	var getCompaniesSQL = `SELECT id, company_name, email, metadata
	FROM public.company WHERE company_name_tokens @@ to_tsquery('english',coalesce($1, '')) `
	searchTermForLike := "or company_name ilike ANY($4)"
	getCompaniesSQL += searchTermForLike

	if limit == "0" {
		limit = "1000"
	}
	limitOffset := "LIMIT $2 OFFSET $3;"

	getCompaniesSQL += `ORDER BY company_name ASC ` + limitOffset

	rows, err := db.Query(getCompaniesSQL, (*pq.StringArray)(&searchWordList), limit, offset, (*pq.StringArray)(&searchLikeWordList))
	if err != nil {
		log.Printf("%v%s", err, "error querying company")
		return nil, 0, err
	}

	var count = 0
	var hasMoreData = 0
	for rows.Next() {
		var company DataReturnCompanyStruct
		var rawMeta string
		err = rows.Scan(&company.ID, &company.Name, &company.Email, &rawMeta)
		if err != nil {
			log.Printf("%v%s", err, "error scanning company")
			return nil, 0, err
		}
		err = json.Unmarshal([]byte(rawMeta), &company)

		count++
		if count < moreDataThanRequested {
			companies = append(companies, company)
		} else {
			hasMoreData = 1
		}
	}

	db.Close()
	return companies, hasMoreData, nil
}

// DeleteShopifyProductDatabaseHandler deletes a product from postgres
func DeleteShopifyProductDatabaseHandler(c *gin.Context, id int) error {
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return err
	}

	deleteCartQuery := `DELETE FROM public.cart WHERE vid IN (SELECT vid FROM public.variant as v WHERE v.pid = $1);`
	deleteVariantQuery := "DELETE FROM public.variant as v WHERE v.pid = $1"
	deleteProductQuery := "DELETE FROM public.products as p WHERE p.pid = $1"

	// init transaction
	tx, err := db.Begin()
	if err != nil {
		log.Printf("%v%s", err, " unable to init transaction")
		return err
	}

	// delete all variants from carts
	_, err = tx.Exec(deleteCartQuery, id)
	if err != nil {
		log.Printf("%v%s", err, " unable to delete in cart")
		tx.Rollback()
		return err
	}

	// delete all variants which reference the product id
	_, err = tx.Exec(deleteVariantQuery, id)
	if err != nil {
		log.Printf("%v%s", err, " unable to delete associated variants")
		tx.Rollback()
		return err
	}

	// finally delete the product from the product table
	_, err = tx.Exec(deleteProductQuery, id)
	if err != nil {
		log.Printf("%v%s", err, " unable to delete product")
		tx.Rollback()
		return err
	}

	// commit the transaction
	err = tx.Commit()
	if err != nil {
		log.Printf("%v%s", err, " unable to complete transaction")
		return err
	}
	db.Close()
	return nil
}

// DeleteShopifyVariantDatabaseHandler deletes a product from postgres
func DeleteShopifyVariantDatabaseHandler(c *gin.Context, id int) error {
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, " error with database connection")
		return err
	}

	// init transaction
	tx, err := db.Begin()
	if err != nil {
		log.Printf("%v%s", err, " unable to init transaction")
		return err
	}

	// delete variant from cart
	deleteCartQuery := `DELETE FROM public.cart WHERE vid = $1;`
	_, err = tx.Exec(deleteCartQuery, id)
	if err != nil {
		log.Printf("%v%s", err, " unable to delete in cart")
		tx.Rollback()
		return err
	}

	// finally delete from variants
	variantQuery := "DELETE FROM public.variant WHERE vid = $1"
	_, err = tx.Exec(variantQuery, id)
	if err != nil {
		log.Printf("%v%s", err, " unable to delete in variants")
		tx.Rollback()
		return err
	}

	// commit the transaction
	err = tx.Commit()
	if err != nil {
		log.Printf("%v%s", err, " unable to complete transaction")
		return err
	}

	db.Close()
	return err
}

// PatchShopifyVariantDatabaseHandler updates a specific variant in postgres
func PatchShopifyVariantDatabaseHandler(c *gin.Context, variant ShopifyProductVariantStruct) error {
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v %s", err, "error with database connection")
		return err
	}
	defer db.Close()

	updateQuery := `UPDATE public.variant SET
		title = :title,
		inventory_quantity = :inventory_quantity,
		sku = :sku,
		barcode = :barcode,
		featured_image = :featured_image, 
		available = :available, 
		price = :price, 
		grams = :grams, 
		compare_price = :compare_price, 
		position = :position, 
		updated_at = :updated_at WHERE vid = :variant_id`

	log.Printf("%v", variant.VID)
	_, err = db.NamedExec(updateQuery, map[string]interface{}{
		"title":              variant.Title,
		"inventory_quantity": variant.Inventory,
		"sku":                variant.SKU,
		"barcode":            variant.Barcode,
		"featured_image":     variant.FeaturedImage,
		"available":          variant.Available,
		"price":              variant.Price,
		"grams":              variant.Grams,
		"compare_price":      variant.ComparePrice,
		"position":           variant.Position,
		"updated_at":         time.Now(),
		"variant_id":         variant.VID,
	})
	db.Close()
	return nil
}

// PostCreateCompanyLogoDatabaseHandler replaces the logo for the company with the URL provided
func PostCreateCompanyLogoDatabaseHandler(c *gin.Context, logoRequest LogoUploadRequest) error {
	getQuery := `SELECT metadata FROM public.company WHERE email = $1;`
	insertQuery := `UPDATE public.company SET metadata = $1 WHERE email = $2;`
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return err
	}
	defer db.Close()

	var buf []byte
	err = db.QueryRow(getQuery, logoRequest.Email).Scan(&buf)
	var jsn map[string]interface{}
	json.Unmarshal(buf, &jsn)
	jsn["img"] = logoRequest.Link
	if err != nil {
		log.Printf("%v%s", err, "error getting metadata from postgres")
		return err
	}
	marshalled, _ := json.Marshal(jsn)

	_, err = db.Exec(insertQuery, string(marshalled), logoRequest.Email)
	if err != nil {
		log.Printf("%v%s", err, "error updating metadata in postgres")
		return err
	}
	db.Close()
	return nil
}

// PostCreateInitShopifyBusinessHandler registers a business for the email and returns business ID
func PostCreateInitShopifyBusinessHandler(c *gin.Context, company BusinessInitStruct) (companyID int, err error) {

	prepState := "INSERT INTO public.company(company_name, email, metadata, company_name_tokens) VALUES ($1, $2, $3, to_tsvector('english', coalesce($1, ''))) ON CONFLICT (email) DO NOTHING RETURNING id;"
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return -1, err
	}
	defer db.Close()
	// jsonString := "{\"url\":\"" + company.URL + "\"" + "}"
	// err = db.QueryRow(prepState, company.Name, company.Email, jsonString).Scan(&companyID)
	err = db.QueryRow(prepState, company.Name, company.Email, company.Metadata).Scan(&companyID)
	if err != nil {
		log.Printf("%v%s", err, " error creating the shopify business in postgres")
		return -1, err
	}
	db.Close()
	return companyID, nil
}

// PostCreateShopifyProductDatabaseHandler inserts scraped data into Postgres
func PostCreateShopifyProductDatabaseHandler(c *gin.Context, products ShopifyProductsResponse) error {
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return err
	}
	defer db.Close()

	// get company id from email in request
	var companyID int
	var getCompanyID = "SELECT id FROM public.company as C WHERE c.email = $1"
	row := db.QueryRow(getCompanyID, products.Email)
	err = row.Scan(&companyID)
	if err != nil {
		log.Printf("%v%s%v", err, "error no company found", products.Email)
		return err
	}

	/*
	*	for each product start a db transaction
	*		db transaction must
	*			1. init the base product in prod table
	*			2. create each variant in the variant table
	 */
	var productArr = products.Products
	//>>>> NEED TO TEST SQL ----------------------------------- <<<<
	insertProducts := `INSERT INTO products(company_id, description, shopify_id, handle, html_body, created_at, updated_at, published_at, vendor, category, title, inventory_count, images, textsearchable_product, textsearchable_category) 
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, setweight(to_tsvector('english', coalesce($11, '')), 'A') || setweight(to_tsvector('english', coalesce($10, '')), 'B') || setweight(to_tsvector('english', coalesce($5, '')), 'C') || setweight(to_tsvector('english', coalesce($9, '')), 'D'), to_tsvector('english', coalesce($10, '')) ) RETURNING pid`
	insertVariant := `INSERT INTO variant(title, options, requires_shipping, taxable, featured_image, available, price, grams, compare_price, position, shopify_id, created_at, updated_at, pid, inventory_quantity, sku, barcode) 
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING vid`

	for i := 0; i < len(productArr); i++ {
		product := productArr[i]

		// init transaction
		tx, err := db.Begin()
		if err != nil {
			log.Printf("%v%s", err, "unable to init transaction")
			break
		}

		// create base product
		var productID int
		var ProductImages []string
		for k := 0; k < len(product.Images); k++ {
			ProductImages = append(ProductImages, product.Images[k].Src)
		}
		err = tx.QueryRow(insertProducts, companyID, product.Description, product.ID, product.Handle, product.HTMLBody, product.CreatedAt, product.UpdatedAt, product.PublishedAt, product.Vendor, product.Category, product.Title, product.InventoryCount, pq.Array(ProductImages)).Scan(&productID)
		if err != nil {
			log.Printf("%v%s", err, "unable to create base product")
			tx.Rollback()
			break
		}

		// insert the variants
		var variantIDs []int
		for j := 0; j < len(product.Variants); j++ {
			variant := product.Variants[j]
			var variantID int
			err := tx.QueryRow(insertVariant, variant.Title, pq.Array([]string{variant.Option1, variant.Option2, variant.Option3}), variant.RequiresShipping, variant.Taxable, variant.FeaturedImage, variant.Available, variant.Price, variant.Grams, variant.ComparePrice, variant.Position, product.ID, variant.CreatedAt, variant.UpdatedAt, productID, variant.Inventory, variant.SKU, variant.Barcode).Scan(&variantID)
			variantIDs = append(variantIDs, variantID)
			if err != nil {
				log.Printf("%v%s", err, "unable to create variant")
			}
		}

		// commit the transaction
		err = tx.Commit()
		if err != nil {
			log.Printf("%v%s", err, "unable to complete transaction")
		}
	}

	db.Close()
	return nil
}
