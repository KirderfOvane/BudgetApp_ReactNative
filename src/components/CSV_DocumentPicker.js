import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { withNavigation } from 'react-navigation';
import CsvContext from '../context/csv/csvContext';
import AlertContext from '../context/alert/alertContext';

import { theme } from '../constants';

const CSV_DocumentPicker = ({ selectedFileFormat, setSelectedFileFormat, setUploadFileClicked }) => {
  //context csv
  const { uploadCSV, contacterror, clearContactError } = React.useContext(CsvContext);
  const { setAlert } = React.useContext(AlertContext);
  // state
  const [file, setFile] = React.useState(null);

  // logic
  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    result && result.type === 'success' && setFile(result);
  };

  const onCancel = () => {
    setUploadFileClicked('');
  };

  // useeffect
  React.useEffect(() => {
    if (file) {
      if (selectedFileFormat !== 'RFC4180') {
        const formData = new FormData();
        formData.append(selectedFileFormat, file, file.name);
        uploadCSV(formData);

        setFile(null);
        setUploadFileClicked('');
      } else {
        // When file is RFC4180
        setUploadFileClicked('selectfields');
        const formData = new FormData();
        formData.append(selectedFileFormat, file, file.name);
        uploadCSV(formData);
        setFile(null);
        console.log('RFC4180 TIME');
      }
    }
  }, [file]);

  React.useEffect(() => {
    if (contacterror) {
      //setUploadFileClicked('selectformat');
      console.log('ERRORRORORORORO');
      setAlert(contacterror, 'danger');
    }
  }, [contacterror]);

  // jsx
  return (
    <View style={styles.buttonView}>
      <TouchableOpacity style={styles.button} testID='register-submit-button' placeholder='watwat' onPress={_pickDocument} title='Register'>
        <Text style={styles.registerbtntext}>Upload</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
  },
  button: {
    marginTop: 25,
    textAlign: 'center',
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
  cancelbutton: {
    marginTop: 10,
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: theme.fonts.weight.bold,
    fontSize: 25,
    fontFamily: theme.fonts.family.main,
    color: theme.colors.dark,
    backgroundColor: theme.colors.light,
    paddingVertical: 10,
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
  registerbtntext: {
    color: theme.colors.light,
    fontWeight: theme.fonts.weight.semibold,
    fontSize: 20,
  },
});

export default withNavigation(CSV_DocumentPicker);
