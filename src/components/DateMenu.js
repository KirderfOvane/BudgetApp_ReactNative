import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../constants';

const DateMenu = ({ monthlist, activeindex }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.button}>{'<'}</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.button}> {monthlist[activeindex - 1].month}</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.activeindex}>{monthlist[activeindex].month}</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        {isNaN(monthlist[activeindex + 1].month) ? (
          <Text style={styles.button}> {monthlist[activeindex + 1].month}</Text>
        ) : (
          <Text style={styles.button}> {parseInt(monthlist[activeindex + 1].month) + 1}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity title={monthlist[activeindex + 1].month}>
        <Text style={styles.button}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
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
