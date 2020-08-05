import { Reducer } from "redux";

import { CalendarActionTypes } from "../actions/actionTypes";
import { UserReducer } from "../types";


const initialState: UserReducer = {
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
        console.log(action)
        return { ...state, events: action.payload};
    default:
        return state;
  }
};

export default userReducer;
