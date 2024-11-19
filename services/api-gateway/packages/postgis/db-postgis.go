package postgis

import (
	"encoding/json"
	"fmt"
	"log"

	pg "github.com/crescit/odyssey/api/postgres"
	"github.com/gin-gonic/gin"
)

// GetCompaniesWithLocationHandler takes in lat, long, and range and returns each business point within that radius
func GetCompaniesWithLocationDatabaseHandler(c *gin.Context, lat float64, long float64, rng int) ([]CompaniesLocationStruct, error) {
	var locations []CompaniesLocationStruct

	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return nil, err
	}
	defer db.Close()

	// init transaction
	tx, err := db.Begin()
	if err != nil {
		log.Printf("%v%s", err, " unable to init transaction")
		return nil, err
	}

	// tried passing statement to query didn't work so have to do transaction
	var point string
	pointStatement := fmt.Sprintf("SELECT ST_GeometryFromText('POINT(%f %f)', 4326)", long, lat)
	rows, err := tx.Query(pointStatement)
	for rows.Next() {
		err = rows.Scan(&point)
	}

	/**
	-- gets all company points within the location table
	SELECT c.company_name, c.email, c.id, l.addresses, l.geom::geography
	FROM public.company as c
	INNER JOIN public.user as u on c.email = u.email
	INNER JOIN public.location as l on u.auth_id = l.auth_id
	WHERE ST_DistanceSphere(l.geom, %s) <= %d;
	*/

	// part of metadata key equal img":"https://images.odysseycommerce.com/san_francisco_lightning_photography_golden_gate_bridge.jpg
	// 25 miles = 40,233.6 Meters when we support ranges, multiply it
	statement := `SELECT DISTINCT ON (c.id) c.company_name, c.email, c.id, l.addresses, l.geom, c.metadata->'img' AS img, c.metadata->'desc' AS desc, c.metadata->'phone' as phone, c.metadata->'city' as city, c.metadata->'category' as category, round((ST_DistanceSphere(l.geom, $1) / 1000) * 0.62)
		FROM public.company as c
		INNER JOIN public.user as u on c.email = u.email
		INNER JOIN public.location as l on u.auth_id = l.auth_id
		WHERE ST_DistanceSphere(l.geom, $1) <= $2 AND l.addresses ->> 'zip' != '';`

	rows, err = tx.Query(statement, point, 402334)
	if err != nil {
		log.Printf("%v%s", err, "unable to get products by location")
		return nil, err
	}
	for rows.Next() {
		var unsafeAddr []uint8
		var location CompaniesLocationStruct
		_ = rows.Scan(&location.Name, &location.Email, &location.CompanyID, &unsafeAddr, &location.Point, &location.Image, &location.Description, &location.Phone, &location.City, &location.Category, &location.Distance)
		var addr StandardAddress
		if err := json.Unmarshal(unsafeAddr, &addr); err != nil {
			log.Printf("%s %v", "unable to unmarshal company address", err)
		}
		location.Address = addr
		locations = append(locations, location)
	}
	db.Close()
	return locations, nil
}

// PostCreateUserAddressDatabaseHandler stores a point for a user in postgres
func PostCreateUserAddressDatabaseHandler(c *gin.Context, addr StandardAddress, authID string) error {
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return err
	}
	defer db.Close()

	// init transaction
	tx, err := db.Begin()
	if err != nil {
		log.Printf("%v%s", err, " unable to init transaction")
		return err
	}

	// tried passing statement to query didn't work so have to do transaction
	var point string
	pointStatement := fmt.Sprintf("SELECT ST_GeometryFromText('POINT(%f %f)', 4326)", addr.Longitude, addr.Latitude)
	rows, err := tx.Query(pointStatement)
	for rows.Next() {
		err = rows.Scan(&point)
	}

	statement := `
		INSERT INTO public.location (geom, auth_id, addresses)
		VALUES ( $1 , $2 , $3 )
		RETURNING id;
	`

	var id int
	jsn, _ := json.Marshal(addr)
	err = tx.QueryRow(statement, point, authID, jsn).Scan(&id)
	if err != nil {
		log.Printf("%v%s", err, "error inserting user location")
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
