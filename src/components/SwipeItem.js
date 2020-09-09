import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
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

const SwipeItem = ({ monthlist, activeindex, index, setMonthList, navigation }) => {
  //context
  const presetContext = React.useContext(PresetContext);
  //context destruct

  const { filtered, filteredmonthandnegnum, filteredmonthandposnum } = presetContext;

  return (
    <View style={styles.container}>
      <DateMenu monthlist={monthlist} activeindex={activeindex} navigation={navigation} />
      <ImageBackground source={monthlist[index].image} style={styles.image}>
        {isNaN(monthlist[activeindex].month) ? ( // month
          <>
            {!filtered || filtered === 'positive' || filtered === 'negative' ? (
              <ScrollView showsVerticalScrollIndicator={false}>
                <MonthStats />
                <View style={styles.card}>
                  {filtered === null || filtered === 'positive' ? (
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
                  ) : null}
                </View>
              </ScrollView>
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
    flex: 1,
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
