import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const RegisterScreen = () => {
  const [user, setUser] = React.useState({ name: "", email: "", password: "", password2: "" });
  const { name, email, password, password2 } = user;

  const changeName = (newName) => {
    setUser({ ...user, name: newName });
  };
  const changeEmail = (newEmail) => {
    setUser({ ...user, email: newEmail });
  };
  const changePassword = (newPassword) => {
    setUser({ ...user, password: newPassword });
  };
  const changePassword2 = (newPassword) => {
    setUser({ ...user, password2: newPassword });
  };

  return (
    <View testID='register-component'>
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
      <TouchableOpacity testID='register-submit-button' />
    </View>
  );
};

export default RegisterScreen;
