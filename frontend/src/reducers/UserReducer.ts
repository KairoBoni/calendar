import { Reducer } from "redux";

import { CalendarActionTypes } from "../actions/actionTypes";
import { UserReducer } from "../types";


const initialState: UserReducer = {
    user_emails: [],
    user: {
        email: ""
    },
    events: [
        {
            id:0,
            name: "",
            description: "",
            start: 0,
            end: 0
        },
    ]
};

const userReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case CalendarActionTypes.LOGIN_SUCCESS:
        return { ...state, user: action.payload};
    case CalendarActionTypes.GET_EVENTS_SUCCESS:
        return { ...state, events: action.payload};
    case CalendarActionTypes.GET_USERS_EMAIL_SUCCESS:
        return { ...state, user_emails: action.payload};
    case CalendarActionTypes.LOGOUT:
        return {state: initialState};
    default:
        return state;
  }
};

export default userReducer;
