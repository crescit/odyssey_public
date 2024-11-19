package products

import (
	"database/sql"
	"log"
	"strconv"
	"time"

	shopify "github.com/crescit/odyssey/api/packages/shopify"
	pg "github.com/crescit/odyssey/api/postgres"

	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
)

// GetProductsByPIDDatabaseHandler returns one product detail
func GetProductsByPIDDatabaseHandler(c *gin.Context, pid int) ([]SearchReturnProductStruct, int, error) {
	var products []SearchReturnProductStruct
	var product SearchReturnProductStruct
	var images []string
	var vids []int64
	var vPrices []float64
	var vTitles []string
	var nullPrice sql.NullFloat64

	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return nil, 0, err
	}
	defer db.Close()
	// every product has at least one variant
	var getProductSQL = `SELECT p.pid, p.company_id, comp.company_name, p.html_body, p.handle, p.vendor, p.category, p.title, p.inventory_count, p.price, p.images, array_agg(v.vid ORDER BY v.position ASC), array_agg(v.price ORDER BY v.position ASC), array_agg(v.title ORDER BY v.position ASC)
	FROM public.products p 
		INNER JOIN public.variant v ON p.pid = v.pid 
		INNER JOIN public.company comp ON comp.id = p.company_id 
	WHERE p.pid = $1
	GROUP BY p.pid, p.company_id, comp.company_name, p.html_body, p.handle, p.vendor, p.category, p.title, p.inventory_count, p.price, p.images
	;`

	row := db.QueryRow(getProductSQL, pid)
	err = row.Scan(&product.PID, &product.CompanyID, &product.CompanyName, &product.Description, &product.Handle, &product.Vendor, &product.Category, &product.Title, &product.InventoryCount, &nullPrice, (*pq.StringArray)(&images), (*pq.Int64Array)(&vids), (*pq.Float64Array)(&vPrices), (*pq.StringArray)(&vTitles))
	if err != nil {
		log.Printf("%v %s", err, "error scanning product")
		return nil, 0, err
	}

	if !nullPrice.Valid {
		// when price is null, setting price to negative as a way to let the frontend know that it actually doesn't have a price
		product.Price = -0.0001
	} else {
		product.Price = nullPrice.Float64
	}
	if len(images) >= 1 {
		product.Image = images[0]
	}
	product.Images = images
	product.VIDs = vids
	product.Prices = vPrices
	product.VariantTitles = vTitles
	product.Store = ""
	product.InCart = false
	product.Total = 0
	products = append(products, product)

	db.Close()
	return products, 0, nil
}

// GetAllProductsDatabaseHandler returns list of all products; with pagination
func GetAllProductsDatabaseHandler(c *gin.Context, orderBy string, limit string, offset string) ([]SearchReturnProductStruct, int, error) {
	var products []SearchReturnProductStruct
	moreDataThanRequested, err := strconv.Atoi(limit)
	if err != nil {
		log.Printf("%v %s", err, "error converting limit to integer")
		return nil, 0, err
	}
	moreDataThanRequested++
	limit = strconv.Itoa(moreDataThanRequested)

	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v %s", err, "error with database connection")
		return nil, 0, err
	}
	defer db.Close()
	// TODO - assume every product has at least one variant
	var getAllProductsSQL = `SELECT p.pid, p.company_id, comp.company_name, p.html_body, p.handle, p.vendor, p.category, p.title, p.inventory_count, p.price, p.images, array_agg(v.vid ORDER BY v.position ASC), array_agg(v.price ORDER BY v.position ASC), array_agg(v.title ORDER BY v.position ASC)
	FROM public.products p 
		INNER JOIN public.variant v ON p.pid = v.pid 
		INNER JOIN public.company comp ON comp.id = p.company_id 
	GROUP BY p.pid, p.company_id, comp.company_name, p.html_body, p.handle, p.vendor, p.category, p.title, p.inventory_count, p.price, p.images
	ORDER BY `

	if limit == "0" {
		limit = "1000"
	}
	limitOffset := "LIMIT $1 OFFSET $2;"

	getAllProductsSQL = getAllProductsSQL + orderBy + limitOffset
	rows, err := db.Query(getAllProductsSQL, limit, offset)
	if err != nil {
		log.Printf("%v %s", err, "error querying product")
		return nil, 0, err
	}

	var count = 0
	var hasMoreData = 0
	for rows.Next() {
		var product SearchReturnProductStruct
		var images []string
		var vids []int64
		var vPrices []float64
		var vTitles []string
		var nullPrice sql.NullFloat64
		err = rows.Scan(&product.PID, &product.CompanyID, &product.CompanyName, &product.Description, &product.Handle, &product.Vendor, &product.Category, &product.Title, &product.InventoryCount, &nullPrice, (*pq.StringArray)(&images), (*pq.Int64Array)(&vids), (*pq.Float64Array)(&vPrices), (*pq.StringArray)(&vTitles))
		if err != nil {
			log.Printf("%v %s", err, "error scanning product")
			return nil, 0, err
		}

		count++
		if count < moreDataThanRequested {
			if !nullPrice.Valid {
				// when price is null, setting price to negative as a way to let the frontend know that it actually doesn't have a price
				product.Price = -0.0001
			} else {
				product.Price = nullPrice.Float64
			}
			if len(images) >= 1 {
				product.Image = images[0]
			}
			product.Images = images
			product.VIDs = vids
			product.Prices = vPrices
			product.VariantTitles = vTitles
			product.Store = ""
			product.InCart = false
			product.Total = 0
			products = append(products, product)
		} else {
			hasMoreData = 1
		}
	}

	db.Close()
	return products, hasMoreData, nil
}

