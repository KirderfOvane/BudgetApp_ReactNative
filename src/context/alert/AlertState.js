import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { setAlertAction } from '../../actions/setAlertAction';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert = async (message) => {
    const response = await setAlertAction(message);
    console.log(response);
    const { msg, type, id } = response;
    dispatch({ TYPE: SET_ALERT, payload: { msg, type, id } });
    // setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: response.id }), timeout);
  };
  return <AlertContext.Provider value={{ alerts: state, setAlert }}>{props.children}</AlertContext.Provider>;
};
export default AlertState;
