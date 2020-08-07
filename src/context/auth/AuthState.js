import React, { useReducer } from 'react';
import setAuthToken from '../../../setAuthToken';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { AsyncStorage } from 'react-native';
import trackerApi from '../../api/tracker';
import hookActions from '../../actions/hookActions';
import registerAction from '../../actions/registerAction';
import { navigate } from '../../navigationRef';
import axios from 'axios';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  TESTCONTEXT,
  UPDATE_DETAILS_FAIL,
  UPDATE_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
} from '../types';

const AuthState = (props) => {
  const initialState = {
    token: null,
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null,
    testofcontext: false,
    successmessage: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const testContext = () => {
    dispatch({ type: TESTCONTEXT, payload: state.testofcontext });
  };

  // Load User
  const loadUser = async (reroute = true) => {
    // fetch token from local storage
    const token = await AsyncStorage.getItem('token');
    //console.warn(token);
    token && console.log('loadUser: valid token found in loadUser/AsyncStorage');
    // setAuthToken header token
    await setAuthToken(token);
    if (token) {
      console.log('navigate to YearBalanceScreen');
      reroute && navigate('Balance');
      try {
        const response = await hookActions.getUser();
        // console.log(response);
        dispatch({
          type: USER_LOADED,
          payload: response,
        });
      } catch (err) {
        console.log(err);
        await AsyncStorage.removeItem('token');
        console.log('deleted token from asyncstorage');
        dispatch({ type: AUTH_ERROR });
      }
    } else {
      console.log('no valid token found');
    }
  };

  // Register User
  const register = async (formData) => {
    try {
      const responsedata = await registerAction.sendRegister(formData);

      // await AsyncStorage.setItem('token', res.data.token);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: responsedata,
      });
      loadUser();
    } catch (err) {
      //console.log(err);
      dispatch({
        type: REGISTER_FAIL,
        payload: err.responsedata.msg,
      });
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'My_User-Agent': 'native',
      },
    };

    try {
      const res = await trackerApi.post('/api/auth', formData, config); //endpoint/url
      //console.log(res.data.token);
      await AsyncStorage.setItem('token', res.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      console.log(`login http calls says: ${err}`);
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Logout
  const logout = async () => {
    await AsyncStorage.removeItem('token');
    console.log('navigate to LandingScreen');
    navigate('Landing');
    dispatch({ type: LOGOUT });
  };

  //update userdetails
  const updateDetails = async (formData) => {
    // console.log(formData);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': axios.defaults.headers.common['x-auth-token'],
      },
    };
    try {
      const res = await trackerApi.put('/api/auth/updatedetails', formData, config); //endpoint/url
      console.log(res.data.msg);

      dispatch({
        type: UPDATE_DETAILS_SUCCESS,
        payload: res.data.msg,
      });
      //console.log(res);
      loadUser(false);
    } catch (err) {
      console.log(err.response.data.errors[0].msg);
      dispatch({
        type: UPDATE_DETAILS_FAIL,
        payload: err.response.data.errors[0].msg,
      });
    }
  };

  //update password
  const updatePassword = async (formData) => {
    //console.log(formData);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': axios.defaults.headers.common['x-auth-token'],
      },
    };
    try {
      const res = await trackerApi.put('/api/auth/updatepassword', formData, config);
      // console.log(res.data.msg);
      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: res.data.msg,
      });
    } catch (err) {
      //console.log(err.response.data.errors.map((error) => error.msg));
      // console.log(err.response.data.msg);
      // console.log('err');
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: err.response.data.errors[0].msg,
      });
    }
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        testofcontext: state.testofcontext,
        successmessage: state.successmessage,
        error: state.error,
        logout,
        register,
        login,
        loadUser,
        testContext,
        updateDetails,
        clearErrors,
        updatePassword,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
