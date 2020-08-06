package server

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

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

	if user.FirstName == "" || user.LastName == "" || user.Email == "" || user.Password == "" {
		return c.JSON(http.StatusInternalServerError, fmt.Errorf("Not Find Name, Email or Password"))
	}
	err := h.db.InsertNewUser(user.FirstName, user.LastName, user.Email, user.Password)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, "successfully")
}

func (h *Handler) createEvent(c echo.Context) error {

	event := &Event{}
	if err := c.Bind(event); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	if event.Name == "" || event.Description == "" || event.UserEmail == "" {
		return c.JSON(http.StatusInternalServerError, fmt.Errorf("Not Find Name, Description or UserEmail"))
	}

	eventID, err := h.db.InsertNewEvent(event.Name, event.Description, event.Start, event.End)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	err = h.db.InsertNewUserEvent(event.UserEmail, eventID, event.Confirmed)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	if event.Invite != "" {
		err = h.db.InsertNewUserEvent(event.Invite, eventID, false)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err.Error())
		}
	}

	return c.JSON(http.StatusOK, "successfully")
}

func (h *Handler) login(c echo.Context) error {
	l := &Login{}
	if err := c.Bind(l); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	if l.Email == "" || l.Password == "" {
		return c.JSON(http.StatusUnauthorized, "Empty password or email")
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
	fmt.Println(userEmail)
	events, err := h.db.GetEvents(userEmail)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	if len(events) == 0 {
		return c.JSON(http.StatusOK, "[]")
	}
	fmt.Println(events)

	r, err := json.Marshal(events)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, string(r))
}

func (h *Handler) getUserEmails(c echo.Context) error {
	emails, err := h.db.GetUsersEmails()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	r, err := json.Marshal(emails)
	if err != nil {

		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, string(r))
}

func (h *Handler) updateEvent(c echo.Context) error {
	event := &Event{}
	if err := c.Bind(event); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	err := h.db.UpdateEvent(event.ID, event.Name, event.Description, event.Start, event.End)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, "successfully")
}

func (h *Handler) deleteEvent(c echo.Context) error {
	IDstring := c.Param("id")
	ID, err := strconv.ParseInt(IDstring, 10, 64)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	err = h.db.DeleteEvent(ID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, "successfully")
}

func (h *Handler) confirmInvite(c echo.Context) error {
	event := &Event{}
	if err := c.Bind(event); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	err := h.db.ConfirmInvite(event.UserEmail, event.ID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, "successfully")
}

func (h *Handler) refuseInvite(c echo.Context) error {
	event := &Event{}
	if err := c.Bind(event); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	err := h.db.RefuseInvite(event.UserEmail, event.ID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, "successfully")
}
