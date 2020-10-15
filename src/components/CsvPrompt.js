import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CsvContext from '../context/csv/csvContext';
import { theme } from '../constants';

const CsvPrompt = ({ setPrompt, validCsv, csvpresets }) => {
  //context
  const { submitCsvItems } = React.useContext(CsvContext);

  const onAdd = () => {
    console.log('add');
  };
  const onBack = () => {
    submitCsvItems('');
    setPrompt(false);
  };
  return (
    <>
      <View style={{ flexDirection: 'row', marginTop: 25, alignSelf: 'center' }}>
        <Text style={styles.strongtext}>{csvpresets.length - validCsv.length}</Text>
        <Text style={styles.text}>of </Text>
        <Text style={styles.strongtext}>{csvpresets.length}</Text>
      </View>
      <Text style={styles.text}> transactions do not have a category selected</Text>

      <View>
        <TouchableOpacity style={styles.addbtn} onPress={onAdd}>
          <Text style={styles.text}>Add the </Text>
          <Text style={[styles.strongtext, styles.strongtextcolor]}>{validCsv.length}</Text>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <Text style={styles.text}>{validCsv.length > 1 ? 'transactions ' : 'transaction '}</Text>
            <Text style={styles.text}>that has a</Text>
          </View>
          <Text style={styles.text}>category specified</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backbtn} onPress={onBack}>
          <Text style={styles.text}> Go back</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    textAlign: 'center',
  },
  strongtext: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: theme.fonts.weight.bold,
  },
  strongtextcolor: {
    color: theme.colors.success,
  },
  addbtn: {
    padding: 25,
    borderWidth: 2,
    borderRadius: 12,
    margin: 25,
    backgroundColor: 'white',
  },
  backbtn: {
    padding: 15,
    borderWidth: 2,
    marginHorizontal: 25,
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: theme.colors.light,
  },
});
export default CsvPrompt;
