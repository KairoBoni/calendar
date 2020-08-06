import { CalendarActionTypes } from "./actionTypes";
import { User, Login, Event }  from "../types"


export const signupPage = () => (dispatch: any) => {
    dispatch({type: CalendarActionTypes.SIGNUP_PAGE});
};


export const loginPage = () => (dispatch: any) => {
    dispatch({type: CalendarActionTypes.LOGIN_PAGE});
};
    
export const eventsPage = () => (dispatch: any) => {
    dispatch({type: CalendarActionTypes.EVENTS_PAGE});
};

const setEventPage = () => ({
    type: CalendarActionTypes.EVENTS_PAGE,
});

export const newMsg = (severity: "success" | "error" | "info" | "warning", msg: string) => ({
    type: CalendarActionTypes.NEW_MSG,
    payload: {severity, msg},
  });


export const DispatchNewMsg = (severity: "success" | "error" | "info" | "warning", msg: string) => (dispatch: any) => {
    dispatch({
    type: CalendarActionTypes.NEW_MSG,
    payload: {severity, msg},
})};


export const closeSnackBar = () => (dispatch: any) => {
    dispatch({type: CalendarActionTypes.CLOSE_SNACKBAR});
};
  
export const createUser = (user: User) => (dispatch: any) => {
    dispatch({
        type: CalendarActionTypes.REGISTER_USER,
        payload: {
        request: {
            method: "POST",
            url: `/user/create`,
            data: user
        },
        options: {
            onSuccess: ( { response }: any) => {
                dispatch({
                    type: CalendarActionTypes.REGISTER_USER_SUCCESS,
                });
                dispatch(newMsg(
                    "success",
                    "User Created",
                ));
            },
            onError: ({ response }: any) => {
            dispatch({
                type: CalendarActionTypes.REGISTER_USER_FAILURE,
            });
            },
        },
        },
    });
};

export const login = (user: Login) => (dispatch: any) => {
    dispatch({
        type: CalendarActionTypes.LOGIN,
        payload: {
        request: {
            method: "POST",
            url: `/user/login`,
            data: user
        },
        options: {
            onSuccess: ( { response }: any) => {
                dispatch({
                    type: CalendarActionTypes.LOGIN_SUCCESS,
                    payload: response.data,
                });

                console.log(response)
                const message = (response.status === 200) ? "Success" : "Wrong User or Passoword"
                const severity = (response.status === 200) ? "success" : "warning"
                dispatch(newMsg(
                    severity,
                    message,
                ));
                (response.status === 200) && dispatch(setEventPage());
            },
            onError: ({ response }: any) => {
                dispatch({
                    type: CalendarActionTypes.LOGIN_FAILURE,
                });
                dispatch(newMsg(
                    "error",
                    "Failed To Login",
                ));
            },
        },
        },
    });
};

export const getEvents = (email: string) => (dispatch: any) => {
    dispatch({
        type: CalendarActionTypes.GET_EVENTS,
        payload: {
        request: {
            method: "GET",
            url: `/event/list/${email}`,
        },
        options: {
            onSuccess: ( { response }: any) => {
                dispatch({
                    type: CalendarActionTypes.GET_EVENTS_SUCCESS,
                    payload: response.data,
                });
                dispatch(setEventPage());
            },
            onError: ({ response }: any) => {
                dispatch({
                    type: CalendarActionTypes.GET_EVENTS_FAILURE,
                });
                dispatch(newMsg(
                    "error",
                    "Failed To Get Events",
                ));
            },
        },
        },
    });
};

export const createEvent = (event: Event) => (dispatch: any) => {
    dispatch({
        type: CalendarActionTypes.CREATE_EVENT,
        payload: {
        request: {
            method: "POST",
            url: `/event/create`,
            data: event,
        },
        options: {
            onSuccess: ( { response }: any) => {
                dispatch({
                    type: CalendarActionTypes.CREATE_EVENT_SUCCESS,
                });
                dispatch(newMsg(
                    "success",
                    "Event Created",
                ));

            },
            onError: ({ response }: any) => {
                dispatch({
                    type: CalendarActionTypes.CREATE_EVENT_FAILURE,
                });
                dispatch(newMsg(
                    "error",
                    "Failed To Get Events",
                ));
            },
        },
        },
    });
};

