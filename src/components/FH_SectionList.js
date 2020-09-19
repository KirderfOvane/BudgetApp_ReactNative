import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, SectionList } from 'react-native';
import Constants from 'expo-constants';
import PresetItem from './PresetItem';
import PresetContext from '../context/preset/presetContext';
const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

const Item = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.name}>{item.name}</Text>
    <Text style={styles.name}>{item.number}</Text>
  </View>
);

const FH_SectionList = ({ posData, negData }) => {
  const presetContext = React.useContext(PresetContext);
  const {
    //  filteredmonthandposnum,
    //  filteredmonthandnegnum,
    presets,
    MonthSum,
    filterOutPositiveNumsAndMonth,
    filterOutNegativeNumsAndMonth,
  } = presetContext;
  // React.useEffect(() => {
  // if (presets !== null) {
  //  filterOutPositiveNumsAndMonth('January');
  // filterOutNegativeNumsAndMonth('January');
  /*  calcMonthSum();
      getMonthSavings(presetContext.month);
      calcMonthSavings();
      MonthSum && calcMonthBalance();
      calcSum();
      setPurchase();
      calcCategoryByMonth();
      getMonthPiggySavings(); */
  // }
  //}, [presetContext.month, presets, MonthSum]);
  // console.log(posData);
  //console.log(posData.length);

  if (posData) {
    return (
      <SafeAreaView style={styles.container}>
        {/* <Text>{presetContext.filteredmonthandposnum}</Text> */}
        <SectionList
          initialNumToRender={7}
          removeClippedSubviews={true}
          sections={[
            {
              title: 'Income',
              data: posData,
            },
            {
              title: 'Expenses',
              data: negData,
            },
          ]}
          extraData={posData}
          keyExtractor={(item, index) => item + index}
          renderItem={(preset) => <PresetItem preset={preset} />}
          renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
        />
      </SafeAreaView>
    );
  } else return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  name: {
    flex: 1,
    fontSize: 24,
  },
});

export default FH_SectionList;
