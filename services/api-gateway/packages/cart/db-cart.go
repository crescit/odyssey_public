package cart

import (
	"encoding/json"
	"log"
	"math"
	"strconv"
	"time"

	"github.com/crescit/odyssey/api/packages/shopify"
	pg "github.com/crescit/odyssey/api/postgres"
	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
)

// GetUserCartDatabaseHandler returns the cart information of the user
func GetUserCartDatabaseHandler(c *gin.Context, uid string) (*[]CartStruct, error) {
	var cartItems []CartStruct
	var getItemsInCart = `
	SELECT p.pid, c.vid, 
	p.title, p.category, p.images, 
	comp.id, comp.company_name, comp.metadata,
	v.price, v.title,
	p.html_body, c.quantity 
	FROM public.cart as c 
		INNER JOIN public.variant as v on c.vid = v.vid 
		INNER JOIN public.products as p on v.pid = p.pid	
		INNER JOIN public.company as comp on p.company_id = comp.id 
	WHERE c.customer_id = $1;`

	var getProductVIDs = `SELECT p.pid, array_agg(v.vid ORDER BY v.position ASC) FROM public.products p INNER JOIN public.variant v ON v.pid = p.pid WHERE p.pid = $1 GROUP BY p.pid;`

	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v %s", err, "error with database connection")
		return nil, err
	}
	defer db.Close()
	rows, error := db.Query(getItemsInCart, uid)
	if error != nil {
		log.Printf("%v %s", error, "error querying user cartItems")
		return nil, error
	}
	for rows.Next() {
		var item CartStruct
		var (
			prodID, compID, vid, quantity, tempID        int
			prod, cat, comp, price, desc, title, rawMeta string
			images                                       []string
			prodVIDs                                     []int64
		)
		var company shopify.DataReturnCompanyStruct
		err = rows.Scan(&prodID, &vid, &prod, &cat, pq.Array(&images), &compID, &comp, &rawMeta, &price, &title, &desc, &quantity)
		if err != nil {
			log.Printf("%v %s", err, "error with scanning cart item results")
			return nil, err
		}
		priceFloat, _ := strconv.ParseFloat(price, 64)

		row := db.QueryRow(getProductVIDs, prodID)
		err = row.Scan(&tempID, (*pq.Int64Array)(&prodVIDs))
		if err != nil {
			log.Printf("%v %s", err, "error getting product vids in GetUserCartDBHandler")
			return nil, err
		}

		err = json.Unmarshal([]byte(rawMeta), &company)
		if err != nil {
			log.Printf("%v %s", err, "error unmarshalling company metadata")
			return nil, err
		}

		// set the return values
		item.ProductID = prodID
		item.VID = vid
		item.CustomerID = uid
		item.CompanyID = compID
		item.Product = prod
		item.Category = cat
		if len(images) >= 1 {
			item.Image = images[0]
		}
		item.Images = images
		item.Company = comp
		item.CompanyImg = company.Image
		item.Price = priceFloat
		item.Description = desc
		item.VariantTitle = title
		item.Quantity = quantity
		item.Total = math.Round(priceFloat*float64(quantity)*100) / 100
		item.ProductVIDs = prodVIDs
		cartItems = append(cartItems, item)
	}
	db.Close()
	return &cartItems, nil
}

// PatchUserCartDatabaseHandler takes in the status and updated the appropriate order in postgres
func PatchUserCartDatabaseHandler(c *gin.Context, cart CartPostPatchRequestStruct) error {
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return err
	}
	defer db.Close()
	query := "UPDATE public.cart SET quantity = :quantity WHERE customer_id = :uid AND vid = :vid"
	_, err = db.NamedExec(query, map[string]interface{}{
		"uid":      cart.CustomerID,
		"vid":      cart.VID,
		"quantity": cart.Quantity,
	})
	db.Close()
	if err != nil {
		log.Printf("%v%s", err, "error updating the row")
		return err
	}
	return nil
}

// PostCreateCartDatabaseHandler takes in the request body and registers the cart in postgres
func PostCreateCartDatabaseHandler(c *gin.Context, cart CartPostPatchRequestStruct) error {
	Time := time.Now()
	prepState := "INSERT INTO public.cart (customer_id, vid, quantity, added_at) VALUES (:customer_id, :vid, :quantity, :added_at);"
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return err
	}
	defer db.Close()
	_, err = db.NamedExec(prepState, map[string]interface{}{
		"customer_id": cart.CustomerID,
		"vid":         cart.VID,
		"quantity":    cart.Quantity,
		"added_at":    Time,
	})
	if err != nil {
		log.Printf("%v%s", err, "error updating the row")
		return err
	}
	db.Close()
	return nil
}

// DeleteUserCartDatabaseHandler removes the vid(s) record in the cart table in postgres
func DeleteUserCartDatabaseHandler(c *gin.Context, uid string, vids []int64) error {
	// deleteUserCartItem := "DELETE FROM public.cart WHERE customer_id = $1 AND vid = $2;"
	deleteUserCartItem := "DELETE FROM public.cart WHERE customer_id = $1 AND vid = ANY ($2);"
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v %s", err, "error with database connection")
		return err
	}
	defer db.Close()
	_, err = db.Exec(deleteUserCartItem, uid, (*pq.Int64Array)(&vids))
	if err != nil {
		log.Printf("%v %s", err, "error updating the row - delete db-cart.go")
		return err
	}
	db.Close()
	return nil
}
