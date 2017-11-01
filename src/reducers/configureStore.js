import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';

const INITIAL_STATE = {};

const middleware = process.env.NODE_ENV === 'production'
  ? [thunk]
  : [thunk, createLogger()];

const store = createStore(rootReducer, INITIAL_STATE, applyMiddleware(...middleware));

export default store;
