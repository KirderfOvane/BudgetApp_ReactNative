import { SET_GUIDE, TOGGLE_EXIT } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default (state, action) => {
  switch (action.type) {
    case TOGGLE_EXIT:
      return {
        ...state,
        exitedguide: action.payload,
      };
    case SET_GUIDE:
      return {
        ...state,
        guide: action.payload,
      };
    default:
      return state;
  }
};
