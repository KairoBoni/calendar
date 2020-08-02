import { Reducer } from "redux";

/**
 * State types
 */

export interface AppReducer {
    page: string
}

export interface CombinedReducers {
    AppReducer: Reducer<AppReducer>,
  }

  
  export interface CalendarReducer {
    AppState: AppReducer,
  }
  