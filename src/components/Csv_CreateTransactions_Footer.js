import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import PresetContext from '../context/preset/presetContext';
import { theme } from '../constants';

const Csv_CreateTransactions_Footer = ({ setPrompt, setValidCsv }) => {
  // context
  const { csvpresets, submitCsvItems } = React.useContext(PresetContext);
  // logic

  const onAddToBudgetClick = () => {
    submitCsvItems('step1');
  };

  // useEffect
  React.useEffect(() => {
    //check for valid csv to add

    //const tests = csvpresets.filter((item) => (item.category && item.markdelete === false ? item : null));
    //const tests = csvpresets.filter((item) => (item.category ? item : null));
    console.log(csvpresets);
    setValidCsv(isValidCsv);
    //console.log(csvpresets.length);
    // if no invalid csv items submit,otherwise setPrompt to true
    if (isValidCsv.length !== 0 && isValidCsv.length !== csvpresets.length) {
      setPrompt(true);
    } else {
      submitCsvItems('submit');
    }

    if (csvpresets.length <= 1) {
      clearCsv();
      setPrompt(false);
    }
    //eslint-disable-next-line
  }, [csvpresets]); //breaks if you add clearCsv and submitCsvItems

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
