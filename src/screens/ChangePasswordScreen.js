import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { theme } from '../constants';
import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext';
import Alerts from '../components/Alerts';

const ChangePasswordScreen = () => {
  //context
  const alertContext = React.useContext(AlertContext);
  const { setAlert } = alertContext;
  const authContext = React.useContext(AuthContext);
  const { user, updatePassword, error, clearErrors } = authContext;

  //state
  const [localPassword, setLocalPassword] = React.useState({ currentPassword: '', password: '', password2: '' });

  const { currentPassword, password, password2 } = localPassword;
  //logic
  const changePassword = () => {
    if (currentPassword === '' || password === '' || password2 === '') {
      setAlert('Please fill in all fields', 'danger');
      return;
    }
    if (password === password2) {
      Keyboard.dismiss();
      updatePassword({ currentPassword, password });
    } else {
      setAlert('Passwords do not match', 'danger');
    }
  };

  //useEffect
  React.useEffect(() => {
    if (error === 'Password Updated') {
      setAlert(error, 'success');
      clearErrors();
    }
    if (error === 'Password is incorrect') {
      setAlert(error, 'danger');
      clearErrors();
    }
    if (error === 'Please enter a password with 6 or more characters') {
      setAlert(error, 'danger');
      clearErrors();
    }
    error !== null && console.log(error);
  }, [error]);
  //console.log(localPassword);
  //jsx
  return (
    <View>
      <Alerts />
      <View style={styles.row}>
        {/* <Text style={styles.label}>Current Password </Text> */}

        <TextInput
          //  autoCompleteType={off}
          placeholder={'Current Password'}
          autoFocus
          secureTextEntry
          autoCorrect={false}
          minLength={2}
          style={styles.input}
          onChangeText={(text) => setLocalPassword({ ...localPassword, currentPassword: text })}
        ></TextInput>
      </View>
      <View style={styles.row}>
        {/*   <Text style={styles.label}>New Password </Text> */}

        <TextInput
          //  autoCompleteType={off}
          placeholder={'New Password'}
          secureTextEntry
          autoCorrect={false}
          minLength={2}
          style={styles.input}
          onChangeText={(text) => setLocalPassword({ ...localPassword, password: text })}
        ></TextInput>
      </View>
      <View style={styles.row}>
        {/*    <Text style={styles.label}>Confirm New Password </Text> */}

        <TextInput
          //  autoCompleteType={off}
          placeholder={'Confirm New Password'}
          secureTextEntry
          autoCorrect={false}
          minLength={2}
          style={styles.input}
          onChangeText={(text) => setLocalPassword({ ...localPassword, password2: text })}
        ></TextInput>
      </View>
      <TouchableOpacity onPress={changePassword}>
        <Text style={styles.button}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
};

//styles
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 15,
    marginVertical: 20,
    marginLeft: 10,
    marginRight: 20,
  },
  label: {
    flex: 1,
    fontSize: 24,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.gray,
    paddingLeft: 15,
  },
  input: {
    flex: 2,
    justifyContent: 'flex-start',
    textAlign: 'left',
    paddingLeft: 25,
    paddingVertical: 10,
    margin: 0,
    fontSize: 20,
    color: theme.colors.dark,
    borderBottomWidth: 3,
    borderColor: theme.colors.gray,
  },
  chevron: {
    paddingRight: 10,
  },
  button: {
    marginHorizontal: 15,
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
});
export default ChangePasswordScreen;
