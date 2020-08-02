import { combineReducers } from 'redux';
import { CombinedReducers } from '../types'
import AppReducer from '../reducers/AppReducer'

const Calendar: CombinedReducers = {
    AppReducer: AppReducer
  };
  
export default combineReducers(Calendar);