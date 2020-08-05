import { CalendarActionTypes } from "./actionTypes";
import { User, Login, Event }  from "../types"


export const signupPage = () => (dispatch: any) => {
//   dispatch({type: FeedManagerActionTypes.FEED_MANAGER_START_LOADING});
    dispatch({type: CalendarActionTypes.SIGNUP_PAGE});
};


export const loginPage = () => (dispatch: any) => {
    //   dispatch({type: FeedManagerActionTypes.FEED_MANAGER_START_LOADING});
    dispatch({type: CalendarActionTypes.LOGIN_PAGE});
};
    
export const eventsPage = () => (dispatch: any) => {
    //   dispatch({type: FeedManagerActionTypes.FEED_MANAGER_START_LOADING});
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
// dispatch({type: FeedManagerActionTypes.FEED_MANAGER_START_LOADING});
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
        //   onComplete: () => dispatch({type: FeedManagerActionTypes.FEED_MANAGER_STOP_LOADING}),
        },
        },
    });
};

export const login = (user: Login) => (dispatch: any) => {
// dispatch({type: FeedManagerActionTypes.FEED_MANAGER_START_LOADING});
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
                dispatch(newMsg(
                    "success",
                    "Logged",
                ));
                dispatch(setEventPage());

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
        //   onComplete: () => dispatch({type: FeedManagerActionTypes.FEED_MANAGER_STOP_LOADING}),
        },
        },
    });
};

export const getEvents = (email: string) => (dispatch: any) => {
    // dispatch({type: FeedManagerActionTypes.FEED_MANAGER_START_LOADING});
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
            //   onComplete: () => dispatch({type: FeedManagerActionTypes.FEED_MANAGER_STOP_LOADING}),
            },
            },
        });
    };

    export const createEvent = (event: Event) => (dispatch: any) => {
        // dispatch({type: FeedManagerActionTypes.FEED_MANAGER_START_LOADING});
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
                //   onComplete: () => dispatch({type: FeedManagerActionTypes.FEED_MANAGER_STOP_LOADING}),
                },
                },
            });
        };