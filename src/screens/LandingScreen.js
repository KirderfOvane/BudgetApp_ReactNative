import React from 'react';
import AuthContext from '../context/auth/authContext';
import { View, Text, Button } from 'react-native';

const LandingScreen = ({ navigation }) => {
  const authContext = React.useContext(AuthContext);
  const { loadUser, isAuthenticated } = authContext;

  //const { loadUser } = authContext;
  React.useEffect(() => {
    /*     const tryAuth = async () => {
      const mytry = await AsyncStorage.getItem('token');
      // console.log(mytry);
      if (typeof mytry === 'string') {
        setIsLoggedin(true);
      }
    }; */
    // old way to navigate. Slower! isAuthenticated && navigation.navigate('Balance');
    loadUser();
  }, []);
  return (
    <View testID='landing-component'>
      <Text>LandingScreen</Text>
      <Button testID='loginbutton' title='Login' onPress={() => navigation.navigate('Login')}>
        Login
      </Button>
      <Button testID='registerbutton' title='Register' onPress={() => navigation.navigate('Register')}>
        Register
      </Button>
    </View>
  );
};

export default LandingScreen;
