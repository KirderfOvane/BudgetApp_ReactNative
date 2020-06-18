import React from "react";
import { View, Text, Button } from "react-native";

const LandingScreen = ({ navigation }) => {
  return (
    <View testID="landing-component">
      <Text>LandingScreen</Text>
      <Button testID="loginbutton" title="Login" onPress={() => navigation.navigate("Login")}>
        Login
      </Button>
      <Button testID="registerbutton" title="Register" onPress={() => navigation.navigate("Register")}>
        Register
      </Button>
    </View>
  );
};

export default LandingScreen;
