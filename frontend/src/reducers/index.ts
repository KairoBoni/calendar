import { combineReducers } from 'redux';
import { CombinedReducers } from '../types'
import AppReducer from '../reducers/AppReducer'
import UserReducer from '../reducers/UserReducer'


const Calendar: CombinedReducers = {
    AppReducer: AppReducer,
    UserReducer: UserReducer
  };
  
export default combineReducers(Calendar);