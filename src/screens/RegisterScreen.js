import React from 'react';
import { AsyncStorage } from 'react-native';
import { View, Text, TextInput, Button } from 'react-native';
import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext';
import hookActions from '../actions/hookActions';
import Alerts from '../components/Alerts';

const RegisterScreen = ({ navigation }) => {
  const authContext = React.useContext(AuthContext);
  const { loadUser, user, isAuthenticated, clearErrors, register, error } = authContext;

  const alertContext = React.useContext(AlertContext);
  const { setAlert } = alertContext;

  //state
  const [localUser, setlocalUser] = React.useState({ name: '', email: '', password: '', password2: '' });
  const { name, email, password, password2 } = localUser;

  //state set functions
  const changeName = (newName) => {
    setlocalUser({ ...localUser, name: newName });
  };
  const changeEmail = (newEmail) => {
    setlocalUser({ ...localUser, email: newEmail });
  };
  const changePassword = (newPassword) => {
    setlocalUser({ ...localUser, password: newPassword });
  };
  const changePassword2 = (newPassword) => {
    setlocalUser({ ...localUser, password2: newPassword });
  };

  const onSubmit = (e) => {
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      //e.preventDefault();

      register({
        name,
        email,
        password,
      });

      // reset fields
      setlocalUser({ name: '', email: '', password: '', password2: '' });
    }
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      // console.log('time to navigate');
      navigation.navigate('Balance');
    }

    if (error === 'user already exists') {
      //console.log(authContext.error);
      console.log('error');
    }
  }, [error, isAuthenticated]);

  return (
    <View testID='register-component'>
      <Alerts />
      <Text testID='test'>RegisterScreen</Text>
      <TextInput testID='register-input-name' onChangeText={changeName} name='name' value={name} />
      <TextInput testID='register-input-email' onChangeText={changeEmail} name='email' value={email} />
      <TextInput
        testID='register-input-password'
        onChangeText={changePassword}
        name='password'
        value={password}
        label='Password'
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={true}
      />
      <TextInput
        testID='register-input-confirm'
        onChangeText={changePassword2}
        name='Password2'
        value={password2}
        label='Password2'
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={true}
      />
      <Button testID='register-submit-button' placeholder='watwat' onPress={onSubmit} title='Register' />
    </View>
  );
};

export default RegisterScreen;

/*   const authContext = React.useContext(AuthContext);
  const { loadUser, user, isAuthenticated, clearErrors, register, error } = authContext;

  const alertContext = React.useContext(AlertContext);
  const { setAlert } = alertContext;

  //state
  const [localUser, setlocalUser] = React.useState({ name: '', email: '', password: '', password2: '' });
  const { name, email, password, password2 } = localUser;

  //state set functions
  const changeName = (newName) => {
    setlocalUser({ ...localUser, name: newName });
  };
  const changeEmail = (newEmail) => {
    setlocalUser({ ...localUser, email: newEmail });
  };
  const changePassword = (newPassword) => {
    setlocalUser({ ...localUser, password: newPassword });
  };
  const changePassword2 = (newPassword) => {
    setlocalUser({ ...localUser, password2: newPassword });
  };

  const onSubmit = (e) => {
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      //e.preventDefault();

      register({
        name,
        email,
        password,
      });

      // reset fields
      setlocalUser({ name: '', email: '', password: '', password2: '' });
    }
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      console.log('time to navigate');
      navigation.replace('UserScreen');
    }

    if (error === 'user already exists') {
      //console.log(authContext.error);
      console.log('error');
    }
  }, [error, isAuthenticated]);

  return (
    <View testID='register-component'>
      <Alerts />
      <Text testID='test'>
        RegisterScreen 
        
      </Text>
      <TextInput testID='register-input-name' onChangeText={changeName} name='name' value={name} />
      <TextInput testID='register-input-email' onChangeText={changeEmail} name='email' value={email} />
      <TextInput
        testID='register-input-password'
        onChangeText={changePassword}
        name='password'
        value={password}
        label='Password'
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={true}
      />
      <TextInput
        testID='register-input-confirm'
        onChangeText={changePassword2}
        name='Password2'
        value={password2}
        label='Password2'
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={true}
      />
      <Button testID='register-submit-button' placeholder='watwat' onPress={onSubmit} title='Register' />
    </View>
  );
}; 

export default RegisterScreen;*/
