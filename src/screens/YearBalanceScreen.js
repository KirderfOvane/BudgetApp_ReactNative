import React from 'react';
import { View, Text, Button } from 'react-native';
//import { AsyncStorage } from 'react-native';
import AuthContext from '../context/auth/authContext';
import PresetContext from '../context/preset/presetContext';

const YearBalanceScreen = ({ navigation }) => {
  //context
  const authContext = React.useContext(AuthContext);
  const presetContext = React.useContext(PresetContext);
  //context destruct
  const { user, token, logout, loadUser } = authContext;
  const { sum, getPresets, presets } = presetContext;
  //component logic
  const yearmonthavg = parseInt(parseFloat(presetContext.yearsum / 12));
  //on mount
  React.useEffect(() => {
    getPresets();
  }, []);

  //console.log(presets);
  const month = () => {
    navigation.navigate('Month');
  };
  return (
    <View>
      <Text>YearBalanceScreen</Text>
      <Text> {user && user.email} </Text>
      <Text> {user && yearmonthavg} </Text>

      <Button title='logout' onPress={logout} />
      <Button title='month' onPress={month} />
    </View>
  );
};

export default YearBalanceScreen;
