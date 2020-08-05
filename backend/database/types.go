package database

type User struct {
	FirstName string `db:"first_name" json:"first_name"`
	LastName  string `db:"last_name" json:"last_name"`
	Email     string `db:"email" json:"email"`
	Password  string `db:"password" json:"password"`
}

type Event struct {
	ID          int64  `db:"id" json:"id"`
	Name        string `db:"name" json:"name"`
	UserEmail   string `db:"user_email" json:"user_email"`
	Description string `db:"description" json:"description"`
	Start       int64  `db:"start_event" json:"start"`
	End         int64  `db:"end_event" json:"end"`
	Confirmed   bool   `db:"confirmed" json:"confirmed"`
}
