import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AuthContext from '../context/auth/authContext';
import PresetContext from '../context/preset/presetContext';
import BarChart from './BarChart';
import FH_ActivityIndicator from './FH_ActivityIndicator';
import { theme } from '../constants';
const YearBalance = ({ year }) => {
  //context
  const authContext = React.useContext(AuthContext);
  const presetContext = React.useContext(PresetContext);
  //context destruct
  const { user, token, logout, loadUser, loading } = authContext;
  const { sum, presets, yearsum } = presetContext;
  //component logic
  const yearmonthavg = parseInt(parseFloat(yearsum / 12));
  // console.log(yearsum);

  return (
    <>
      {loading && presets === null ? (
        <FH_ActivityIndicator position={'absolute'} color={theme.colors.dark} />
      ) : (
        <>
          <View style={styles.container}>
            <Text style={styles.title}>{year}</Text>
            <Text style={styles.text}>
              Yearly summary and comparison analysis with last year. Here you can also see differences in income/costs over the year.{' '}
            </Text>
          </View>
          <BarChart year={year} />
        </>
      )}
    </>
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
    marginBottom: 30,
  },
});
export default YearBalance;
