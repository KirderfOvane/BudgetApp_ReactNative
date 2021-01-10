import React, { useReducer } from 'react';
import GuideContext from './guideContext';
import guideReducer from './guideReducer';
import { SET_GUIDE, TOGGLE_EXIT } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GuideState = (props) => {
  const initialState = {
    guide: null,
    exitedguide: false,
  };

  const [state, dispatch] = useReducer(guideReducer, initialState);
  // load
  const loadGuideExitStatus = async () => {
    try {
      const guideStatus = await AsyncStorage.getItem('exitedguide');
      if (guideStatus) {
        setUserExited(guideStatus);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Set guide-step
  const setGuide = (string) => dispatch({ type: SET_GUIDE, payload: string });

  // Set user exitedguide
  const setUserExited = async (boolean) => {
    try {
      await AsyncStorage.setItem('exitedguide', JSON.stringify(boolean));
    } catch (error) {
      console.log(error);
    }

    dispatch({ type: TOGGLE_EXIT, payload: boolean });
  };
  return (
    <GuideContext.Provider
      value={{
        guide: state.guide,
        exitedguide: state.exitedguide,
        setGuide,
        setUserExited,
        loadGuideExitStatus,
      }}
    >
      {props.children}
    </GuideContext.Provider>
  );
};

export default GuideState;
