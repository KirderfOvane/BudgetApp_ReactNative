import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, SectionList } from 'react-native';
import Constants from 'expo-constants';
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

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const FH_SectionList = () => {
  const presetContext = React.useContext(PresetContext);
  const { filteredmonthandposnum } = presetContext;

  //console.log('#####ilteredmonthandposnum[0]');
  // console.log(filteredmonthandposnum);
  const myData = [
    {
      title: 'Income',
      data: ['Pizsza', 'Burger', 'Risotto'],
    },
    {
      title: 'Expenses',
      data: ['Pizsza', 'Burger', 'Risotto'],
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>{presetContext.filteredmonthandposnum}</Text> */}
      <SectionList
        sections={myData}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

export default FH_SectionList;
