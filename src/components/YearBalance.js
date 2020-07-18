import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AuthContext from '../context/auth/authContext';
import PresetContext from '../context/preset/presetContext';
import { theme } from '../constants';
const YearBalance = () => {
  //context
  const authContext = React.useContext(AuthContext);
  const presetContext = React.useContext(PresetContext);
  //context destruct
  const { user, token, logout, loadUser } = authContext;
  const { sum, presets, yearsum, year } = presetContext;
  //component logic
  const yearmonthavg = parseInt(parseFloat(yearsum / 12));
  console.log(yearsum);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{year}</Text>
      <Text style={styles.text}>
        Yearly summary and comparison analysis with last year. Here you can also see differences in income/costs over the year.{' '}
      </Text>

      <Button title='logout' onPress={logout} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.light,
  },
  title: {
    fontSize: theme.sizes.xlarge,
    fontWeight: theme.fonts.weight.regular,
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  text: {
    fontSize: theme.sizes.h4,
    fontWeight: theme.fonts.weight.semibold,
    paddingHorizontal: 20,
  },
});
export default YearBalance;
