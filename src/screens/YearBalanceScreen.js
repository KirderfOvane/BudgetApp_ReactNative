import React from 'react';
import { View, Text, Button } from 'react-native';

import AuthContext from '../../context/auth/authContext';

const YearBalanceScreen = () => {
  const authContext = React.useContext(AuthContext);
  const { isAuthenticated, user, token, logout, loadUser } = authContext;
  React.useEffect(() => {
    loadUser();
    console.log('wtf');
  }, []);
  return (
    <View>
      <Text>YearBalanceScreen</Text>
      <Text>{user}</Text>
      <Button title='logout' onPress={logout} />
    </View>
  );
};

export default YearBalanceScreen;
