import { Reducer } from "redux";

import { CalendarActionTypes } from "../actions/actionTypes";
import { AppReducer } from "../types";


const initialState: AppReducer = {
    page: "EVENTS_PAGE",
};


const appReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case CalendarActionTypes.LOGIN_PAGE:
     return { ...state, page: "LOGIN_PAGE"};
    case CalendarActionTypes.SIGNUP_PAGE:
      return { ...state, page: "SIGNUP_PAGE"};
    case CalendarActionTypes.EVENTS_PAGE:
      return { ...state, page: "EVENTS_PAGE"};
    default:
      return state;
  }
};

export default appReducer;
