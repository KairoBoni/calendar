import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers'

const store: any = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(axiosMiddleware(axios), thunk)),
);

export default store;
