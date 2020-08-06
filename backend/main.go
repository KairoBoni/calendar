package main

import (
	"flag"
	"time"

	"github.com/KairoBoni/calendar/backend/server"
	"github.com/rs/zerolog/log"
)

func main() {
	flag.Parse()

	time.Sleep(10 * time.Second)

	s, err := server.NewServer()
	if err != nil {
		log.Fatal().Err(err).Msg("failed to create API Server")
	}

	if err = s.Run(); err != nil {
		log.Fatal().Err(err).Msg("failed to start API Server")
	}
}
