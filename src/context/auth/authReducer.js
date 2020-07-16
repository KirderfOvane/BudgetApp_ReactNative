import { REGISTER_SUCCESS, USER_LOADED, REGISTER_FAIL, AUTH_ERROR, LOGIN_SUCCESS, LOGOUT, TESTCONTEXT } from '../types';

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        token: action.payload.token,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case TESTCONTEXT:
      return {
        ...state,
        testofcontext: !action.payload,
      };

    default:
      return state;
  }
};
