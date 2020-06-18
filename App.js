import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LandingScreen from "./src/screens/LandingScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import YearBalanceScreen from "./src/screens/YearBalanceScreen";

const Guest = createStackNavigator();
const User = createStackNavigator();

const GuestScreen = () => {
  return (
    <Guest.Navigator>
      <Guest.Screen name='Landing' component={LandingScreen} />
      <Guest.Screen name='Login' component={LoginScreen} />
      <Guest.Screen name='Register' component={RegisterScreen} />
    </Guest.Navigator>
  );
};

const UserScreen = () => {
  return (
    <User.Navigator>
      <User.Screen name='YearBalanceScreen' component={YearBalanceScreen} />
    </User.Navigator>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  return (
    <NavigationContainer>
      <Guest.Navigator>
        {!isAuthenticated && <Guest.Screen testID='Landing' name='LandingScreen' component={GuestScreen} />}
        {isAuthenticated && <User.Screen testID='YearBalanceScreen' name='YearBalanceScreen' component={UserScreen} />}
      </Guest.Navigator>
    </NavigationContainer>
  );
};
export default App;
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { createDrawerNavigator } from '@react-navigation/drawer';
//import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// {isAuthenticated && <Guest.Screen testID='User' name='UserScreen' component={UserScreen} />}
