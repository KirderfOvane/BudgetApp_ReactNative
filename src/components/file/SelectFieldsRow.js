import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CsvRows from './CsvRows';
import FirstRow from './FirstRow';

const SelectFieldsRow = ({ presetCount, header, rowItem, setSelectPhase, selectPhase, setDescription, setValue }) => {
  const { row } = rowItem;

  return (
    <View style={styles.table}>
      {header
        ? Object.keys(row).map((col) => (
            <FirstRow
              col={col}
              selectPhase={selectPhase}
              setValue={setValue}
              setDescription={setDescription}
              setSelectPhase={setSelectPhase}
            />
          ))
        : Object.keys(row).map((col) => <CsvRows col={col} row={row} />)}
    </View>
  );
};
const styles = StyleSheet.create({
  table: {
    flexDirection: 'row',
    height: 30,
    width: 600,
    overflow: 'hidden',
  },
});
export default SelectFieldsRow;
