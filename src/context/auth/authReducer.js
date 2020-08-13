import {
  REGISTER_SUCCESS,
  USER_LOADED,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  UPDATE_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_DETAILS_FAIL,
  LOGIN_FAIL,
  FORGOT_FAIL,
  FORGOT_SUCCESS,
} from '../types';

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

    case UPDATE_DETAILS_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
    case UPDATE_PASSWORD_FAIL:
    case UPDATE_DETAILS_FAIL:
    case LOGIN_FAIL:
    case FORGOT_FAIL:
    case FORGOT_SUCCESS:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
