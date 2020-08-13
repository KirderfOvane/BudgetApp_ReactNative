import React from 'react';
import { View, Text, TextInput, Button, ImageBackground, AsyncStorage, StyleSheet, TouchableOpacity } from 'react-native';
import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext';
import hookActions from '../actions/hookActions';
import Alerts from '../components/Alerts';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '../constants';

const RegisterScreen = ({ navigation }) => {
  const authContext = React.useContext(AuthContext);
  const { loadUser, user, isAuthenticated, clearErrors, register, error } = authContext;

  const alertContext = React.useContext(AlertContext);
  const { setAlert } = alertContext;

  //state
  const [localUser, setlocalUser] = React.useState({
    name: 'reggy',
    email: 'Holabandola@gmail.com',
    password: 'password',
    password2: 'password',
  });
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
  //logic
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
      //  setlocalUser({ name: '', email: '', password: '', password2: '' });
    }
  };

  const goBack = () => {
    navigation.navigate('Landing');
  };
  //console.log(error);
  // useEffect
  React.useEffect(() => {
    if (isAuthenticated) {
      // console.log('time to navigate');
      navigation.navigate('Balance');
    }

    if (error === 'user already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    if (error && error.length > 1) {
      error.map((err) => setAlert(err.msg, 'danger'));
      clearErrors();
    } else {
      error && setAlert(error[0].msg, 'danger');
      clearErrors();
    }
  }, [error, isAuthenticated]);

  return (
    <View testID='register-component' style={styles.container}>
      <ImageBackground source={require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__4.jpg')} style={styles.image}>
        <View style={styles.card}>
          <View style={styles.titlerow}>
            <TouchableOpacity onPress={goBack}>
              <AntDesign name='left' size={24} color={theme.colors.dark} style={{ paddingLeft: 15 }} />
            </TouchableOpacity>
            <Text testID='test' style={styles.title}>
              Account Register
            </Text>
          </View>
          <Alerts />
          <TextInput
            autoFocus
            style={styles.input}
            placeholder='Name'
            testID='register-input-name'
            onChangeText={changeName}
            name='name'
            value={name}
          />
          <TextInput
            testID='register-input-email'
            style={styles.input}
            placeholder='Email address'
            testID='register-input-name'
            onChangeText={changeEmail}
            name='email'
            value={email}
            autoCapitalize='none'
          />
          <TextInput
            testID='register-input-password'
            style={styles.input}
            placeholder='Password'
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
            style={styles.input}
            placeholder='Confirm Password'
            onChangeText={changePassword2}
            name='Password2'
            value={password2}
            label='Password2'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button} testID='register-submit-button' placeholder='watwat' onPress={onSubmit} title='Register'>
            <Text style={styles.registerbtntext}>Register</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 414,
    height: 725,
    backgroundColor: 'gray',
  },
  containerflex: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  card: {
    flex: 1,
    backgroundColor: theme.colors.light,
    marginHorizontal: 25,
    marginTop: 50,
    marginBottom: 320,
    shadowOffset: { width: 0, height: 10 },
    shadowColor: '#2b2b2b',
    shadowOpacity: 1.0,
    borderWidth: 1,
    borderColor: theme.colors.black,
    padding: 20,
    shadowRadius: 5,
    borderRadius: 5,
  },
  titlerow: {
    flexDirection: 'row',
    //borderWidth: 1,
    // borderColor: 'green',
    //  alignContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  chevron: {
    paddingRight: 15,
  },
  title: {
    paddingLeft: 15,
    fontSize: theme.sizes.h2,
    fontWeight: theme.fonts.weight.semibold,
    textAlign: 'center',
  },
  input: {
    flex: 1,
    textAlign: 'left',
    paddingLeft: 15,
    paddingTop: 20,
    margin: 0,
    fontSize: 22,
    color: theme.colors.dark,
    //borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: theme.colors.gray,
  },

  button: {
    marginTop: 15,
    textAlign: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: theme.fonts.weight.bold,
    fontSize: 25,
    fontFamily: theme.fonts.family.main,
    color: theme.colors.light,
    backgroundColor: theme.colors.dark,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: theme.colors.gray,
    borderStyle: 'solid',
    borderRadius: 8,
    overflow: 'hidden',
  },
  registerbtntext: {
    color: theme.colors.light,
    fontWeight: theme.fonts.weight.semibold,
    fontSize: 20,
  },
});

export default RegisterScreen;
