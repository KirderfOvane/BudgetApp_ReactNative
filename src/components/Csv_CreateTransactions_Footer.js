import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import PresetContext from '../context/preset/presetContext';
import { theme } from '../constants';

const Csv_CreateTransactions_Footer = () => {
  // context
  const { submitCsvItems } = React.useContext(PresetContext);
  // logic

  const onAddToBudgetClick = () => {
    submitCsvItems('step1');
  };

  return (
    <TouchableOpacity
      style={styles.button}
      testID='register-submit-button'
      placeholder='watwat'
      onPress={onAddToBudgetClick}
      title='Register'
    >
      <Text style={styles.add__btn_text}>ADD TO BUDGET</Text>
    </TouchableOpacity>
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
});
export default Csv_CreateTransactions_Footer;
