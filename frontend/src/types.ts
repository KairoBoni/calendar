import { Reducer } from "redux";

export interface Login{
  email?: string
  password?: string
}

export interface User{
  first_name?: string
  last_name?: string
  email: string
  password?: string
}

export interface Event{
  id: number
  name: string
  user_email?: string
  description: string
  start: number
  end: number
  confirmed?: boolean
}

/**
 * State types
 */

export interface AppReducer {
    page: string
    openSnackBar: boolean
    msgSnackBar?: string
    severitySnackBar?: "success" | "error" | "info" | "warning"
}

export interface UserReducer {
  user: User
  events: Event[]
}

export interface CombinedReducers {
    AppReducer: Reducer<AppReducer>,
    UserReducer: Reducer<UserReducer>,

  }

  
  export interface CalendarReducer {
    AppState: AppReducer,
    UserState: UserReducer
  }
  