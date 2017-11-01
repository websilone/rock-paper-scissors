import { createStore, compose } from 'redux';
import rootReducer from './rootReducer';

const INITIAL_STATE = {};

const store = createStore(rootReducer, INITIAL_STATE, compose());

export default store;
