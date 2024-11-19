package orders

import (
	"encoding/json"
	"fmt"
	"log"
	"math"
	"strings"
	"time"

	pg "github.com/crescit/odyssey/api/postgres"
	"github.com/gin-gonic/gin"
)

// GetOrderDatabaseHandler connects to postgres and executes the statement to get the order
func GetOrderDatabaseHandler(c *gin.Context, id int) (*OrderStruct, error) {
	order := OrderStruct{}
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return &order, err
	}
	defer db.Close()
	var oid, first, last, comp, status, total string
	var getOrder = "SELECT o.order_id, public.user.first_name, public.user.last_name, public.company.company_name, o.total, o.status, o.items->>'items' FROM public.order as o INNER JOIN public.user on o.customer_id = public.user.auth_id INNER JOIN public.company on o.company_id = public.company.id WHERE o.order_id = $1;"
	var getProduct = "SELECT p.pid, p.name, p.image, p.price, p.brand FROM public.products as P WHERE p.pid= $1;"

	var items string

	// get the information for the order minus the item name and prices
	row := db.QueryRow(getOrder, id)
	err = row.Scan(&oid, &first, &last, &comp, &total, &status, &items)
	if err != nil {
		log.Printf("%v%s", err, "error with querying row")
		return &order, err
	}

	// set the return values
	order.Company = comp
	order.ID = id
	order.Status = status
	order.Customer = first + " " + last
	order.Total = total

	// get the values for all the items
	var ItemArr []ItemStruct
	var itemIDs []int
	err = json.Unmarshal([]byte(items), &itemIDs)
	if err != nil {
		log.Printf("%v%s", err, "error parsing items")
		return &order, nil
	}
	for i := 0; i < len(itemIDs); i++ {
		var itemID int
		var name, image, price, brand string
		var ItemStruct ItemStruct
		itemRow := db.QueryRow(getProduct, itemIDs[i])
		err = itemRow.Scan(&itemID, &name, &image, &price, &brand)
		if err != nil {
			log.Printf("%v%s", err, "error getting the information of the items in the order")
			return &order, nil
		}
		ItemStruct.ID = itemID
		ItemStruct.Name = name
		ItemStruct.Price = price
		ItemStruct.Brand = brand
		ItemStruct.Image = image
		ItemArr = append(ItemArr, ItemStruct)
	}
	db.Close()
	order.Items = ItemArr

	return &order, nil
}

// PatchOrderStatusDatabaseHandler takes in the status and updated the appropriate order in postgres
func PatchOrderStatusDatabaseHandler(c *gin.Context, oid int, status string) error {
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return err
	}
	defer db.Close()
	query := "UPDATE public.order SET status = :status WHERE order_id = :orderid "
	_, err = db.NamedExec(query, map[string]interface{}{
		"status":  status,
		"orderid": oid,
	})
	db.Close()
	if err != nil {
		log.Printf("%v%s", err, "error updating the row")
		return err
	}

	return nil
}

// GetUserOrdersDatabaseHandler returns the orders of the user without any item history
func GetUserOrdersDatabaseHandler(c *gin.Context, uid string, status string) (*[]OrdersStruct, error) {
	var Orders []OrdersStruct
	var getOrders = `SELECT DISTINCT o.order_id, o.items, o.total, o.status, o.created, o.updated, o.intent_id, 
									u.email, u.first_name, u.last_name FROM public.order as o INNER JOIN public.company as c 
									ON o.company_id = c.id INNER JOIN public.user as u ON u.auth_id = o.customer_id WHERE 
									o.company_id = (SELECT c.id FROM public.company as c INNER JOIN public.user 	
									ON c.email = public.user.email WHERE public.user.auth_id = $1)`

	var getOrdersWithStatus = `SELECT DISTINCT o.order_id, o.items, o.total, o.status, o.created, o.updated, o.intent_id, 
														u.email, u.first_name, u.last_name FROM public.order as o INNER JOIN public.company as c 
														ON o.company_id = c.id INNER JOIN public.user as u ON u.auth_id = o.customer_id WHERE 
														o.status = $1 and o.company_id = (SELECT c.id FROM public.company as c INNER JOIN public.user 
															ON c.email = public.user.email WHERE public.user.auth_id = $2);`

	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return nil, err
	}
	defer db.Close()

	if status == "" {
		rows, error := db.Queryx(getOrders, uid)
		if error != nil {
			log.Printf("%v%s", error, "error querying user orders")
			return nil, error
		}
		for rows.Next() {
			var firstName, lastName string
			var order OrdersStruct
			var items OrderItems
			var cart []CartStruct
			err = rows.Scan(&order.ID, &items.CartStruct, &order.Total, &order.Status, &order.Created, &order.Updated, &order.IntentId, &order.CustomerEmail, &firstName, &lastName)
			json.Unmarshal(items.CartStruct, &cart)
			order.Products = cart
			order.Customer = firstName + " " + lastName
			Orders = append(Orders, order)
		}
		db.Close()
	} else {
		rows, error := db.Queryx(getOrdersWithStatus, status, uid)
		if error != nil {
			log.Printf("%v%s", error, "error querying user orders")
			return nil, error
		}
		for rows.Next() {
			var firstName, lastName string
			var order OrdersStruct
			var items OrderItems
			var cart []CartStruct
			err = rows.Scan(&order.ID, &items.CartStruct, &order.Total, &order.Status, &order.Created, &order.Updated, &order.IntentId, &order.CustomerEmail, &firstName, &lastName)
			json.Unmarshal(items.CartStruct, &cart)
			order.Products = cart
			order.Customer = firstName + " " + lastName
			Orders = append(Orders, order)
		}
		db.Close()
	}
	return &Orders, nil
}

// PostCreateOrderDatabaseHandler takes in the request body and registers the order in postgres
func PostCreateOrderDatabaseHandler(c *gin.Context, order OrderPostRequestStruct) error {
	Time := time.Now()
	prepState := "INSERT INTO public.order (customer_id, company_id, items, total, status, created, updated) VALUES (:customer_id, :company_id, :items, :total, :status, :created, :updated);"
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return err
	}
	defer db.Close()
	itemStr := "{\"items\": \"" + intArrayToString(order.Items) + "\" }"
	_, err = db.NamedExec(prepState, map[string]interface{}{
		"customer_id": order.CustomerID,
		"company_id":  order.CompanyID,
		"items":       itemStr,
		"total":       math.Floor(order.Total*100) / 100,
		"status":      order.Status,
		"created":     Time,
		"updated":     Time,
	})
	if err != nil {
		log.Printf("%v%s", err, "error updating the row")
		return err
	}
	db.Close()
	return nil
}

func intArrayToString(arr []int) string {
	return strings.Trim(strings.Replace(fmt.Sprint(arr), " ", ",", -1), "")
}
