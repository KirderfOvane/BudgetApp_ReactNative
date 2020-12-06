import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView } from 'react-native';
import { theme } from '../../constants';
import SelectFieldsRow from './SelectFieldsRow';
import CsvContext from '../../context/csv/csvContext';
import AlertContext from '../../context/alert/alertContext';
import Alerts from '../Alerts';

let FieldsPicker = null;

const SelectFields = ({ csvpresets, setUploadFileClicked }) => {
  //context
  const { updateCsvPresets } = React.useContext(CsvContext);
  const { setAlert } = React.useContext(AlertContext);
  // State
  const [description, setDescription] = React.useState('');
  const [value, setValue] = React.useState('');
  const [selectPhase, setSelectPhase] = React.useState('description');
  const [pickerActive, setPickerActive] = React.useState(false);
  const [selectedFileFormat, setSelectedFileFormat] = React.useState(Object.keys(csvpresets[0].row)[0]);
  const [fileformat, setFileformat] = React.useState(Object.keys(csvpresets[0].row)[0]);
  const [pickerItems, setPickerItems] = React.useState(Object.keys(csvpresets[0].row));
  //useRef
  const fieldsPickerRef = React.useRef(null);

  const onFileFormatPress = (e) => {
    if (FieldsPicker === null) {
      FieldsPicker = require('./FieldsPicker').default;
    }

    setPickerActive(!pickerActive);
  };

  const changePickerFileFormatSelect = (value) => {
    setSelectedFileFormat(value);
  };

  // submitbutton
  const onSubmit = () => {
    if (selectPhase === 'description') {
      // setDescription to selectedFileFormat
      setDescription(selectedFileFormat);
      // setSelectPhase to 'value'
      setSelectPhase('value');
      // remove selectedFileFormat from pickerItems with setPickerItems
      const newPickerList = Object.keys(csvpresets[0].row).filter((item) => selectedFileFormat !== item);
      setPickerItems(newPickerList);
      setPickerActive(true);
    } else {
      // setValue to selectedFileFormat
      setValue(selectedFileFormat);

      try {
        csvpresets.map((preset) => {
          if (isNaN(preset.row[selectedFileFormat])) {
            setSelectPhase('value');
            setValue('');
            throw new Error('The number fields did not contain valid numbers');
          } else {
            // create an object with id,name and number
            updateCsvPresets({
              id: preset.id,
              name: preset.row[description],
              number: parseFloat(preset.row[selectedFileFormat]),
            });
          }
        });

        setUploadFileClicked('');
      } catch (err) {
        setAlert('Not valid numbers field', 'danger');
        console.log(err);
      }
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.titlerow}>
        <Text style={styles.title}>Select Fields</Text>
      </View>
      <View style={{ marginVertical: 15 }}>
        <Text style={styles.paragraph}>
          {selectPhase === 'description' ? 'Please select the description field' : 'Please select the value field'}
        </Text>
      </View>
      <Alerts />
      {/* FileFormatPicker */}
      {pickerActive ? (
        <View style={styles.picker}>
          <FieldsPicker
            selectedFileFormat={selectedFileFormat}
            changePickerFileFormatSelect={changePickerFileFormatSelect}
            fieldsPickerRef={fieldsPickerRef}
            onFileFormatPress={onFileFormatPress}
            pickerItems={pickerItems}
          />
        </View>
      ) : (
        <View style={styles.picker}>
          <TouchableOpacity style={styles.pickerbtnFlex} onPress={onFileFormatPress}>
            <Text style={styles.pickerbtn}>{selectedFileFormat}</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* SubmitButton */}
      {!pickerActive && (
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} testID='register-submit-button' placeholder='watwat' onPress={onSubmit} title='Register'>
            <Text style={styles.registerbtntext}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  col: {
    borderWidth: 1,
    flex: 1,
    height: 60,
    width: 120,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // fontSize: 10,
  },
  table: {
    flexDirection: 'row',

    overflow: 'hidden',
  },
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
    marginTop: 35,
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

export default SelectFields;
