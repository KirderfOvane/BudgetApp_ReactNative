import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, FlatList, SafeAreaView } from 'react-native';
import DateMenu from './DateMenu';
import PresetFilter from './PresetFilter';
import AddToBudget from './AddToBudget';
import YearBalance from '../components/YearBalance';
import CategoryBalance from '../components/CategoryBalance';
import PresetContext from '../context/preset/presetContext';
import { theme } from '../constants';
import MonthStats from './MonthStats';
import Purchases from '../components/Purchases';
import MonthSavings from '../components/MonthSavings';
import FH_SectionList from './FH_SectionList';

import UseMemoTest from './UseMemoTest';

const SwipeItem = ({ monthlist, activeindex, index, setMonthList, data }) => {
  //context
  const { filtered, filteredmonthandnegnum, filteredmonthandposnum } = React.useContext(PresetContext);
  //console.log(data);
  //const { filtered, filteredmonthandnegnum, filteredmonthandposnum } = presetContext;
  /*
  DateMenu: 8 ram, 143 Views 
  ImageBackground: 0 ram, 26 Views
  MonthStats: 10 ram, 208 Views
  PresetFilter(pos): 10 ram, 1586 Views ,132 Views per item  !!
  PresetFilter(neg): 24 ram, 2886 Views  131 Views per item !!!
  PresetItem: delete: 884 Views, 26 Views per item
  PresetItem: category: 1514 Views, 44 Views per item
  PresetItem: number: 1514 Views, 44 Views per item
  PresetItem: name: 1514 Views, 44 Views per item
  
  // initialNumToRender,windowSize to 3:
    PresetFilter(neg): 8 ram, 1332 Views  60 Views per item 
  */

  //console.log('SwipeItemRender');

  return (
    <View style={styles.container}>
      <DateMenu monthlist={monthlist} activeindex={activeindex} />
      <ImageBackground source={monthlist[index].image} style={styles.image}>
        {isNaN(monthlist[activeindex].month) ? ( // month
          <>
            {!filtered || filtered === 'positive' || filtered === 'negative' ? (
              /*    <ScrollView showsVerticalScrollIndicator={false} removeClippedSubviews={true}> */
              /*  <MonthStats /> */
              <View style={styles.card}>
                <FH_SectionList posData={filteredmonthandposnum} negData={filteredmonthandnegnum} />
                {/*  {filtered === null || filtered === 'positive' ? (
                    <View style={styles.filterTitleView}>
                      <Text style={styles.filterTitleText}>Income</Text>
                      <PresetFilter data={filteredmonthandposnum} />
                    </View>
                  ) : null}
                  {filtered === null || filtered === 'negative' ? (
                    <View style={styles.filterTitleView}>
                      <Text style={styles.filterTitleText}>Expenses</Text>
                      <PresetFilter data={filteredmonthandnegnum} />
                    </View>
                  ) : null} */}
                {/* </ScrollView> */}
              </View>
            ) : null}

            {filtered === 'add' && <AddToBudget month={monthlist[activeindex].month} />}
            {filtered === 'category' && <CategoryBalance localmonth={monthlist[activeindex].month} />}
            {filtered === 'purchases' && <Purchases localmonth={monthlist[activeindex].month} />}
            {filtered === 'savings' && <MonthSavings localmonth={monthlist[activeindex].month} />}
          </>
        ) : (
          //  year
          <YearBalance year={monthlist[activeindex].month} />
        )}
      </ImageBackground>
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
    //flex: 1,
    minHeight: 615,
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 30,
    borderWidth: 4,
    borderRadius: 16,
    borderColor: theme.colors.light,
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

export default SwipeItem;
