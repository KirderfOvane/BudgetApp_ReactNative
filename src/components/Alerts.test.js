import React from 'react';
import Alerts from './Alerts';
import RegisterScreen from '../screens/RegisterScreen';
import { render, fireEvent } from 'react-native-testing-library';
import AlertState from '../context/alert/AlertState';
import AuthState from '../context/auth/AuthState';
import { setAlertAction } from '../actions/setAlertAction';
import { Text, View } from 'react-native';

test('Do not render alerts when alerts is in initial state', () => {
  const { getByTestId } = render(
    <AlertState>
      <Alerts />
    </AlertState>
  );

  const textelement = getByTestId('alert');
  expect(typeof textelement.props.children).toBe('string');
});

test('renders alerts when alerts exist in context', async () => {
  //setup
  const { getByTestId } = render(
    <AlertState>
      <AuthState>
        <RegisterScreen />
      </AuthState>
    </AlertState>
  );
  //create user input
  fireEvent.changeText(getByTestId('register-input-name'), '');
  fireEvent.changeText(getByTestId('register-input-email'), 'lbox.com');
  fireEvent.changeText(getByTestId('register-input-password'), 'f44444444');
  fireEvent.changeText(getByTestId('register-input-confirm'), 'password');
  //submit user
  const buttonelement = getByTestId('register-submit-button');
  fireEvent(buttonelement, 'press');

  const { findByTestId, debug } = render(
    <AlertState>
      <Alerts />
    </AlertState>
  );
  //const res = await setAlertAction(alert);
  //await setAlert(alert);
  //console.warn(res);
  const textelement = await findByTestId('alert');
  console.warn(textelement.props.children);

  expect(typeof textelement).toBe('object');
});
