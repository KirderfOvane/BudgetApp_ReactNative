import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, SectionList } from 'react-native';
import Constants from 'expo-constants';
import PresetItem from './PresetItem';
import PresetContext from '../context/preset/presetContext';
import MonthStats from './MonthStats';
import FH_ActivityIndicator from '../components/FH_ActivityIndicator';
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
  const [localData, setLocalData] = React.useState({ m: '', p: '', n: '' });
  const [Loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if (localData.m === presetContext.month && localData.p === posData.length && localData.n === negData.length) {
      setLoading(false);
    } else {
      posData && negData && setLocalData({ m: presetContext.month, p: posData.length, n: negData.length });
    }
  }, [presetContext.month, posData, negData, localData]);
  if (localData.m === presetContext.month && localData.p === posData.length && localData.n === negData.length) {
    return (
      <>
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
          extraData={localData}
          keyExtractor={(item, index) => item + index}
          renderItem={(preset) => <PresetItem preset={preset} />}
          ListHeaderComponent={<MonthStats />}
          renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
        />
      </>
    );
  } else return <FH_ActivityIndicator />;
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
    textAlign: 'center',
    paddingVertical: 25,
  },
  name: {
    flex: 1,
    fontSize: 24,
  },
});

export default FH_SectionList;
