import { setAlert } from './alertActions';
import authService from '../../services/authService';
import setAuthToken from '../../utils/setAuthToken';

// Load User - Get user data
export const loadUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }

    const res = await authService.getMe(token);
    
    dispatch({
      type: 'USER_LOADED',
      payload: res
    });
  } catch (err) {
    dispatch({
      type: 'AUTH_ERROR'
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await authService.register(formData);

    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: res
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response?.data?.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: 'REGISTER_FAIL'
    });
  }
};

// Login User
export const login = (username, password) => async (dispatch) => {
  try {
    const res = await authService.login({ username, password });

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response?.data?.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: 'LOGIN_FAIL'
    });
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  authService.logout();
  dispatch({ type: 'LOGOUT' });
};