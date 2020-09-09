import React from 'react';
import { View, Text, TextInput, Button, ImageBackground, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';

import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext';

import { AntDesign } from '@expo/vector-icons';
import { theme } from '../constants';
import Alerts from '../components/Alerts';

const LoginScreen = ({ navigation }) => {
  //context alert
  const alertContext = React.useContext(AlertContext);
  const { setAlert } = alertContext;

  //context auth
  const authContext = React.useContext(AuthContext);
  const { isAuthenticated, clearErrors, login, error, forgotPassword } = authContext;

  //state
  const [localUser, setlocalUser] = React.useState({
    email: 'Hola@gmail.com',
    password: 'password',
  });
  const { email, password } = localUser;

  const [ForgotPressed, setForgotPressed] = React.useState(false);
  const [hideParagraphText, setHideParagraphText] = React.useState('flex');
  const [mailSent, setMailSent] = React.useState(false);

  //state tracking input
  const changeEmail = (newEmail) => {
    setlocalUser({ ...localUser, email: newEmail });
  };
  const changePassword = (newPassword) => {
    setlocalUser({ ...localUser, password: newPassword });
  };

  //logic

  const goBack = () => {
    navigation.navigate('Landing');
  };

  const toggleForgotPassword = () => {
    setForgotPressed(!ForgotPressed);
  };

  //submit
  const onSubmit = (e) => {
    //e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
      clearErrors();
    } else {
      //console.log('loggin in');

      login({
        email,
        password,
      });
    }
  };

  //onSendMail
  const onClick = (e) => {
    if (mailSent) {
      setForgotPressed(false);
    } else {
      forgotPassword({ email });
    }
  };

  // useRef
  const inputForgot = React.useRef(null);

  // useEffect
  React.useEffect(() => {
    if (isAuthenticated) {
      // console.log(isAuthenticated);
      navigation.navigate('Balance');
    }

    if (error === 'Invalid Credentials') {
      setAlert('Invalid Credentials', 'danger');
      clearErrors();
    }

    if (error === 'Please include a valid email') {
      setHideParagraphText('none');
      setTimeout(function () {
        setHideParagraphText('flex');
      }, 5000);
      setAlert(error, 'danger');
      clearErrors();
    } else {
      error && (setMailSent(true), Keyboard.dismiss());
    }
    ForgotPressed && mailSent === false && inputForgot.current.focus();
    clearErrors();
  }, [error, isAuthenticated, ForgotPressed]);

  // jsx
  return (
    <View testID='login-component' style={styles.container}>
      <ImageBackground source={require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__4.jpg')} style={styles.image}>
        <View style={styles.card}>
          {ForgotPressed ? (
            <>
              <View style={styles.titlerow}>
                <TouchableOpacity onPress={toggleForgotPassword}>
                  <AntDesign name='left' size={24} color={theme.colors.dark} style={{ paddingLeft: 15 }} />
                </TouchableOpacity>
                <Text testID='test' style={styles.title}>
                  Forgot Password
                </Text>
              </View>
              <Alerts />

              <Text style={[styles.forgotpassword_paragraph_description, { display: hideParagraphText }]}>
                {mailSent ? (
                  <>
                    <Text>{`If there’s an account associated with \n`} </Text>
                    <Text style={{ fontWeight: theme.fonts.weight.bold, color: theme.colors.date, fontSize: 24 }}>{`${email}`}</Text>
                    <Text>
                      {'\n'}
                      {`,you’ll get a link in your inbox ${'\n'} to reset your password.${'\n'} If you don’t get the link,
        check your spam folder or re-enter your email address. `}
                    </Text>
                  </>
                ) : (
                  'Enter the email you use for your BudgetApp account'
                )}
              </Text>

              {mailSent === false && (
                <TextInput
                  ref={inputForgot}
                  testID='register-input-email'
                  style={styles.input}
                  placeholder='Email address'
                  onChangeText={changeEmail}
                  name='email'
                  value={email}
                  autoCapitalize='none'
                />
              )}
              <TouchableOpacity
                style={styles.button}
                testID='register-submit-button'
                placeholder='watwat'
                onPress={onClick}
                title='Register'
              >
                {mailSent ? <Text style={styles.registerbtntext}>LOGIN</Text> : <Text style={styles.registerbtntext}>SEND MAIL</Text>}
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.titlerow}>
                <TouchableOpacity onPress={goBack}>
                  <AntDesign name='left' size={24} color={theme.colors.dark} style={{ paddingLeft: 15 }} />
                </TouchableOpacity>
                <Text testID='test' style={styles.title}>
                  Account Login
                </Text>
              </View>
              <Alerts />

              <TextInput
                autoFocus
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

              <TouchableOpacity
                style={styles.button}
                testID='register-submit-button'
                placeholder='watwat'
                onPress={onSubmit}
                title='Register'
              >
                <Text style={styles.registerbtntext}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.forgotpasswordbutton}
                testID='forgot-password-button'
                placeholder='watwat'
                onPress={toggleForgotPassword}
                title='Register'
              >
                <Text style={styles.forgotpasswordbtntext}>Forgot Password?</Text>
              </TouchableOpacity>
            </>
          )}
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
    paddingTop: 15,
    maxHeight: 100,
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
  forgotpasswordbutton: {
    marginTop: 15,
    textAlign: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: theme.fonts.weight.bold,
    fontSize: 15,
    fontFamily: theme.fonts.family.main,
    color: theme.colors.dark,
    // backgroundColor: theme.colors.dark,
    paddingVertical: 2,
    //borderWidth: 2,
    //borderColor: theme.colors.gray,
    //borderStyle: 'solid',
    // borderRadius: 8,
    // overflow: 'hidden',
  },
  forgotpasswordbtntext: {
    color: theme.colors.dark,
    fontWeight: theme.fonts.weight.semibold,
    fontSize: 15,
  },
  forgotpassword_paragraph_description: {
    borderRadius: 8,
    borderWidth: 2,
    marginTop: 20,
    marginBottom: 0,
    marginHorizontal: 0,
    padding: 15,
    fontSize: 20,
    fontWeight: theme.fonts.weight.semibold,
    color: theme.colors.dark,
    overflow: 'hidden',
    textAlign: 'center',
  },
});
export default LoginScreen;
