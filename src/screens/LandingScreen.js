import React from 'react';
import AuthContext from '../context/auth/authContext';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import { theme } from '../constants';

const LandingScreen = ({ navigation }) => {
  // Context
  const authContext = React.useContext(AuthContext);
  const { loadUser, isAuthenticated } = authContext;

  // State

  // Logic

  // useEffect
  React.useEffect(() => {
    loadUser();
  }, []);

  //jsx
  return (
    <View testID='landing-component' style={styles.container}>
      <ImageBackground source={require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__3.jpg')} style={styles.image}>
        <View style={styles.logocontainer}>
          <Logo paddingSides={15} />
          <Text style={styles.logotext}>Budget App</Text>
        </View>
        <Text style={styles.paragraph}>An App that helps you organize your economy.</Text>
        <TouchableOpacity style={styles.loginbtn} testID='loginbutton' title='Login' onPress={() => navigation.navigate('Login')}>
          <Text style={styles.logintext}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerbtn}
          testID='registerbutton'
          title='Register'
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registertext}>Register</Text>
        </TouchableOpacity>
      </ImageBackground>
      <Footer />
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
  logocontainer: {
    paddingVertical: 10,
    marginTop: 250,
    flexDirection: 'row',
    alignContent: 'center',
    backgroundColor: theme.colors.dark,
    opacity: 0.8,
    borderWidth: 1,
    borderColor: theme.colors.black,
  },
  logo: {
    //   borderWidth: 2,
    // borderColor: 'blue',
  },
  logotext: {
    color: 'white',
    paddingHorizontal: 5,
    fontSize: 48,
    //  borderWidth: 2,
    //  borderColor: 'green',
  },
  paragraph: {
    color: theme.colors.light,
    fontSize: theme.sizes.h2,
    paddingHorizontal: 25,
    marginVertical: 45,
    textAlign: 'center',
  },
  loginbtn: {
    width: 250,
    height: 60,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize: 12,
    fontWeight: theme.fonts.weight.bold,
    marginTop: 15,
    backgroundColor: theme.colors.light,
    color: theme.colors.primary,
    borderWidth: 2,
    borderColor: theme.colors.gray,
    alignSelf: 'center',
  },
  logintext: {
    fontWeight: theme.fonts.weight.bold,
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 10,
  },
  registerbtn: {
    width: 250,
    height: 60,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize: 12,
    marginTop: 15,
    backgroundColor: theme.colors.dark,
    color: theme.colors.light,
    borderWidth: 2,
    borderColor: theme.colors.gray,
    alignSelf: 'center',
  },
  registertext: {
    fontWeight: theme.fonts.weight.semibold,
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 10,
    color: theme.colors.light,
  },
});
export default LandingScreen;
