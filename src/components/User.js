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

  //fits name accordingly to length
  getUserName = (name) => {
    // if name more than charlength
    if (name.length > 10) {
      // if name contains white space ,set first part as firstname
      if (name.indexOf(' ') >= 0) {
        const firstname = name.split(' ')[0];
        // if firstname is still too long, use initials
        if (firstname.length > 10) {
          const firstInitial = name.split(' ')[0][0];
          const lastnameInitial = name.split(' ')[1][0];
          const initials = firstInitial + lastnameInitial;
          return initials;
        } else return firstname;
        // if no whitespace, use ellipsis shortening
      } else {
        return name.slice(0, 9) + '...';
      }
    }
    //if not to long name
    return name;
  };
  return (
    <>
      <TouchableOpacity onPress={onPressUser} style={{ flexDirection: 'row', paddingHorizontal: 10, alignContent: 'space-around' }}>
        <Text style={{ color: 'white', paddingHorizontal: 10, fontSize: theme.sizes.base, fontWeight: theme.fonts.weight.semibold }}>
          {user ? getUserName(user.name) : ''}
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
