import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import PresetPositiveFilterScreen from './PresetPositiveFilterScreen';

const MonthItemScreen = ({ name, monthlist, index }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity title={monthlist[index - 1].month}>
        <Text>{monthlist[index - 1].month}</Text>
      </TouchableOpacity>
      <TouchableOpacity title={name}>
        <Text>{name}</Text>
      </TouchableOpacity>
      <TouchableOpacity title={monthlist[index + 1].month}>
        <Text>{monthlist[index + 1].month}</Text>
      </TouchableOpacity>
      <PresetPositiveFilterScreen monthlist={monthlist} index={index} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 414,
    height: 725,
    backgroundColor: 'gray',
  },
  containerflex: {
    flex: 1,
  },
});

export default MonthItemScreen;
