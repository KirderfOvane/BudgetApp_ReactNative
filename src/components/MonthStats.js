import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PresetContext from '../context/preset/presetContext';
import { theme } from '../constants';
import FH_ActivityIndicator from './FH_ActivityIndicator';

const MonthStats = () => {
  const presetContext = React.useContext(PresetContext);
  const { calculating, PosMonthSum, MonthSum, NegMonthSum, sum, monthsavings, SumPiggybanksMonth } = presetContext;

  return (
    <View style={styles.card}>
      {/*  {calculating ? (
        <FH_ActivityIndicator position={'relative'} />
      ) : ( */}
      <>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ flex: 1, fontSize: theme.sizes.font }}>Month Income</Text>
          <Text style={[{ flex: 1, fontSize: theme.sizes.font, color: theme.colors.success }]}>{PosMonthSum}</Text>
        </View>

        {/*  <View style={{ flexDirection: 'row' }}>
          <Text style={{ flex: 1, fontSize: theme.sizes.font }}>Month Surplus</Text>
          <Text style={[{ flex: 1, fontSize: theme.sizes.font, color: theme.colors.success }]}>{MonthSum}</Text>
        </View> */}

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ flex: 1, fontSize: theme.sizes.font }}>Month Expenses</Text>
          <Text style={[{ flex: 1, fontSize: theme.sizes.font, color: theme.colors.danger }]}>{NegMonthSum}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ flex: 1, fontSize: theme.sizes.font }}>Account Balance</Text>
          <Text
            style={[{ flex: 1, fontSize: theme.sizes.font }, sum > 0 ? { color: theme.colors.success } : { color: theme.colors.danger }]}
          >
            {sum}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ flex: 1, fontSize: theme.sizes.font }}>Month Balance</Text>
          <Text
            style={[
              { flex: 1, fontSize: theme.sizes.font },
              PosMonthSum + NegMonthSum > 0 ? { color: theme.colors.success } : { color: theme.colors.danger },
            ]}
          >
            {PosMonthSum + NegMonthSum}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ flex: 1, fontSize: theme.sizes.font }}>Month Savings</Text>
          <Text style={[{ flex: 1, fontSize: theme.sizes.font, color: theme.colors.orange }]}>{monthsavings + SumPiggybanksMonth}</Text>
        </View>
      </>
      {/*  )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 414,
    height: 725,
    backgroundColor: theme.colors.light,
  },
  containerflex: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 5,
    borderWidth: 4,
    borderRadius: 16,
    borderColor: theme.colors.light,
    justifyContent: 'space-between',
    minHeight: 200,
    padding: 15,
  },
  filterTitleView: {
    paddingTop: 5,
  },
  filterTitleText: {
    color: theme.colors.gray,
    fontSize: theme.sizes.h2,
    textAlign: 'center',
    padding: 15,
    textDecorationLine: 'underline',
  },
});
export default MonthStats;
