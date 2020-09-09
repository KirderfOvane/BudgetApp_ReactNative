import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import PresetContext from '../context/preset/presetContext';
import { theme } from '../constants';
import FH_ActivityIndicator from './FH_ActivityIndicator';
import PurchaseItem from '../components/PurchaseItem';

const CategoryBalance = ({ localmonth }) => {
  //context
  const presetContext = React.useContext(PresetContext);
  //context destruct
  const { calcCategoryByMonth, month, categorymonthsum, MonthSum, year, purchases, filtered, PosMonthSum, NegMonthSum } = presetContext;
  console.log(PosMonthSum, NegMonthSum, MonthSum);
  // useEffect
  /*  React.useEffect(() => {
    localmonth !== month && addMonth(localmonth);
  }, [month, presets, year, localmonth]); */
  /*  React.useEffect(() => {
    presets && localmonth === month && calcCategoryByMonth();
  }, [month]); */
  // jsx
  /* if (localmonth === month) { */
  //console.log(localmonth);
  // console.log(month);
  //console.log(purchases.length);
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Purchases</Text>
      {filtered === 'purchases' ? (
        <>
          {categorymonthsum.length === 0 ? (
            <Text style={{ flex: 1, fontSize: theme.sizes.font, textAlign: 'center', color: theme.colors.orange }}>
              No values in this month
            </Text>
          ) : (
            <FlatList
              data={purchases}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item._id.toString()}
              renderItem={(object) => {
                // console.log(object);
                return <PurchaseItem Item={object.item} />;
              }}
            />
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
    justifyContent: 'center',
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
export default CategoryBalance;