// SearchProductsDatabaseHandler returns list of product based on the search terms; with pagination
func SearchProductsDatabaseHandler(c *gin.Context, searchWordList []string, searchLikeWordList []string, limit string, offset string) ([]SearchReturnProductStruct, int, error) {
	var products []SearchReturnProductStruct
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

	var getProductsSQL = `SELECT p.pid, p.company_id, comp.company_name, p.html_body, p.handle, p.vendor, p.category, p.title, p.inventory_count, p.price, p.images, array_agg(v.vid ORDER BY v.position ASC), array_agg(v.price ORDER BY v.position ASC), array_agg(v.title ORDER BY v.position ASC)
	FROM public.products p 
		INNER JOIN public.variant v ON p.pid = v.pid
		INNER JOIN public.company comp ON comp.id = p.company_id 
	WHERE textsearchable_product @@ to_tsquery('english', coalesce($1, '')) `
	searchTitle := "or p.title ilike ANY($4) "
	searchDescription := "or p.description ilike ANY($4)"
	searchVendor := "or p.vendor ilike ANY($4) "
	getProductsSQL += searchTitle + searchDescription + searchVendor

	if limit == "0" {
		limit = "1000"
	}
	limitOffset := "LIMIT $2 OFFSET $3;"
	groupBy := `GROUP BY p.pid, p.company_id, comp.company_name, p.html_body, p.handle, p.vendor, p.category, p.title, p.inventory_count, p.price, p.images `
	getProductsSQL += groupBy + limitOffset

	rows, err := db.Query(getProductsSQL, (*pq.StringArray)(&searchWordList), limit, offset, (*pq.StringArray)(&searchLikeWordList))
	if err != nil {
		log.Printf("%v %s", err, "error querying product")
		return nil, 0, err
	}

	var count = 0
	var hasMoreData = 0
	for rows.Next() {
		var product SearchReturnProductStruct
		var images []string
		var vids []int64
		var vPrices []float64
		var vTitles []string
		var nullPrice sql.NullFloat64
		err = rows.Scan(&product.PID, &product.CompanyID, &product.CompanyName, &product.Description, &product.Handle, &product.Vendor, &product.Category, &product.Title, &product.InventoryCount, &nullPrice, (*pq.StringArray)(&images), (*pq.Int64Array)(&vids), (*pq.Float64Array)(&vPrices), (*pq.StringArray)(&vTitles))
		if err != nil {
			log.Printf("%v%s", err, "error scanning product")
			return nil, 0, err
		}

		count++
		if count < moreDataThanRequested {
			if !nullPrice.Valid {
				// when price is null, setting price to negative as a way to let the frontend know that it actually doesn't have a price
				product.Price = -0.0001
			} else {
				product.Price = nullPrice.Float64
			}
			if len(images) >= 1 {
				product.Image = images[0]
			}
			product.Images = images
			product.VIDs = vids
			product.Prices = vPrices
			product.VariantTitles = vTitles
			product.Store = ""
			product.InCart = false
			product.Total = 0
			products = append(products, product)
		} else {
			hasMoreData = 1
		}
	}

	db.Close()
	return products, hasMoreData, nil
}

