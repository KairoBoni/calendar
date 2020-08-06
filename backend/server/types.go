package server

type User struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

type Event struct {
	ID          int64  `json:"id"`
	Name        string `json:"name"`
	UserEmail   string `json:"user_email"`
	Invite      string `json:"invite"`
	Description string `json:"description"`
	Start       int64  `json:"start"`
	End         int64  `json:"end"`
	Confirmed   bool   `json:"confirmed"`
}

type Login struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
