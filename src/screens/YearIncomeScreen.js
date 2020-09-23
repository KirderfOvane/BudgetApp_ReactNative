import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import DonutChart from '../components/DonutChart';
import DateMenu from '../components/DateMenu';
import { theme } from '../constants';
const { width, height } = Dimensions.get('window');
import PresetContext from '../context/preset/presetContext';

const YearIncomeScreen = () => {
  const {
    presets,
    calcCategorySumOnlyPosNumByYear,
    categorysumonlyposnumbyyear,
    setCategoryNameOnlyPosNumByYear,
    categorynameonlyposnumbyyear,
  } = React.useContext(PresetContext);

  const [YearIncomeTotal, setYearIncomeTotal] = React.useState(0);
  React.useEffect(() => {
    presets && !categorysumonlyposnumbyyear && calcCategorySumOnlyPosNumByYear();
    presets && !categorysumonlyposnumbyyear && setCategoryNameOnlyPosNumByYear();
    categorysumonlyposnumbyyear && setYearIncomeTotal(categorysumonlyposnumbyyear.reduce((a, b) => a + b));
  }, [categorysumonlyposnumbyyear]);

  return (
    <View>
      <DateMenu />
      <View style={styles.container}>
        <Text style={styles.text}>Income Summary: Presented in donut-chart representing income by category</Text>
      </View>
      <ImageBackground source={require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__3.jpg')} style={styles.image}>
        <View style={styles.card}>
          <DonutChart
            CategorySumByYear={categorysumonlyposnumbyyear}
            CategoryNamesByYear={categorynameonlyposnumbyyear}
            colorScale={theme.colors.donutIncome}
          />
          <View style={{ alignItems: 'flex-start', alignSelf: 'flex-start', paddingLeft: 15, justifyContent: 'flex-end' }}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 3, borderBottomColor: theme.colors.light }}>
              <Text style={styles.cardtext}>Year Income:</Text>
              <Text style={[{ color: theme.colors.success, paddingLeft: 25 }, styles.cardtext]}>{YearIncomeTotal}</Text>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 3, borderBottomColor: theme.colors.light, marginVertical: 10 }}>
              <Text style={styles.cardtext}>Monthly Average:</Text>
              <Text style={[{ color: theme.colors.success, paddingLeft: 25 }, styles.cardtext]}>{Math.ceil(YearIncomeTotal / 12)}</Text>
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
export default YearIncomeScreen;
