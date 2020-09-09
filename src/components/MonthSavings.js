import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import PresetContext from '../context/preset/presetContext';
import { theme } from '../constants';
import FH_ActivityIndicator from './FH_ActivityIndicator';
import PurchaseItem from '../components/PurchaseItem';
import MonthSavingsItem from '../components/MonthSavingsItem';

const MonthSavings = ({ localmonth }) => {
  //context
  const presetContext = React.useContext(PresetContext);
  //context destruct
  const { monthsavingspresets, filtered, MonthPiggySavingsSums } = presetContext;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Month Savings</Text>
      {filtered === 'savings' ? (
        <>
          {monthsavingspresets.length === 0 ? (
            <Text style={{ flex: 1, fontSize: theme.sizes.font, textAlign: 'center', color: theme.colors.orange }}>
              No values in this month
            </Text>
          ) : (
            <>
              <View style={{ justifyContent: 'flex-start' }}>
                <FlatList
                  data={monthsavingspresets}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item._id.toString()}
                  renderItem={(object) => {
                    // console.log(object);
                    return (
                      <MonthSavingsItem
                        name={object.item.name}
                        category={object.item.category}
                        sum={object.item.number}
                        isPiggyBankSaving={false}
                      />
                    );
                  }}
                />
                <FlatList
                  data={MonthPiggySavingsSums}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item.key}
                  renderItem={(saving) => {
                    return (
                      <MonthSavingsItem
                        category={saving.item.Item.category}
                        name={saving.item.Item.name}
                        sum={saving.item.SumOfPreset}
                        isPiggyBankSaving={true}
                      />
                    );
                  }}
                />
              </View>
            </>
          )}
        </>
      ) : (
        <FH_ActivityIndicator position={'relative'} color={theme.colors.dark} />
      )}
    </View>
  );
};

// css
const styles = StyleSheet.create({
  title: {
    fontSize: theme.sizes.h3,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.gray,
    textAlign: 'center',
    paddingVertical: 15,
    // borderWidth: 1,
  },
  card: {
    flex: 1,
    backgroundColor: theme.colors.light,
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 30,
    borderWidth: 4,
    borderRadius: 16,
    borderColor: theme.colors.dark,
    paddingHorizontal: 15,
    paddingVertical: 15,
    // justifyContent: 'center',
  },
  itemcard: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.colors.dark,
    height: 45,
    paddingVertical: 5,
    marginVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  text: {
    fontSize: theme.sizes.base,
    fontWeight: theme.fonts.weight.semibold,
    alignSelf: 'center',
  },
});
export default MonthSavings;
