package server

import (
	"encoding/json"
	"net/http"

	"github.com/KairoBoni/calendar/backend/database"
	"github.com/labstack/echo/v4"
)

//Handler implement all methos of the REST-API
type Handler struct {
	db database.StoreInterface
}

func (h *Handler) createUser(c echo.Context) error {

	user := &User{}
	if err := c.Bind(user); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	err := h.db.InsertNewUser(user.FirstName, user.LastName, user.Email, user.Password)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, "Sucessfull")
}

func (h *Handler) createEvent(c echo.Context) error {

	event := &Event{}
	if err := c.Bind(event); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	eventID, err := h.db.InsertNewEvent(event.Name, event.Description, event.Start, event.End)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	err = h.db.InsertNewUserEvent(event.UserEmail, eventID, event.Confirmed)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, "Sucessfull")
}

func (h *Handler) login(c echo.Context) error {

	l := &Login{}
	if err := c.Bind(l); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	user, err := h.db.GetUser(l.Email)
	if err != nil {

		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	if user == nil {
		return c.JSON(http.StatusUnauthorized, "Incorrect password or email")
	}

	if user.Password != l.Password {
		return c.JSON(http.StatusUnauthorized, "Incorrect password or email")
	}

	r, err := json.Marshal(user)
	if err != nil {

		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, string(r))
}

func (h *Handler) getEvents(c echo.Context) error {
	userEmail := c.Param("email")

	emails, err := h.db.GetEvents(userEmail)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	r, err := json.Marshal(emails)
	if err != nil {

		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, string(r))
}
