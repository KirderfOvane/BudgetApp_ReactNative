import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Providers
import AuthState from './context/auth/AuthState';

//Auth
import { AsyncStorage } from 'react-native';
import setAuthToken from './setAuthToken';

//Screens
import LandingScreen from './src/screens/LandingScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import YearBalanceScreen from './src/screens/YearBalanceScreen';

//stacks
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
  const [isLoggedin, setIsLoggedin] = React.useState(false);

  // Auth check
  /*  React.useEffect(() => {
    const tryToAuthenticate = async () => {
      const Asynctoken = await AsyncStorage.getItem('token');

      //console.log(Asynctoken);
      if (Asynctoken) {
        // console.log('yes token');
        setAuthToken(Asynctoken);
        setIsLoggedin(true);
      } else {
        // console.log('no token');
      }
    };
    tryToAuthenticate();
  }, []); */

  return (
    <AuthState>
      <NavigationContainer>
        <Guest.Navigator>
          {!isLoggedin && <Guest.Screen testID='Landing' name='LandingScreen' component={GuestScreen} />}
          {isLoggedin && <User.Screen testID='YearBalanceScreen' name='YearBalanceScreen' component={UserScreen} />}
        </Guest.Navigator>
      </NavigationContainer>
    </AuthState>
  );
};
export default App;
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { createDrawerNavigator } from '@react-navigation/drawer';
//import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// {isAuthenticated && <Guest.Screen testID='User' name='UserScreen' component={UserScreen} />}
