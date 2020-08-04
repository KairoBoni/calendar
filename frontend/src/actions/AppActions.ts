import { CalendarActionTypes } from "./actionTypes";

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