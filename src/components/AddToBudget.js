import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { theme } from '../constants';
import Alerts from '../components/Alerts';
import CsvContext from '../context/csv/csvContext';
import AlertContext from '../context/alert/alertContext';
import PresetContext from '../context/preset/presetContext';
//import CategoryPicker from './CategoryPicker';
import CheckBoxField from './CheckBoxField';
import ToggleSwitch from './ToggleSwitch';
import CSV_DocumentPicker from './CSV_DocumentPicker';
import Csv_CreateTransactions from './Csv_CreateTransactions';
import SelectFields from './file/SelectFields';

// Inline Requires
let CategoryPicker = null;
let FileformatPicker = null;

const AddToBudget = ({ month }) => {
  // context alert
  const alertContext = React.useContext(AlertContext);
  const { setAlert } = alertContext;

  // context csv
  const csvContext = React.useContext(CsvContext);
  const { csvpresets, fileerror, clearFileError } = csvContext;

  // context presets
  const presetContext = React.useContext(PresetContext);
  const {
    addPreset,
    year,
    getPresets,
    getMonthPiggySavings,
    calcCategoryByMonth,
    setPurchase,
    calcSum,
    calcMonthBalance,
    MonthSum,
    calcMonthSavings,
    getMonthSavings,
    calcMonthSum,
    filterOutNegativeNumsAndMonth,
    filterOutPositiveNumsAndMonth,
    addMonth,
  } = presetContext;

  // states
  const [localPreset, setLocalPreset] = React.useState({
    name: '',
    number: '',
    category: 'Select Category',
    type: 'overhead',
  });

  const changeName = (newName) => {
    setLocalPreset({ ...localPreset, name: newName });
  };
  const changeNumber = (newNumber) => {
    setLocalPreset({ ...localPreset, number: newNumber });
  };
  const [pickerButtonTitle, setPickerButtonTitle] = React.useState('Select Category');
  const [checkboxfieldActive, setCheckboxfieldActive] = React.useState(true);
  const [pickerActive, setPickerActive] = React.useState(false);
  const [income, setIncome] = React.useState(true);
  const [selected, setSelected] = React.useState('Select Category');
  const [uploadFileClicked, setUploadFileClicked] = React.useState('');
  const [fileformat, setFileformat] = React.useState('RFC4180');
  const [selectedFileFormat, setSelectedFileFormat] = React.useState('RFC4180');
  //useRef
  const pickerRef = React.useRef(null);

  //logic

  const onCategoryPress = (e) => {
    if (localPreset.category !== 'Select Category') {
      setPickerButtonTitle(localPreset.category); //<--
    }

    if (CategoryPicker === null) {
      CategoryPicker = require('./CategoryPicker').default;
    }

    setPickerActive(!pickerActive);
  };

  const onFileFormatPress = (e) => {
    if (fileformat !== 'RFC4180') {
      setFileformat(fileformat); //<--
    }

    if (FileformatPicker === null) {
      FileformatPicker = require('./FileformatPicker').default;
    }

    setPickerActive(!pickerActive);
  };

  // change value in picker
  const selectedCategory = (value) => {
    setSelected(value);
    setLocalPreset({ ...localPreset, category: value });
  };

  const changePickerFileFormatSelect = (value) => {
    // convert all but RFC4180 to lowercase to be compatible with backend
    if (value !== 'RFC4180') {
      setSelectedFileFormat(value.toLowerCase());
    } else {
      setSelectedFileFormat(value);
    }
  };

  //submit
  const onSubmit = (e) => {
    // name and number validation
    if (localPreset.name === '' || localPreset.number.length === 0) {
      setCheckboxfieldActive(false);
      setTimeout(function () {
        setCheckboxfieldActive(true);
      }, 5000);
      setAlert('Name and Number are required fields', 'danger');
      return;
    }

    // Category validation
    if (localPreset.category === 'Select Category') {
      setCheckboxfieldActive(false);
      setTimeout(function () {
        setCheckboxfieldActive(true);
      }, 5000);
      setAlert('Please select a category', 'danger');
      return;
    }

    // validation passed
    addPreset({
      name: localPreset.name,
      number: income ? parseInt(localPreset.number) : parseInt(localPreset.number) * -1,
      month: month,
      year,
      category: localPreset.category,
      type: localPreset.type,
      piggybank: [{ month: month, year, savedAmount: '' }],
    });

    // Reset Inputs
    /*   setLocalPreset({
      name: '',
      number: '',
      category: '',
      type: 'overhead',
    }); */
    localPreset.category && selectedCategory('Select Category');
    //console.log(localPreset);
    setLocalPreset({ ...localPreset, name: '' });
    //setLocalPreset({ ...localPreset, number: '' });
    //setLocalPreset({ ...localPreset, category: '' });
    // setLocalPreset({ ...localPreset, type: 'overhead' });
    // Alert Success
    setCheckboxfieldActive(false);
    setTimeout(function () {
      setCheckboxfieldActive(true);
    }, 5000);
    setAlert('Successfully added to budget!', 'success');
    // setAlert('Successfully added to budget!', 'success');
    //get presets
    getPresets();
    //activate recalc of _ALL_ context values
    addMonth(month);
    filterOutPositiveNumsAndMonth(month);
    filterOutNegativeNumsAndMonth(month);
    calcMonthSum(month);
    getMonthSavings(month);
    calcMonthSavings(month);
    MonthSum && calcMonthBalance();
    calcSum();
    setPurchase();
    calcCategoryByMonth(month);
    getMonthPiggySavings(month);
  };

  React.useEffect(() => {
    console.log('%TOOMANYRERENDERS%');
    if (fileerror) {
      //console.log(fileerror.length);
      setAlert(fileerror, 'danger');
      clearFileError();
      //console.log('bajskorv', fileerror);
    }
  }, [fileerror]);

  //jsx
  if (csvpresets && uploadFileClicked === '') {
    //console.log('csvpresets found!', uploadFileClicked);
    return (
      <View style={[styles.card, { paddingHorizontal: 0, marginHorizontal: 4 }]}>
        {/* Title */}
        <View style={[styles.titlerow, styles.dropshadow]}>
          <Text style={[styles.title]}>Select Categories</Text>
        </View>
        {/* Csv */}
        <Csv_CreateTransactions onSubmit={onSubmit} />
      </View>
    );
  }

  if (csvpresets && uploadFileClicked === 'selectfields') {
    return (
      <>
        <SelectFields csvpresets={csvpresets} setUploadFileClicked={setUploadFileClicked} />
      </>
    );
  }

  if (uploadFileClicked === 'selectformat' && !csvpresets) {
    return (
      <View style={styles.card}>
        <View style={styles.titlerow}>
          <Text style={styles.title}>Select file format</Text>
        </View>
        <View style={{ marginVertical: 15 }}>
          <Text style={styles.paragraph}>For a default csv-formatting, choose RFC4180</Text>
        </View>
        {/* FileFormatPicker */}
        {pickerActive ? (
          <View style={styles.picker}>
            <FileformatPicker
              selectedFileFormat={selectedFileFormat}
              changePickerFileFormatSelect={changePickerFileFormatSelect}
              pickerRef={pickerRef}
              onFileFormatPress={onFileFormatPress}
            />
            {/* <TouchableOpacity onPress={onPickerBtnPress}>
              <Text style={styles.selectBtnInPicker}>Select</Text>
            </TouchableOpacity> */}
          </View>
        ) : (
          <View style={styles.picker}>
            <TouchableOpacity style={styles.pickerbtnFlex} onPress={onFileFormatPress}>
              <Text style={styles.pickerbtn}>{selectedFileFormat}</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Uploadbutton */}
        {!pickerActive && (
          <CSV_DocumentPicker
            setUploadFileClicked={setUploadFileClicked}
            selectedFileFormat={selectedFileFormat}
            setSelectedFileFormat={setSelectedFileFormat}
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.card}>
      {/* Title */}
      <View style={styles.titlerow}>
        <Text style={styles.title}>ADD TO BUDGET</Text>
      </View>

      {/* Alerts */}
      <Alerts />

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder='Name'
        onChangeText={changeName}
        name='name'
        value={localPreset.name}
        autoCapitalize='none'
        maxLength={25}
      />
      <TextInput
        style={[styles.input, { color: income ? theme.colors.success : theme.colors.danger }]}
        placeholder='number'
        keyboardType='numeric'
        onChangeText={changeNumber}
        name='number'
        value={localPreset.number.toString()}
        label='number'
        autoCapitalize='none'
        autoCorrect={false}
        maxLength={12}
      />
      {/* CategoryPicker */}
      {pickerActive ? (
        <View style={styles.picker}>
          <CategoryPicker
            selected={selected}
            selectedCategory={selectedCategory}
            localPreset={localPreset}
            setLocalPreset={setLocalPreset}
            pickerRef={pickerRef}
            onCategoryPress={onCategoryPress}
          />
          {/* <TouchableOpacity onPress={onPickerBtnPress}>
              <Text style={styles.selectBtnInPicker}>Select</Text>
            </TouchableOpacity> */}
        </View>
      ) : (
        <View style={styles.picker}>
          <TouchableOpacity style={styles.pickerbtnFlex} onPress={onCategoryPress}>
            <Text style={styles.pickerbtn}>{pickerButtonTitle}</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Lower Half */}
      {!pickerActive && checkboxfieldActive && (
        <View style={[{ flex: 5 }, { flexDirection: 'row' }]}>
          <CheckBoxField localPreset={localPreset} setLocalPreset={setLocalPreset} />
          <View style={{ marginVertical: 25 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.incomeexpensetoggle, { color: income ? theme.colors.success : theme.colors.gray }]}>Income </Text>
              <Text style={styles.incomeexpensetoggle}> / </Text>
              <Text style={[styles.incomeexpensetoggle, { color: income ? theme.colors.gray : theme.colors.danger }]}> Expense</Text>
            </View>
            <View style={{ alignSelf: 'center', marginTop: 10 }}>
              <ToggleSwitch
                isOn={!income}
                onColor={theme.colors.danger}
                offColor={theme.colors.success}
                size='large'
                onToggle={() => setIncome(!income)}
              />
            </View>
            {/* Upload File */}
            {localPreset.type === 'overhead' && (
              <TouchableOpacity onPress={() => setUploadFileClicked('selectformat')} style={styles.container}>
                <Text>Upload file</Text>
              </TouchableOpacity>
            )}

            {/*  <CSV_DocumentPicker /> */}
          </View>
        </View>
      )}
      {/* SubmitButton */}
      {!pickerActive && (
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} testID='register-submit-button' placeholder='watwat' onPress={onSubmit} title='Register'>
            <Text style={styles.registerbtntext}>ADD TO BUDGET</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* end */}
    </View>
  );
};
const styles = StyleSheet.create({
  dropshadow: {
    overflow: 'visible',
    backgroundColor: theme.colors.light,
    shadowOffset: { width: 0, height: 10 },
    shadowColor: 'gray',
    shadowOpacity: 0.1,
    paddingBottom: 5,
    borderColor: theme.colors.black,
    shadowRadius: 5,
  },
  picker: {
    //  flex: 1,
    minHeight: 75,
    maxHeight: 100,
    // paddingLeft: 15,
    paddingTop: 15,
    // borderWidth: 1,
    //  borderColor: 'green',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  incomeexpensetoggle: {
    fontSize: 19,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.gray,
  },
  card: {
    flex: 1,
    backgroundColor: theme.colors.light,
    marginHorizontal: 25,
    marginTop: 25,
    marginBottom: 45,
    shadowOffset: { width: 0, height: 10 },
    shadowColor: '#2b2b2b',
    shadowOpacity: 1.0,
    borderWidth: 1,
    borderColor: theme.colors.black,
    padding: 20,
    shadowRadius: 5,
    borderRadius: 16,
    zIndex: 1000,
  },
  titlerow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  pickerbtnFlex: {
    flex: 1,
    borderBottomWidth: 2,
    // maxHeight: 100,
    paddingTop: 5,
    borderColor: theme.colors.gray,
    // borderWidth: 2,
  },
  pickerbtn: {
    textAlign: 'left',
    fontSize: 22,
    color: theme.colors.gray,
    paddingLeft: 15,
    paddingTop: 15,
    // maxHeight: 100,
  },
  selectBtnInPicker: {
    textAlign: 'center',
    fontSize: 22,
    color: theme.colors.dark,
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: 150,
    borderWidth: 1,
    borderColor: theme.colors.dark,
    alignSelf: 'center',
  },

  title: {
    flex: 1,
    paddingLeft: 15,
    fontSize: theme.sizes.h2,
    fontWeight: theme.fonts.weight.semibold,
    textAlign: 'center',
  },
  input: {
    // flex: 1,
    textAlign: 'left',
    paddingLeft: 15,
    paddingTop: 15,
    maxHeight: 100,
    minHeight: 75,
    fontSize: 22,
    color: theme.colors.dark,

    borderBottomWidth: 2,
    borderColor: theme.colors.gray,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  buttonView: {
    flex: 1,
  },
  button: {
    //marginTop: 85,
    textAlign: 'center',
    //    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: theme.fonts.weight.bold,
    fontSize: 25,
    fontFamily: theme.fonts.family.main,
    color: theme.colors.light,
    backgroundColor: theme.colors.dark,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: theme.colors.gray,
    borderStyle: 'solid',
    borderRadius: 8,
    overflow: 'hidden',
  },
  registerbtntext: {
    color: theme.colors.light,
    fontWeight: theme.fonts.weight.semibold,
    fontSize: 20,
  },
  container: {
    paddingVertical: 15,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: theme.colors.dark,
    borderRadius: 12,
    backgroundColor: theme.colors.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    fontSize: theme.sizes.base,
  },
});
export default AddToBudget;
