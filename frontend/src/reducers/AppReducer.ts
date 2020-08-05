import { Reducer } from "redux";

import { CalendarActionTypes } from "../actions/actionTypes";
import { AppReducer } from "../types";


const initialState: AppReducer = {
    page: "LOGIN_PAGE",
    openSnackBar: false,
};


const appReducer: Reducer = (state = initialState, action) => {
  console.log(action)

  switch (action.type) {
    case CalendarActionTypes.LOGIN_PAGE:
     return { ...state, page: "LOGIN_PAGE"};
    case CalendarActionTypes.SIGNUP_PAGE:
      return { ...state, page: "SIGNUP_PAGE"};
    case CalendarActionTypes.EVENTS_PAGE:
      return { ...state, page: "EVENTS_PAGE"};
    case CalendarActionTypes.NEW_MSG:
      console.log(action.payload.msg)
      return { ...state, openSnackBar: true, msgSnackBar: action.payload.msg, severitySnackBar: action.payload.severity};
    case CalendarActionTypes.CLOSE_SNACKBAR:
      return { ...state, openSnackBar: false};
    default:
      return state;
  }
};

export default appReducer;
