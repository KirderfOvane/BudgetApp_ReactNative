import React, { useReducer } from 'react';
import setAuthToken from '../../../setAuthToken';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { AsyncStorage } from 'react-native';
import trackerApi from '../../api/tracker';
import hookActions from '../../actions/hookActions';
import registerAction from '../../actions/registerAction';
import { navigate } from '../../navigationRef';

import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, TESTCONTEXT } from '../types';

const AuthState = (props) => {
  const initialState = {
    token: null,
    isAuthenticated: false,
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
    // fetch token from local storage
    const token = await AsyncStorage.getItem('token');
    //console.warn(token);
    token && console.log('loadUser: valid token found in loadUser/AsyncStorage');
    // setAuthToken header token
    await setAuthToken(token);
    if (token) {
      console.log('navigate to YearBalanceScreen');
      navigate('Balance');
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
      console.log(res.data.token);
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
