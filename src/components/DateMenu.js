import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../constants';
import PresetContext from '../context/preset/presetContext';
const DateMenu = ({ monthlist, activeindex, navigation }) => {
  const presetContext = React.useContext(PresetContext);
  const { addMonth, setYear, year } = presetContext;
  const onPressJanuary = () => {
    addMonth('January');
    navigation.navigate('Month');
  };
  const onPressDecember = () => {
    setYear(parseInt(year) - 1);
    addMonth('December');
    navigation.navigate('Month', { fromYear: 'December' });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressDecember}>
        <Text style={styles.button}>{'<'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressDecember}>
        <Text style={styles.button}> {monthlist[activeindex - 1].month}</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.activeindex}>{monthlist[activeindex].month}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressJanuary}>
        {isNaN(monthlist[activeindex + 1].month) ? (
          <Text style={styles.button}> {monthlist[activeindex + 1].month}</Text>
        ) : (
          <Text style={styles.button}> {parseInt(monthlist[activeindex + 1].month) + 1}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressJanuary} title={monthlist[activeindex + 1].month}>
        <Text style={styles.button}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};
DateMenu.defaultProps = {
  monthlist: [
    { month: 'August', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__1.jpg') },
    { month: 'September', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__2.jpg') },
    { month: 'October', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__3.jpg') },
    { month: 'November', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__4.jpg') },
    { month: 'December', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__5.jpg') },
    { month: '2019', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__6.jpg') },
    { month: 'January', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__7.jpg') },
    { month: 'February', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__8.jpg') },
    { month: 'March', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__9.jpg') },
    { month: 'April', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__10.jpg') },
    { month: 'May', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__11.jpg') },
    { month: 'June', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__12.jpg') },
    { month: 'July', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__13.jpg') },
  ],
  activeindex: 5,
};
const styles = StyleSheet.create({
  container: {
    flexShrink: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    margin: 'auto',
    backgroundColor: theme.colors.light,
  },
  button: {
    fontWeight: theme.fonts.weight.bold,
    fontSize: theme.sizes.base,
    fontFamily: theme.fonts.family.main,
    color: theme.colors.gray,
  },
  activeindex: {
    fontWeight: theme.fonts.weight.bold,
    fontSize: theme.sizes.base,
    fontFamily: theme.fonts.family.main,
    color: '#fff',
    backgroundColor: theme.colors.dark,
    paddingVertical: 5,
    paddingHorizontal: theme.sizes.font,
    borderWidth: 1,
    borderColor: theme.colors.dark,
    borderStyle: 'solid',
    borderRadius: 8,
    overflow: 'hidden',
  },
});
export default DateMenu;
