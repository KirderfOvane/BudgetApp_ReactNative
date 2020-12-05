import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function FirstRow({ col, selectPhase, setSelectPhase, setValue, setDescription }) {
  const setFields = () => {
    if (selectPhase === 'description') {
      setDescription(col);
      setSelectPhase('value');
    } else {
      setValue(col);
      setSelectPhase('');
    }
  };
  return (
    <TouchableOpacity onPress={setFields} style={styles.col}>
      <Text>{col}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  col: {
    borderWidth: 1,
    flex: 1,
    // fontSize: 10,
  },
});

export default FirstRow;
