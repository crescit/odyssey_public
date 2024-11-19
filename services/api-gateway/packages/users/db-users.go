package users

import (
	"fmt"
	"log"

	"github.com/crescit/odyssey/api/packages/auth0"
	pg "github.com/crescit/odyssey/api/postgres"
	"github.com/gin-gonic/gin"
)

// GetUserDatabaseHandler retrieves existing user info
func GetUserDatabaseHandler(c *gin.Context, uid string) (*auth0.UserStruct, error) {
	var user auth0.UserStruct
	getUserSQL := `SELECT * FROM public.user as c WHERE c.auth_id = $1`
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return nil, err
	}
	defer db.Close()
	var id int64
	var authID string
	row := db.QueryRow(getUserSQL, uid)
	err = row.Scan(&id, &user.First, &user.Last, &user.Email, &authID, &user.OnboardStep)
	if err != nil {
		log.Printf("%v%s", err, "error with querying row")
		return &user, err
	}
	user.ID = "Encrypted"
	return &user, nil
}

// PostCreateUserDatabaseHandler inserts the user if the user does not exist already
func PostCreateUserDatabaseHandler(c *gin.Context, user auth0.UserStruct) error {
	prepState := "INSERT INTO public.user (auth_id, first_name, last_name, email, onboard_step) VALUES (:auth_id, :first_name, :last_name, :email, 1) ON CONFLICT (auth_id) DO NOTHING;"
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return err
	}
	defer db.Close()
	_, err = db.NamedExec(prepState, map[string]interface{}{
		"auth_id":    user.ID,
		"first_name": user.First,
		"last_name":  user.Last,
		"email":      user.Email,
	})

	return nil
}

// PatchUserDatabaseHandler takes in onboard_step and updates it
func PatchUserDatabaseHandler(c *gin.Context, user auth0.PatchUserStruct) error {
	db, err := pg.NewDatabase()
	if err != nil {
		log.Printf("%v%s", err, "error with database connection")
		return err
	}
	defer db.Close()

	var onboardStep string
	stepNum := fmt.Sprintf("%.1f", user.OnboardStep)

	if user.OnboardStep != 0 {
		onboardStep = "onboard_step = :onboard_step"
	}

	query := "UPDATE public.user SET " + onboardStep + " WHERE auth_id = :uid"
	_, err = db.NamedExec(query, map[string]interface{}{
		"uid":          user.ID,
		"onboard_step": stepNum,
	})
	db.Close()
	if err != nil {
		log.Printf("%v%s", err, "error updating the row")
		return err
	}

	return nil
}
