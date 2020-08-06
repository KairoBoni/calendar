package database

import (
	"database/sql"

	"github.com/jmoiron/sqlx"
)

//Store implements the StoreInterface
type Store struct {
	db *sqlx.DB
}

//StoreInterface interface to all actions in database
type StoreInterface interface {
	InsertNewUser(firstName, lastName, email, password string) error
	InsertNewEvent(name, description string, start, end int64) (int64, error)
	InsertNewUserEvent(userEmail string, eventID int64, confirmed bool) error
	GetUser(userEmail string) (*User, error)
	GetEvents(userEmail string) ([]Event, error)
	GetUsersEmails() ([]string, error)
	UpdateEvent(id int64, name, description string, start, end int64) error
	DeleteEvent(id int64) error
	ConfirmInvite(email string, id int64) error
	RefuseInvite(email string, id int64) error
}

//NewStore create a new store with the seted config
func NewStore() (*Store, error) {

	cfg := &Config{
		Host:     "postgres",
		Port:     5432,
		Username: "postgres",
		Password: "haha1212",
		Name:     "postgres",
	}

	db, err := CreateDB(*cfg)
	if err != nil {
		return nil, err
	}
	return &Store{db}, nil
}

//Ping just test the connection with database
func (s *Store) Ping() error {
	return s.db.Ping()
}

func (s *Store) InsertNewUser(firstName, lastName, email, password string) error {
	_, err := s.db.Exec(insertNewUser, firstName, lastName, email, password)
	if err != nil {
		return err
	}
	return nil
}

func (s *Store) InsertNewEvent(name, description string, start, end int64) (int64, error) {
	var eventID int64
	err := s.db.QueryRow(insertNewEvent, name, description, start, end).Scan(&eventID)
	if err != nil {
		return 0, err
	}

	return eventID, nil
}

func (s *Store) InsertNewUserEvent(userEmail string, eventID int64, confirmed bool) error {
	_, err := s.db.Exec(insertNewUserEvent, userEmail, eventID, confirmed)
	if err != nil {
		return err
	}
	return nil
}

func (s *Store) GetUser(userEmail string) (*User, error) {
	user := &User{}
	rows, err := s.db.Queryx(getUser, userEmail)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	defer rows.Close()

	if rows.Next() {
		if err := rows.StructScan(&user); err != nil {
			return nil, err
		}
	}

	return user, nil
}

func (s *Store) GetUsersEmails() ([]string, error) {
	var emails []string

	rows, err := s.db.Queryx(getUsersEmail)
	if err != nil {
		if err == sql.ErrNoRows {
			return []string{}, nil
		}
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var email string
		if err := rows.Scan(&email); err != nil {
			return emails, err
		}
		emails = append(emails, email)
	}
	if err := rows.Err(); err != nil {
		return emails, err
	}
	return emails, nil

}

func (s *Store) GetEvents(userEmail string) ([]Event, error) {
	var events []Event

	rows, err := s.db.Queryx(getEvents, userEmail)
	if err != nil {
		if err == sql.ErrNoRows {
			return []Event{}, nil
		}
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var event Event
		if err := rows.StructScan(&event); err != nil {
			return events, err
		}
		events = append(events, event)
	}
	if err := rows.Err(); err != nil {
		return events, err
	}
	return events, nil

}

func (s *Store) UpdateEvent(id int64, name, description string, start, end int64) error {
	_, err := s.db.Queryx(updateEvent, name, description, start, end, id)
	if err != nil {
		return err
	}
	return nil
}

func (s *Store) DeleteEvent(id int64) error {
	_, err := s.db.Queryx(deleteUserEvent, id)
	if err != nil {
		return err
	}

	_, err = s.db.Queryx(deleteEvent, id)
	if err != nil {
		return err
	}
	return nil
}

func (s *Store) ConfirmInvite(email string, id int64) error {
	_, err := s.db.Queryx(confirmInvite, email, id)
	if err != nil {
		return err
	}
	return nil
}

func (s *Store) RefuseInvite(email string, id int64) error {
	_, err := s.db.Queryx(refuseInvite, email, id)
	if err != nil {
		return err
	}
	return nil
}
