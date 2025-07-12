import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';  // Named import instead of default import
import rootReducer from './reducers';

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk),  // Directly use the named import
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

export default store;