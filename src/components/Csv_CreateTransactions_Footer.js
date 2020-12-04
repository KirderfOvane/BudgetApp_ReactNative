import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import CsvContext from '../context/csv/csvContext';
import { theme } from '../constants';

const Csv_CreateTransactions_Footer = ({ clickAdd, setClickAdd }) => {
  // context
  const csvContext = React.useContext(CsvContext);
  const { submitCsvItems, clearCsv } = csvContext;
  // logic

  const onAddToBudgetClick = () => {
    setClickAdd(true);
    submitCsvItems('step1');
  };

  const onCancel = () => {
    submitCsvItems('');
    clearCsv();
  };

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        testID='register-submit-button'
        placeholder='watwat'
        onPress={onAddToBudgetClick}
        title='Register'
      >
        <Text style={styles.add__btn_text}>ADD TO BUDGET</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelbutton}
        testID='register-submit-button'
        placeholder='watwat'
        onPress={onCancel}
        title='Register'
      >
        <Text style={styles.cancelbuttontext}>Cancel</Text>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  add__btn_text: {
    color: theme.colors.light,
    fontWeight: theme.fonts.weight.semibold,
    fontSize: 20,
  },
  button: {
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: theme.fonts.weight.bold,
    fontSize: 25,
    fontFamily: theme.fonts.family.main,
    color: theme.colors.light,
    backgroundColor: theme.colors.dark,
    paddingVertical: 10,
    marginTop: 15,
    marginHorizontal: 15,
    borderWidth: 2,
    borderColor: theme.colors.gray,
    borderStyle: 'solid',
    borderRadius: 8,
    overflow: 'hidden',
  },
  cancelbutton: {
    marginTop: 10,
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: theme.fonts.weight.bold,
    fontSize: 25,
    fontFamily: theme.fonts.family.main,
    color: theme.colors.light,
    backgroundColor: theme.colors.light,
    paddingVertical: 10,
    marginTop: 15,
    marginHorizontal: 15,
    borderWidth: 2,
    borderColor: theme.colors.gray,
    borderStyle: 'solid',
    borderRadius: 8,
    overflow: 'hidden',
  },
  cancelbuttontext: {
    color: theme.colors.gray,
    fontWeight: theme.fonts.weight.semibold,
    fontSize: 20,
  },
});
export default Csv_CreateTransactions_Footer;
