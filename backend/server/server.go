package server

import (
	"github.com/KairoBoni/calendar/backend/database"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/rs/zerolog/log"
)

type Server struct {
	route    *echo.Echo
	handlers *Handler
}

//NewServer create a new server of the REST-API
func NewServer() (*Server, error) {
	store, err := database.NewStore()
	if err != nil {
		return nil, err
	}
	s := &Server{
		route: echo.New(),
		handlers: &Handler{
			db: store,
		},
	}
	s.setupRoutes()

	return s, nil

}

func (s *Server) setupRoutes() {
	s.route.Use(middleware.Recover())

	s.route.Use(corsMiddleware([]string{"http://localhost:3000"}))

	s.route.Static("/", "./web")

	s.route.POST("/user/create", s.handlers.createUser)
	s.route.POST("/user/login", s.handlers.login)
	s.route.GET("/user/list", s.handlers.getUserEmails)
	s.route.POST("/event/create", s.handlers.createEvent)
	s.route.GET("/event/list/:email", s.handlers.getEvents)
	s.route.PUT("/event/update", s.handlers.updateEvent)
	s.route.DELETE("/event/delete/:id", s.handlers.deleteEvent)
	s.route.PUT("/event/confirm", s.handlers.confirmInvite)
	s.route.DELETE("/event/refuse", s.handlers.refuseInvite)

}

//Run starts the server
func (s *Server) Run() error {
	s.route.HideBanner = true
	log.Info().Msg("Server start on localhost:5002/")
	return s.route.Start(":5002")
}

func corsMiddleware(allowOrigins []string) echo.MiddlewareFunc {
	return middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     allowOrigins,
		AllowCredentials: true,
	})
}
