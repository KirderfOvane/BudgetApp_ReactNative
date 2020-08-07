import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';

import AuthContext from '../context/auth/authContext';

import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../constants';

import { navigate } from '../navigationRef';

const User = ({ clickable }) => {
  // console.warn(navigation);
  const authContext = React.useContext(AuthContext);
  const { user } = authContext;
  //logic
  const onPressUser = () => {
    clickable && navigate('User');
  };
  return (
    <>
      <TouchableOpacity onPress={onPressUser} style={{ flexDirection: 'row', paddingHorizontal: 10, alignContent: 'space-around' }}>
        <Text style={{ color: 'white', paddingHorizontal: 10, fontSize: theme.sizes.base, fontWeight: theme.fonts.weight.semibold }}>
          {user ? user.name : ''}
        </Text>
        <FontAwesome5 name='user-alt' size={20} color='white' />
      </TouchableOpacity>
    </>
  );
};

User.defaultProps = {
  clickable: true,
};

export default User;
