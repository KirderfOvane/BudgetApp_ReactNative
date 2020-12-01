import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { withNavigation } from 'react-navigation';
import CsvContext from '../context/csv/csvContext';
import { theme } from '../constants';

const CSV_DocumentPicker = ({ selectedFileFormat, setSelectedFileFormat, setUploadFileClicked }) => {
  //context csv
  const csvContext = React.useContext(CsvContext);
  //const { uploadCSV } = csvContext;

  // state
  const [file, setFile] = React.useState(null);

  // logic
  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    result && result.type === 'success' && setFile(result);
  };

  // useeffect
  React.useEffect(() => {
    if (file) {
      // setUploadFileClicked(true);
      const formData = new FormData();
      formData.append(selectedFileFormat, file, file.name);
      csvContext.uploadCSV(formData);
      setFile(null);
    }
  }, [file]);

  // jsx
  return (
    <View style={styles.buttonView}>
      <TouchableOpacity style={styles.button} testID='register-submit-button' placeholder='watwat' onPress={_pickDocument} title='Register'>
        <Text style={styles.registerbtntext}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default withNavigation(CSV_DocumentPicker);
