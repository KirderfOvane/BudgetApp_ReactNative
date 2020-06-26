import React, { useReducer } from 'react';
import setAuthToken from '../../setAuthToken';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { AsyncStorage } from 'react-native';
import trackerApi from '../../src/api/tracker';
import hookActions from '../../src/actions/hookActions';

import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, TESTCONTEXT } from '../types';

const AuthState = (props) => {
  const initialState = {
    token: null,
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
    testofcontext: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const testContext = () => {
    dispatch({ type: TESTCONTEXT, payload: state.testofcontext });
  };

  // Load User
  const loadUser = async () => {
    // setAuthToken here first
    try {
      const response = await hookActions.getUser();
      console.log(response);
      dispatch({
        type: USER_LOADED,
        payload: response,
      });
    } catch (err) {
      console.log(err);
      //await AsyncStorage.removeItem('token');
      dispatch({ type: AUTH_ERROR });
    }

    // load token into global headers
    //const AsyncStoragetoken = await AsyncStorage.getItem('token');
    //console.log(AsyncStoragetoken);
    // if (AsyncStoragetoken) {
    //   setAuthToken(AsyncStoragetoken);
    //}
    //console.log(AsyncStoragetoken);
    //console.log(state.token);
    /*     try {
      const res = await trackerApi.get('/api/auth');
      //console.log(res.data);
      //console.log('watwatwat');
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      //await AsyncStorage.removeItem('token');
      dispatch({ type: AUTH_ERROR });
    } */
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
      const res = await trackerApi.post('/api/users', formData, config); //endpoint/url
      await AsyncStorage.setItem('token', res.data.token);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      console.log(err);
      dispatch({
        type: REGISTER_FAIL,
        payload: err.res.data.msg,
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

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Logout
  const logout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        testofcontext: state.testofcontext,
        logout,
        register,
        login,
        loadUser,
        testContext,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
