import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const RegisterScreen = () => {
  return (
    <View testID='register-component'>
      <Text testID='test'>RegisterScreen</Text>
      <TextInput testID='register-input-name' />
      <TextInput testID='register-input-email' />
      <TextInput testID='register-input-password' label='Password' autoCapitalize='none' autoCorrect={false} secureTextEntry={true} />
      <TextInput testID='register-input-confirm' />
      <TouchableOpacity testID='register-submit-button' />
    </View>
  );
};

export default RegisterScreen;
