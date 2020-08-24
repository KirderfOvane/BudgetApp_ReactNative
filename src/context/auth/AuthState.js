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
  UPDATE_DETAILS_FAIL,
  UPDATE_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_FAIL,
  FORGOT_SUCCESS,
} from '../types';

const AuthState = (props) => {
  const initialState = {
    token: null,
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null,
    successmessage: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

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
      console.log('navigating to LandingScreen');
      reroute && navigate('Landing');
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'My_User-Agent': 'native',
      },
    };
    try {
      // const responsedata = await registerAction.sendRegister(formData); OLD OBSOLETE for testing TDD
      const res = await trackerApi.post('/api/users', formData, config); //endpoint/url

      await AsyncStorage.setItem('token', res.data.token);
      console.log(res);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.errors,
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
      //  console.log(`login http calls says: ${err}`);
      console.log(err.response.data.msg);
      console.log(err.response.data);
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.errors[0].msg,
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

  //Forgot Password
  const forgotPassword = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await trackerApi.post('/api/auth/forgotpassword', formData, config); //endpoint/url
      console.log(res);
      dispatch({
        type: FORGOT_SUCCESS,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err.response.data.errors[0].msg);
      // console.log(err.response.data.errors[0].msg);
      dispatch({
        type: FORGOT_FAIL,
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

        successmessage: state.successmessage,
        error: state.error,
        logout,
        register,
        login,
        loadUser,
        forgotPassword,
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
