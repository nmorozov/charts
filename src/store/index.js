import { createStore, combineReducers } from 'redux';
import ChartReducer from './reducers/ChartReducer';

const store = createStore(combineReducers({ ChartReducer }));

export default store;