// GetAllCategoriesDatabaseHandler returns list of all categories; with pagination
func GetAllCategoriesDatabaseHandler(c *gin.Context, limit string, offset string) ([]CategoryStruct, int, error) {
	var categories []CategoryStruct
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

	var getAllCategoriesSQL = `SELECT category FROM public.products GROUP BY category ORDER BY category `
	if limit == "0" {
		limit = "1000"
	}
	limitOffset := "LIMIT $1 OFFSET $2;"
	getAllCategoriesSQL += limitOffset

	rows, err := db.Query(getAllCategoriesSQL, limit, offset)
	if err != nil {
		log.Printf("%v%s", err, "error querying category")
		return nil, 0, err
	}

	var count = 0
	var hasMoreData = 0
	for rows.Next() {
		var category CategoryStruct
		err = rows.Scan(&category.Category)
		if err != nil {
			log.Printf("%v%s", err, "error scanning category")
			return nil, 0, err
		}

		count++
		if count < moreDataThanRequested {
			categories = append(categories, category)
		} else {
			hasMoreData = 1
		}
	}

	db.Close()
	return categories, hasMoreData, nil
}

// SearchCategoriesDatabaseHandler returns list of category based on the search terms; with pagination
func SearchCategoriesDatabaseHandler(c *gin.Context, searchWordList []string, searchLikeWordList []string, limit string, offset string) ([]CategoryStruct, int, error) {
	var categories []CategoryStruct
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

	var getCategoriesSQL = `SELECT category FROM public.products 
	WHERE textsearchable_category @@ to_tsquery('english', coalesce($1, '')) `
	searchCategory := "or category ilike ANY($4)"
	getCategoriesSQL += searchCategory

	if limit == "0" {
		limit = "1000"
	}
	limitOffset := "LIMIT $2 OFFSET $3;"

	getCategoriesSQL += `GROUP BY category ORDER BY category ` + limitOffset

	rows, err := db.Query(getCategoriesSQL, (*pq.StringArray)(&searchWordList), limit, offset, (*pq.StringArray)(&searchLikeWordList))
	if err != nil {
		log.Printf("%v%s", err, "error querying category")
		return nil, 0, err
	}

	var count = 0
	var hasMoreData = 0
	for rows.Next() {
		var category CategoryStruct
		err = rows.Scan(&category.Category)
		if err != nil {
			log.Printf("%v%s", err, "error scanning category")
			return nil, 0, err
		}

		count++
		if count < moreDataThanRequested {
			categories = append(categories, category)
		} else {
			hasMoreData = 1
		}
	}

	db.Close()
	return categories, hasMoreData, nil
}

// GetCompanyProductsDatabaseHandler returns products for a company and their variants
func GetCompanyProductsDatabaseHandler(c *gin.Context, id int, limit string, offset string) ([]SearchReturnProductStruct, int, error) {
	var products []SearchReturnProductStruct
	if limit == "" || limit == "0" {
		limit = "1000"
	}
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

	var getProducts = `SELECT p.pid, p.company_id, comp.company_name, p.html_body, p.handle, p.vendor, p.category, p.title, p.inventory_count, p.price, p.images, array_agg(v.vid ORDER BY v.position ASC), array_agg(v.price ORDER BY v.position ASC), array_agg(v.title ORDER BY v.position ASC) 
	FROM public.products p 
		INNER JOIN public.variant v ON p.pid = v.pid 
		INNER JOIN public.company comp ON comp.id = p.company_id 
	WHERE company_id = $1 
	GROUP BY p.pid, p.company_id, comp.company_name, p.html_body, p.handle, p.vendor, p.category, p.title, p.inventory_count, p.price, p.images 
	ORDER BY p.created_at DESC, p.pid DESC 
	LIMIT $2 OFFSET $3
	`
	// if limit == "0" {
	// 	limit = "1000"
	// }

	rows, err := db.Query(getProducts, id, limit, offset)
	if err != nil {
		log.Printf("%v %s", err, "error querying company products")
		return nil, 0, err
	}

	var count = 0
	var hasMoreData = 0
	for rows.Next() {
		var product SearchReturnProductStruct
		var images []string
		var vids []int64
		var vPrices []float64
		var vTitles []string
		var nullPrice sql.NullFloat64
		err = rows.Scan(&product.PID, &product.CompanyID, &product.CompanyName, &product.Description, &product.Handle, &product.Vendor, &product.Category, &product.Title, &product.InventoryCount, &nullPrice, (*pq.StringArray)(&images), (*pq.Int64Array)(&vids), (*pq.Float64Array)(&vPrices), (*pq.StringArray)(&vTitles))
		if err != nil {
			log.Printf("%v%s", err, "error scanning product")
			return nil, 0, err
		}

		count++
		if count < moreDataThanRequested {
			if !nullPrice.Valid {
				// when price is null, setting price to negative as a way to let the frontend know that it actually doesn't have a price
				product.Price = -0.0001
			} else {
				product.Price = nullPrice.Float64
			}
			if len(images) >= 1 {
				product.Image = images[0]
			}
			product.Images = images
			product.VIDs = vids
			product.Prices = vPrices
			product.VariantTitles = vTitles
			product.Store = ""
			product.InCart = false
			product.Total = 0
			products = append(products, product)
		} else {
			hasMoreData = 1
		}
	}

	db.Close()
	return products, hasMoreData, nil
}

