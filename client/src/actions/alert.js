import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './type';

export const setAlert = (msg, alertType, time = 2000) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: {
      msg,
      alertType,
      id
    }
  });

  // Set a time to remove the alert information automatically
  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id
    });
  }, time);
};
