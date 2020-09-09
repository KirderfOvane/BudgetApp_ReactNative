import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import PresetContext from '../context/preset/presetContext';
import DateMenu from '../components/DateMenu';
import { theme, icons } from '../constants';
import PiggybankSavingsItem from '../components/PiggybankSavingsItem';
const { width, height } = Dimensions.get('window');
const YearSavingsScreen = ({ navigation }) => {
  const presetContext = React.useContext(PresetContext);
  const { purchases, setPurchase, year, capital, savings } = presetContext;
  React.useEffect(() => {
    !purchases && setPurchase();
  }, []);

  return (
    <View>
      <DateMenu navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.text}>Savings Summary</Text>
      </View>
      <ImageBackground source={require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__3.jpg')} style={styles.image}>
        <View style={styles.card}>
          <View style={[styles.cardtextcontainer, { marginTop: 25 }]}>
            <Text style={styles.cardtext}>General Savings:</Text>
            <Text style={[{ color: theme.colors.success }, styles.cardtext]}>{savings}</Text>
          </View>
          <View style={styles.cardtextcontainer}>
            <Text style={styles.cardtext}>Capital:</Text>
            <Text style={[{ color: theme.colors.success }, styles.cardtext]}>{capital}</Text>
          </View>
          <View style={styles.piggybankTitleContainer}>
            <Text style={styles.piggybankTitle}>{icons.getIcon('piggybank')}</Text>
            <Text style={styles.piggybankTitle}>Piggybank Purchase Savings</Text>
          </View>
          <View style={{ width: Dimensions.get('window').width * 0.9, minHeight: 300 }}>
            <PiggybankSavingsItem purchases={purchases} year={year} />
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
  piggybankTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 25,
  },
  piggybankTitle: {
    paddingHorizontal: 5,
    fontSize: theme.sizes.font,
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
  cardtextcontainer: {
    flexDirection: 'row',
    borderBottomWidth: 3,
    borderColor: theme.colors.light,
    marginHorizontal: 25,
    marginVertical: 10,
  },
  cardtext: { flex: 1, fontSize: theme.sizes.font },
  text: {
    fontSize: theme.sizes.h4,
    fontWeight: theme.fonts.weight.semibold,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  card: {
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    width: Dimensions.get('window').width * 0.9,
    alignSelf: 'center',
    marginVertical: 50,
  },
});
export default YearSavingsScreen;
