import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import DateMenu from './DateMenu';
import PresetFilter from './PresetFilter';
import AddToBudget from './AddToBudget';
import YearBalance from '../components/YearBalance';
import CategoryBalance from '../components/CategoryBalance';
import PresetContext from '../context/preset/presetContext';
import AuthContext from '../context/auth/authContext';
import { theme } from '../constants';

const SwipeItem = ({ monthlist, activeindex, index, presetByMonth, setMonthList, monthIncomeSum, monthExpenseSum }) => {
  //context
  const presetContext = React.useContext(PresetContext);
  //context destruct
  const { filtered, year, sendEdit } = presetContext;

  return (
    <View style={styles.container}>
      <DateMenu monthlist={monthlist} activeindex={activeindex} />
      <ImageBackground source={monthlist[index].image} style={styles.image}>
        {isNaN(monthlist[activeindex].month) ? ( // month
          <>
            {!filtered || filtered === 'positive' || filtered === 'negative' ? (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, fontSize: theme.sizes.font }}>Month Income</Text>
                    <Text style={[{ flex: 1, fontSize: theme.sizes.font, color: theme.colors.success }]}>income</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, fontSize: theme.sizes.font }}>Month Surplus</Text>
                    <Text style={[{ flex: 1, fontSize: theme.sizes.font, color: theme.colors.success }]}>{presetContext.MonthSum}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, fontSize: theme.sizes.font }}>Month Expenses</Text>
                    <Text style={[{ flex: 1, fontSize: theme.sizes.font, color: theme.colors.danger }]}>{presetContext.NegMonthSum}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, fontSize: theme.sizes.font }}>Account Balance</Text>
                    <Text
                      style={[
                        { flex: 1, fontSize: theme.sizes.font },
                        presetContext.sum > 0 ? { color: theme.colors.success } : { color: theme.colors.danger },
                      ]}
                    >
                      {presetContext.sum}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, fontSize: theme.sizes.font }}>Month Balance</Text>
                    <Text
                      style={[
                        { flex: 1, fontSize: theme.sizes.font },
                        presetContext.PosMonthSum - presetContext.NegMonthSum > 0
                          ? { color: theme.colors.success }
                          : { color: theme.colors.danger },
                      ]}
                    >
                      {presetContext.PosMonthSum - presetContext.NegMonthSum}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, fontSize: theme.sizes.font }}>Month Savings</Text>
                    <Text style={[{ flex: 1, fontSize: theme.sizes.font }]}>{presetContext.monthsavings}</Text>
                  </View>
                </View>
                <View style={styles.card}>
                  {filtered === null || filtered === 'positive' ? (
                    <View style={styles.filterTitleView}>
                      <Text style={styles.filterTitleText}>Income</Text>
                      <PresetFilter monthlist={monthlist} activeindex={activeindex} presetthismonth={presetByMonth[0]} />
                    </View>
                  ) : null}
                  {filtered === null || filtered === 'negative' ? (
                    <View style={styles.filterTitleView}>
                      <Text style={styles.filterTitleText}>Expenses</Text>
                      <PresetFilter monthlist={monthlist} activeindex={activeindex} presetthismonth={presetByMonth[1]} />
                    </View>
                  ) : null}
                </View>
              </ScrollView>
            ) : null}

            {filtered === 'add' && <AddToBudget month={monthlist[activeindex].month} setMonthList={setMonthList} monthlist={monthlist} />}
            {filtered === 'category' && <CategoryBalance localmonth={monthlist[activeindex].month} />}
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
