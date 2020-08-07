import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AuthContext from '../context/auth/authContext';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../constants';
import { withNavigation } from 'react-navigation';

const UserScreen = ({ navigation }) => {
  const authContext = React.useContext(AuthContext);
  const { user, token, logout, loadUser } = authContext;

  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.label}>Name </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Name')}>
          <Text style={styles.input}>{user.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Name')}>
          <Text>
            <AntDesign style={styles.chevron} name='right' size={24} color='black' />
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Email </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Email')}>
          <Text style={styles.input}>{user.email}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Email')}>
          <Text>
            <AntDesign style={styles.chevron} name='right' size={24} color='black' />
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Password </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Password')}>
          <Text style={styles.input}>change password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Password')}>
          <Text>
            <AntDesign style={styles.chevron} name='right' size={24} color='black' />
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={logout}>
        <Text style={styles.logout}>
          Logout
          <MaterialCommunityIcons style={styles.logoutIcon} name='logout-variant' size={24} color={theme.colors.light} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 25,
  },
  label: {
    flex: 1,

    fontSize: 24,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.gray,
    paddingLeft: 15,
  },
  input: {
    flex: 1,
    justifyContent: 'flex-end',
    textAlign: 'right',
    paddingRight: 15,
    fontSize: 18,
    color: theme.colors.gray,
    borderBottomWidth: 7,
    borderBottomColor: theme.colors.dark,
  },
  chevron: {
    paddingRight: 10,
  },
  logout: {
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
  logoutIcon: {
    padding: 25,
  },
});
export default withNavigation(UserScreen);
