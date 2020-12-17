import { UPLOAD_CSV, UPDATE_CSV, SUBMIT_CSV, CLEAR_CSV, REMOVE_CSV, FILE_ERROR, CLEAR_FILE_ERROR } from '../types';

export default (state, action) => {
  switch (action.type) {
    case UPDATE_CSV:
      return {
        ...state,
        csvpresets: state.csvpresets.map((preset) => (preset.id === action.payload.id ? action.payload : preset)),
      };
    case REMOVE_CSV:
      return {
        ...state,
        csvpresets: state.csvpresets.filter((preset) => preset.id === action.payload.id),
      };
    case CLEAR_CSV:
      return {
        ...state,
        csvpresets: null,
      };
    case SUBMIT_CSV:
      return {
        ...state,
        doSubmitCsv: action.payload,
      };
    case UPLOAD_CSV:
      return {
        ...state,
        csvpresets: action.payload,
      };
    case FILE_ERROR:
      return {
        ...state,
        fileerror: action.payload,
      };
    case CLEAR_FILE_ERROR:
      return {
        ...state,
        fileerror: null,
      };
    default:
      return state;
  }
};