// GetCompanyVariantsDatabaseHandler takes a product ID and returns the variants associated with it
func GetCompanyVariantsDatabaseHandler(c *gin.Context, pid int) (*[]shopify.ShopifyProductVariantStruct, error) {
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return nil, err
	}
	defer db.Close()

	var variants []shopify.ShopifyProductVariantStruct
	var options []uint8

	var getVariants = "SELECT * FROM public.variant WHERE pid = $1 ORDER BY vid"
	rows, err := db.Query(getVariants, pid)
	if err != nil {
		log.Printf("%v%s%d", err, "unable to find variants for product", pid)
		return nil, err
	}
	for rows.Next() {
		var variant shopify.ShopifyProductVariantStruct
		_ = rows.Scan(&variant.ID, &variant.VID, &variant.Title, &options, &variant.RequiresShipping, &variant.Taxable, &variant.FeaturedImage, &variant.Available, &variant.Price, &variant.Grams, &variant.ComparePrice, &variant.Position, &variant.ShopifyID, &variant.CreatedAt, &variant.UpdatedAt, &variant.Inventory, &variant.SKU, &variant.Barcode)
		variants = append(variants, variant)
	}

	db.Close()
	return &variants, nil
}

// PostCreateProductDatabaseHandler makes a product in pg
func PostCreateProductDatabaseHandler(c *gin.Context, product ProductStruct, userID string) (int, error) {
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return -1, err
	}
	defer db.Close()

	// text search based A. title, B. category, C. description, D. vendor
	var prepState = `INSERT INTO public.products (company_id, title, category, html_body, price, images, vendor, inventory_count, created_at, updated_at, published_at, handle, textsearchable_product, textsearchable_category)
		SELECT c.id, $2, $3, $4, $5, $6, $7, $8, $9, $9, $9, $10, setweight(to_tsvector('english', coalesce($2, '')), 'A') || setweight(to_tsvector('english', coalesce($3, '')), 'B') || setweight(to_tsvector('english', coalesce($4, '')), 'C') || setweight(to_tsvector('english', coalesce($7, '')), 'D'), to_tsvector('english', coalesce($3, '')) 
		FROM public.company as c 
		INNER JOIN public.user as u on c.email = u.email 
		WHERE u.auth_id = $1
		RETURNING pid;
	`
	Time := time.Now()
	var productID int
	err = db.QueryRow(prepState, userID, product.Title, product.Category, product.Description, product.Price, pq.Array(product.Images), product.Vendor, product.InventoryCount, Time, product.Handle).Scan(&productID)
	if err != nil {
		log.Printf("%v%s", err, "unable to create product")
		return -1, err
	}

	db.Close()
	return productID, nil
}

// PostCreateVariantDatabaseHandler makes a variant in pg
func PostCreateVariantDatabaseHandler(c *gin.Context, variant VariantStruct) (int, error) {
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return -1, err
	}
	defer db.Close()

	Time := time.Now()
	insertVariant := `INSERT INTO variant(title, options, taxable, featured_image, available, price, grams, compare_price, position, inventory_quantity, sku, barcode, requires_shipping, shopify_id, created_at, updated_at, pid) 
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,
		'tbd', $14, $14,
		(SELECT pid FROM products WHERE pid=$15)) 
	RETURNING vid`

	var variantID int
	err = db.QueryRow(insertVariant, variant.Title, pq.Array(variant.Options), variant.Taxable, variant.FeaturedImage, variant.Available, variant.Price, variant.Grams, variant.ComparePrice, variant.Position, variant.InventoryCount, variant.SKU, variant.Barcode, variant.RequiresShipping, Time, variant.PID).Scan(&variantID)
	if err != nil {
		log.Printf("%v%s", err, "unable to create variant")
		return -1, err
	}

	db.Close()
	return variantID, nil
}

