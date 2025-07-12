import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import courseReducer from './courseReducer'; // Now this import will work

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  course: courseReducer
});