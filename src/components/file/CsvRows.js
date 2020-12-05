import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
function CsvRows({ col, row }) {
  return (
    <View style={styles.col}>
      <Text>{row[col]}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  col: {
    borderWidth: 1,
    flex: 1,
    // fontSize: 10,
  },
});
{
  /* <button className=' CsvRows__item'>{row[col]}</button>; */
}
export default CsvRows;
