import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
  CLEAR_PROFILE
} from './type';
import setAuthToken from '../utils/setAuthToken';

// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.getItem('token')) {
    // make sure that request header will contain token
    setAuthToken(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register user
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login user
export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({
    type: LOG_OUT
  });
  dispatch({
    type: CLEAR_PROFILE
  });
};

// Forgot Password
export const forgotPassword = (email, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ email });
  try {
    const res = await axios.post('/api/auth/forgotpassword', body, config);
    dispatch(
      setAlert(
        `Password reset instruction has been sent to "${email}" if it exists in our system`,
        'success'
      )
    );
    history.push('/login');
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
  }
};

// Reset Password
export const resetPassword = (
  resetPasswordLink,
  password,
  history
) => async dispatch => {
  dispatch(logout());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ resetPasswordLink, newPassword: password });
  try {
    const res = await axios.post('/api/auth/resetpassword', body, config);
    dispatch(setAlert(`Please login with your new password`, 'success'));
    history.push('/login');
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
  }
};
