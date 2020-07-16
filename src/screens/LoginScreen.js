import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext';

import Alerts from '../components/Alerts';

const LoginScreen = () => {
  //context alert
  const alertContext = React.useContext(AlertContext);
  const { setAlert } = alertContext;

  //context auth
  const authContext = React.useContext(AuthContext);
  const { isAuthenticated, clearErrors, login, error } = authContext;

  //state
  const [localUser, setlocalUser] = React.useState({
    email: 'Hola@bandola.com',
    password: 'password',
  });
  const { email, password } = localUser;

  //state tracking input
  const changeEmail = (newEmail) => {
    setlocalUser({ ...localUser, email: newEmail });
  };
  const changePassword = (newPassword) => {
    setlocalUser({ ...localUser, password: newPassword });
  };

  //submit
  const onSubmit = (e) => {
    //e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      console.log('loggin in');

      login({
        email,
        password,
      });
    }
  };

  // jsx
  return (
    <View testID='login-component'>
      <Alerts />
      <Text testID='test'>LoginScreen</Text>

      <TextInput testID='login-input-email' onChangeText={changeEmail} name='email' value={email} />
      <TextInput
        testID='login-input-password'
        onChangeText={changePassword}
        name='password'
        value={password}
        label='Password'
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={true}
      />

      <Button testID='login-submit-button' placeholder='watwat' onPress={onSubmit} title='Login' />
    </View>
  );
};

export default LoginScreen;
