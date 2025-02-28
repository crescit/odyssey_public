package postgres

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/DavidHuie/gomigrate"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

// Client is the database client
type Client struct {
	dbName string
	db     *sqlx.DB
	newID  func() string
}

// NewDatabase returns a new instance of the database client
func NewDatabase() (*sqlx.DB, error) {
	var usr = os.Getenv("PG_USER")
	var pass = os.Getenv("PG_PASS")
	var host = os.Getenv("PG_HOST")
	var port = os.Getenv("PG_PORT")
	var dbName = os.Getenv("PG_DBNAME")

	//if os.Getenv("RUNNING_DEV_SERVER") == "true" {
	//	return sqlx.Connect("postgres", os.Getenv("PG_URL"))
	//} else {
	// aws only
	return sqlx.Connect("postgres", fmt.Sprintf("host=%s port=%s user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port,
		usr, pass, dbName))
	//  }
}

// RunMigrations sets up the database environment
func RunMigrations() {
	var usr = os.Getenv("PG_USER")
	var pass = os.Getenv("PG_PASS")
	var host = os.Getenv("PG_HOST")
	var port = os.Getenv("PG_PORT")
	var dbName = os.Getenv("PG_DBNAME")
	var url string
	awsURL := fmt.Sprintf("host=%s port=%s user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port,
		usr, pass, dbName)
	//pgURL := os.Getenv("PG_URL")
	//if os.Getenv("RUNNING_DEV_SERVER") == "true" {
	//	url = pgURL
	// } else {
	log.Print(awsURL)
	url = awsURL
	//}

	ex, err := os.Executable()
	if err != nil {
		panic(err)
	}
	exPath := filepath.Dir(ex)
	fmt.Println(exPath)
	log.Print("suh dude")

	db, err := sql.Open("postgres", url)
	if err != nil {
		log.Printf("%v", err)
	}

	migrator, _ := gomigrate.NewMigrator(db, gomigrate.Postgres{}, "./postgres/migrations")

	err = migrator.Migrate()
	if err != nil {
		log.Println(err)
	}
}
