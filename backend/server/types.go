package server

type User struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

type Event struct {
	Name        string `json:"name"`
	UserEmail   string `json:"user_email"`
	Description string `json:"description"`
	Start       int64  `json:"start"`
	End         int64  `json:"end"`
	Confirmed   bool   `json:"confirmed"`
}

type Login struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
