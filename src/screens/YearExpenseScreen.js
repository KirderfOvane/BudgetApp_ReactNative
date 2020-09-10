import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import DonutChart from '../components/DonutChart';
import DateMenu from '../components/DateMenu';
import { theme } from '../constants';
const { width, height } = Dimensions.get('window');
import PresetContext from '../context/preset/presetContext';
const YearExpenseScreen = () => {
  const presetContext = React.useContext(PresetContext);
  const { presets, calcCategorySumOnlyNegNumByYear, categorysumonlynegnumbyyear } = presetContext;
  const [YearExpenseTotal, setYearExpenseTotal] = React.useState(0);
  React.useEffect(() => {
    presets && !categorysumonlynegnumbyyear && calcCategorySumOnlyNegNumByYear();
    categorysumonlynegnumbyyear && setYearExpenseTotal(categorysumonlynegnumbyyear.reduce((a, b) => a + b));
  }, [categorysumonlynegnumbyyear]);

  return (
    <View>
      <DateMenu />
      <View style={styles.container}>
        <Text style={styles.text}>Expense Summary: Presented in donut-chart representing spending by category</Text>
      </View>
      <ImageBackground source={require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__3.jpg')} style={styles.image}>
        <View style={styles.card}>
          <DonutChart />
          <View style={{ alignItems: 'flex-start', alignSelf: 'flex-start', paddingLeft: 15, justifyContent: 'flex-end' }}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 3, borderBottomColor: theme.colors.light }}>
              <Text style={styles.cardtext}>Year Expenses:</Text>
              <Text style={[{ color: theme.colors.danger, paddingLeft: 25 }, styles.cardtext]}>{YearExpenseTotal}</Text>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 3, borderBottomColor: theme.colors.light, marginVertical: 10 }}>
              <Text style={styles.cardtext}>Monthly Average:</Text>
              <Text style={[{ color: theme.colors.danger, paddingLeft: 25 }, styles.cardtext]}>{Math.ceil(YearExpenseTotal / 12)}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    height: height,
    width: width,
    // resizeMode: 'cover',
  },
  container: {
    backgroundColor: theme.colors.light,
    paddingTop: 25,
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
  card: {
    // flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    width: Dimensions.get('window').width * 0.9,
    alignSelf: 'center',
    marginVertical: 25,
  },
  cardtext: {
    fontSize: theme.sizes.h4,
    fontWeight: theme.fonts.weight.semibold,
    marginBottom: 15,
  },
});
export default YearExpenseScreen;
