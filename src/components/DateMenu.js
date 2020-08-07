import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PresetContext from '../context/preset/presetContext';
import { theme } from '../constants';

const DateMenu = ({ monthlist, activeindex }) => {
  //context
  // const presetContext = React.useContext(PresetContext);
  //const { month } = presetContext;
  // if (Number.isInteger(presetContext.month)) {
  //jsx when month is not year
  // console.log(month);
  return (
    <View style={styles.container}>
      <TouchableOpacity title={monthlist[activeindex - 1].month}>
        <Text style={styles.button}>{'<'}</Text>
      </TouchableOpacity>
      <TouchableOpacity title={monthlist[activeindex - 1].month}>
        <Text style={styles.button}>{monthlist[activeindex - 1].month}</Text>
      </TouchableOpacity>
      <TouchableOpacity title={monthlist[activeindex].month}>
        <Text style={styles.activeindex}>{monthlist[activeindex].month}</Text>
      </TouchableOpacity>
      <TouchableOpacity title={monthlist[activeindex + 1].month}>
        <Text style={styles.button}>{monthlist[activeindex + 1].month}</Text>
      </TouchableOpacity>
      <TouchableOpacity title={monthlist[activeindex + 1].month}>
        <Text style={styles.button}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
  //} else {
  //jsx when month value is year
  //  return (
  //   <View>
  //     <Text>test</Text>
  //    </View>
  //  );
  /*   return (
      <View style={styles.container}>
        <TouchableOpacity title={'<'}>
          <Text style={styles.button}>{'<'}</Text>
        </TouchableOpacity>
        <TouchableOpacity title='month'>
          <Text style={styles.button}>test</Text>
        </TouchableOpacity>
        <TouchableOpacity title={month}>
          <Text style={styles.activeindex}>{month}</Text>
        </TouchableOpacity>
        <TouchableOpacity title='someothermonth'>
          <Text style={styles.button}>someothermonth</Text>
        </TouchableOpacity>
        <TouchableOpacity title='>'>
          <Text style={styles.button}>></Text>
        </TouchableOpacity>
      </View>
    ); */
  // }
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
