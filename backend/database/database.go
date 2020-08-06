package database

import (
	"fmt"
	"math"
	"time"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq" //database driver
	"github.com/pkg/errors"
	"github.com/rs/zerolog/log"
)

// Config sets the configuration for the database
type Config struct {
	Host     string `yaml:"host"`
	Port     int    `yaml:"port"`
	Username string `yaml:"username"`
	Password string `yaml:"password"`
	Name     string `yaml:"name"`
}

func genSchema() string {
	dbTimezone := `SET TIMEZONE TO 'America/Sao_Paulo';`

	userTable := `
		CREATE TABLE IF NOT EXISTS c_user (
		email TEXT NOT NULL PRIMARY KEY,
		first_name TEXT NOT NULL,
		last_name TEXT NOT NULL,
		password TEXT NOT NULL
	);`

	eventTable := `
		CREATE TABLE IF NOT EXISTS event (
		id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		name TEXT NOT NULL,
		description TEXT NOT NULL,
		start_event BIGINT NOT NULL,
		end_event BIGINT NOT NULL
		
	);`

	userEventTable := `
		CREATE TABLE IF NOT EXISTS user_event (
		id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		user_email TEXT REFERENCES c_user(email),
		event_id INTEGER REFERENCES event(id) ON DELETE CASCADE,
		confirmed BOOLEAN NOT NULL
	);`

	return dbTimezone + userTable + eventTable + userEventTable
}

func buildConnectionString(cfg Config) string {
	return fmt.Sprintf(
		"postgres://%v:%v@%v:%v/%v?sslmode=disable",
		cfg.Username,
		cfg.Password,
		cfg.Host,
		cfg.Port,
		cfg.Name,
	)
}

// CreateDB creates a new connection pool with the database and applies the database schema.
// The Postgres configurations can be found at docker-compose.yml in postgres container
func CreateDB(cfg Config) (*sqlx.DB, error) {
	const maxAttempts = 6
	var (
		db  *sqlx.DB
		err error
	)

	for attempt := 0; attempt < maxAttempts; attempt++ {
		db, err = sqlx.Open("postgres", buildConnectionString(cfg))
		if err == nil {
			break
		} else if attempt == maxAttempts-1 {
			log.Info().Msgf("Failed to connect to database, max attempts reached: %v", err)
			return nil, errors.Wrap(err, "failed to connect to database")
		}

		wait := time.Duration(math.Exp2(float64(attempt))) * time.Second
		log.Info().Msgf("Failed to connect to database. Retrying in %v...", wait)
		time.Sleep(wait)
	}

	_, err = db.Exec(genSchema())
	if err != nil {
		return nil, fmt.Errorf("failed to exec database schema: %+v", err)
	}
	log.Info().Msg("connected to database")
	return db, nil
}
