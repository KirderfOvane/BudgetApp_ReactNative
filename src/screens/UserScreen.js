import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AuthContext from '../context/auth/authContext';
import PresetContext from '../context/preset/presetContext';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../constants';
import { withNavigation } from 'react-navigation';

const UserScreen = ({ navigation }) => {
  const authContext = React.useContext(AuthContext);
  const presetContext = React.useContext(PresetContext);
  const { user, logout } = authContext;
  const { clearPresets, resetSums, presets } = presetContext;

  const onGuide = () => {
    navigation.navigate('Guide');
  };

  const onLogout = () => {
    resetSums();
    clearPresets();
    logout();
  };

  React.useEffect(() => {
    presets === null && user === null && navigation.navigate('Landing');
  }, [presets, user]);

  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.label}>Name </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Name')}>
          <Text style={styles.input}>{user && user.name}</Text>
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
          <Text style={styles.input}>{user && user.email}</Text>
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
      <TouchableOpacity onPress={onLogout}>
        <Text style={styles.logout}>
          Logout {'  '}
          <MaterialCommunityIcons style={styles.logoutIcon} name='logout-variant' size={24} color={theme.colors.light} />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onGuide}>
        <Text style={styles.appguide}>
          App Guide {'  '}
          <MaterialCommunityIcons name='comment-eye-outline' size={24} color={theme.colors.dark} />
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
    paddingLeft: 65,
    borderWidth: 2,
    borderColor: theme.colors.gray,
    borderStyle: 'solid',
    borderRadius: 8,
    overflow: 'hidden',
    paddingRight: 25,
  },
  logoutIcon: {
    padding: 25,
  },
  appguide: {
    marginHorizontal: 15,
    marginTop: 15,
    textAlign: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 65,
    fontWeight: theme.fonts.weight.bold,
    fontSize: 25,
    fontFamily: theme.fonts.family.main,
    color: theme.colors.dark,
    backgroundColor: theme.colors.light,
    paddingVertical: 10,

    borderWidth: 2,
    borderColor: theme.colors.gray,
    borderStyle: 'solid',
    borderRadius: 8,
    overflow: 'hidden',
    paddingRight: 25,
  },
});
export default withNavigation(UserScreen);
