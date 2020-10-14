import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CsvPrompt = ({ setPrompt, validCsv, csvpresets }) => {
  // console.log('csvpromptreached');
  //console.log(validCsv);
  const onAdd = () => {
    console.log('add');
  };
  const onBack = () => {
    setPrompt(false);
  };
  return (
    <View>
      <Text>
        {csvpresets.length - validCsv.length} of {csvpresets.length} transactions does not have a category selected
      </Text>
      <View>
        <TouchableOpacity style={styles.addbtn} onPress={onAdd}>
          <Text>Add the {validCsv.length} transactions that has a category specified</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backbtn} onPress={onBack}>
          <Text> Go back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  addbtn: {},
  backbtn: {},
});
export default CsvPrompt;
