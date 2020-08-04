package database

type User struct {
	FirstName string `db:"first_name"`
	LastName  string `db:"last_name"`
	Email     string `db:"email"`
	Password  string `db:"password"`
}

type Event struct {
	ID          string `db:"id"`
	Name        string `db:"name"`
	UserEmail   string `db:"user_email"`
	Description string `db:"description"`
	Start       int64  `db:"start_event"`
	End         int64  `db:"end_event"`
	Confirmed   bool   `db:"confirmed"`
}
