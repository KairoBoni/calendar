import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers'

const client = axios.create({ //all axios can be used, shown in axios documentation
  baseURL:'http://localhost:5002/',
  responseType: 'json'
});

const store: any = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(axiosMiddleware(client), thunk)),
);

export default store;