export const getEmailUsers = () => (dispatch: any) => {
    dispatch({
        type: CalendarActionTypes.GET_USERS_EMAIL,
        payload: {
        request: {
            method: "GET",
            url: `/user/list`,
        },
        options: {
            onSuccess: ( { response }: any) => {
                dispatch({
                    type: CalendarActionTypes.GET_USERS_EMAIL_SUCCESS,
                    payload: response.data,
                });
                console.log(response.data)
                dispatch(setEventPage());
            },
            onError: ({ response }: any) => {
                dispatch({
                    type: CalendarActionTypes.GET_USERS_EMAIL_FAILURE,
                });
                dispatch(newMsg(
                    "error",
                    "Failed To Get Events",
                ));
            },
        },
        },
    });
};


export const updateEvent = (event: Event) => (dispatch: any) => {
    dispatch({
        type: CalendarActionTypes.UPDATE_EVENT,
        payload: {
        request: {
            method: "PUT",
            url: `/event/update`,
            data: event,
        },
        options: {
            onSuccess: ( { response }: any) => {
                dispatch({
                    type: CalendarActionTypes.UPDATE_EVENT_SUCCESS,
                });
                dispatch(newMsg(
                    "success",
                    "Event Updated",
                ));

            },
            onError: ({ response }: any) => {
                dispatch({
                    type: CalendarActionTypes.UPDATE_EVENT_FAILURE,
                });
                dispatch(newMsg(
                    "error",
                    "Failed To Update Event",
                ));
            },
        },
        },
    });
};


export const deleteEvent = (id: number) => (dispatch: any) => {
    dispatch({
        type: CalendarActionTypes.DELETE_EVENT,
        payload: {
        request: {
            method: "DELETE",
            url: `/event/delete/${id}`,
        },
        options: {
            onSuccess: ( { response }: any) => {
                dispatch({
                    type: CalendarActionTypes.DELETE_EVENT_SUCCESS,
                });
                dispatch(newMsg(
                    "success",
                    "Event Deleted",
                ));

            },
            onError: ({ response }: any) => {
                dispatch({
                    type: CalendarActionTypes.DELETE_EVENT_FAILURE,
                });
                dispatch(newMsg(
                    "error",
                    "Failed To Delete Event",
                ));
            },
        },
        },
    });
};


export const acceptEvent = (event: Event) => (dispatch: any) => {
    dispatch({
        type: CalendarActionTypes.ACCEPT_EVENT,
        payload: {
        request: {
            method: "PUT",
            url: `/event/confirm`,
            data: event,
        },
        options: {
            onSuccess: ( { response }: any) => {
                dispatch({
                    type: CalendarActionTypes.ACCEPT_EVENT_SUCCESS,
                });
                dispatch(newMsg(
                    "success",
                    "Event Accept",
                ));

            },
            onError: ({ response }: any) => {
                dispatch({
                    type: CalendarActionTypes.ACCEPT_EVENT_FAILURE,
                });
                dispatch(newMsg(
                    "error",
                    "Failed To Accept Event",
                ));
            },
        },
        },
    });
};


export const refuseEvent = (event: Event) => (dispatch: any) => {
    dispatch({
        type: CalendarActionTypes.REFUSE_EVENT,
        payload: {
        request: {
            method: "DELETE",
            url: `/event/refuse`,
            data: event,
        },
        options: {
            onSuccess: ( { response }: any) => {
                dispatch({
                    type: CalendarActionTypes.REFUSE_EVENT_SUCCESS,
                });
                dispatch(newMsg(
                    "success",
                    "Event Refused",
                ));

            },
            onError: ({ response }: any) => {
                dispatch({
                    type: CalendarActionTypes.REFUSE_EVENT_FAILURE,
                });
                dispatch(newMsg(
                    "error",
                    "Failed To Refuse Event",
                ));
            },
        },
        },
    });
};


export const logout = () => (dispatch: any) => {
    dispatch({type: CalendarActionTypes.LOGOUT});
};