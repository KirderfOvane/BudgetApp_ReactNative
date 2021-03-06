import React, { useReducer } from 'react';
import axios from 'axios';
import trackerApi from '../../api/tracker';
import CsvContext from './csvContext';
import csvReducer from './csvReducer';

import { UPLOAD_CSV, UPDATE_CSV, SUBMIT_CSV, CLEAR_CSV, REMOVE_CSV, FILE_ERROR, CLEAR_FILE_ERROR } from '../types';

const CsvState = (props) => {
  const initialState = {
    csvpresets: null, // used to store values from csv-file in stagingarea
    doSubmitCsv: '',
    fileerror: null,
  };

  const [state, dispatch] = useReducer(csvReducer, initialState);

  // Upload CSV
  const uploadCSV = async (formData) => {
    // console.log('upload ran');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-auth-token': axios.defaults.headers.common['x-auth-token'],
      },
    };
    try {
      const res = await trackerApi.post('/api/userpreset/upload', formData, config);

      dispatch({ type: UPLOAD_CSV, payload: res.data });
    } catch (err) {
      // console.log('upload return shit', err.response.data);
      dispatch({
        type: FILE_ERROR,
        payload: err.response.data,
      });
    }
  };
  //Update CSV
  const updateCsvPresets = (preset) => {
    dispatch({ type: UPDATE_CSV, payload: preset });
  };

  //Remove CSV
  const removeCSV = (preset) => {
    dispatch({ type: REMOVE_CSV, payload: preset });
  };

  // Clear CSV
  const clearCsv = () => {
    dispatch({ type: CLEAR_CSV });
  };

  // submitCsv triggers addPreset on valid items
  const submitCsvItems = (string) => {
    dispatch({ type: SUBMIT_CSV, payload: string });
  };

  // Clear Contact Error
  const clearFileError = () => {
    dispatch({ type: CLEAR_FILE_ERROR });
  };

  return (
    <CsvContext.Provider
      value={{
        csvpresets: state.csvpresets,
        doSubmitCsv: state.doSubmitCsv,
        fileerror: state.fileerror,
        uploadCSV,
        submitCsvItems,
        updateCsvPresets,
        clearCsv,
        removeCSV,
        clearFileError,
      }}
    >
      {props.children}
    </CsvContext.Provider>
  );
};

export default CsvState;