// PostCreateProductImageDatabaseHandler saves a link for a specific product ID
func PostCreateProductImageDatabaseHandler(c *gin.Context, request ProductImageUploadRequest) error {
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return err
	}
	defer db.Close()
	Time := time.Now()
	arr := []string{request.Link}
	updateImage := `UPDATE public.products SET images=$1, updated_at=$2 WHERE pid = $3;`
	_, err = db.Exec(updateImage, pq.Array(arr), Time, request.ProductID)
	if err != nil {
		log.Printf("%v%s", err, "error updating image for product")
		return err
	}
	db.Close()

	return nil
}

// PATCHProductDatabaseHandler updates product fields for a specific product ID
func PATCHProductDatabaseHandler(c *gin.Context, product PatchProductStruct) (*PatchProductStruct, error) {
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v %s", err, "error with DB connection")
		return nil, err
	}
	defer db.Close()
	Time := time.Now()
	updateProduct := `
	UPDATE public.products 
	SET title=$1, category=$2, html_body=$3, vendor=$4, updated_at=$5, 
			textsearchable_product = setweight(to_tsvector('english', coalesce($1, '')), 'A') || setweight(to_tsvector('english', coalesce($2, '')), 'B') || setweight(to_tsvector('english', coalesce($3, '')), 'C') || setweight(to_tsvector('english', coalesce($4, '')), 'D'), 
			textsearchable_category = to_tsvector('english', coalesce($2, ''))
	WHERE pid=$6 AND company_id=$7;`
	_, err = db.Exec(updateProduct, product.Title, product.Category, product.Description, product.Vendor, Time, product.PID, product.CompanyID)
	if err != nil {
		log.Printf("%v %s", err, "error updating product")
		return nil, err
	}
	db.Close()

	return &product, nil
}

// PatchProductImageDatabaseHandler adding an image link to existing list of images for a certain product ID
func PatchProductImageDatabaseHandler(c *gin.Context, request ProductImageUploadRequest) error {
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v %s", err, "error with database connection")
		return err
	}
	defer db.Close()
	curProdImages := `SELECT images FROM public.products WHERE pid = $1`
	Time := time.Now()
	var images []string
	row := db.QueryRow(curProdImages, request.ProductID)
	err = row.Scan((*pq.StringArray)(&images))

	images = append(images, request.Link)
	updateImage := `UPDATE public.products SET images=$1, updated_at=$2 WHERE pid = $3;`
	_, err = db.Exec(updateImage, pq.Array(images), Time, request.ProductID)
	if err != nil {
		log.Printf("%v %s", err, "error updating image for product")
		return err
	}
	db.Close()
	return nil
}

// DeleteProductImageDatabaseHandler deletes an image link from existing list of images for a certain product ID
func DeleteProductImageDatabaseHandler(c *gin.Context, pid int, cid int, imgToDelete DeleteProductImageRequest) error {
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return err
	}
	defer db.Close()
	curProdImages := `SELECT images FROM public.products WHERE pid = $1 AND company_id = $2`
	Time := time.Now()
	var images []string
	row := db.QueryRow(curProdImages, pid, cid)
	err = row.Scan((*pq.StringArray)(&images))
	idx := -1

	if (images[imgToDelete.ImgIdx] == imgToDelete.ImgLink) {
		idx = imgToDelete.ImgIdx
	} else { 
		return nil 
	}
	front := images[:idx]
	back := images[idx+1:]
	images = append(front, back...)

	updateImages := `UPDATE public.products SET images=$1, updated_at=$2  WHERE pid = $3 AND company_id = $4;`
	_, err = db.Exec(updateImages, pq.Array(images), Time, pid, cid)
	if err != nil {
		log.Printf("%v%s", err, "error updating image for product")
		return err
	}

	db.Close()
	return nil
}

// PatchProductCountDatabaseHandler updates invetory_count after purchase
// prodCountUpdate is a map with pid as key and quantity as value
func PatchProductCountDatabaseHandler(prodCountUpdate map[int]int) error {
	updateProdCount := `UPDATE public.products as p1 
	SET inventory_count = inventory_count + p2.count
	FROM (values `
	for pid, count := range prodCountUpdate {
		pidStr := strconv.Itoa(pid)
		cntStr := strconv.Itoa(count)
		updateProdCount += `(` + pidStr + `, ` + cntStr + `), `
	}
	updateProdCount = updateProdCount[:len(updateProdCount)-2]
	updateProdCount += `) as p2(pid, count) WHERE p2.pid = p1.pid;`
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return err
	}
	defer db.Close()
	_, err = db.Exec(updateProdCount)
	if err != nil {
		log.Printf("%v %s", err, "error updating count by pid")
		return err
	}
	db.Close()
	return nil
}
