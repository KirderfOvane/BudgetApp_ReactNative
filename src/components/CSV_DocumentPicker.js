import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
//import { DocumentPicker, ImagePicker } from 'expo';
import * as DocumentPicker from 'expo-document-picker';
import { withNavigation } from 'react-navigation';
import PresetContext from '../context/preset/presetContext';
import { theme } from '../constants';
import AlertContext from '../context/alert/alertContext';

const CSV_DocumentPicker = () => {
  // context alert
  const alertContext = React.useContext(AlertContext);
  const { setAlert } = alertContext;
  //context

  const { uploadCSV, csvpresets, filterPresets, contacterror, clearContactError } = React.useContext(PresetContext);

  // state
  const [file, setFile] = React.useState(null);

  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    //alert(result.uri);
    //console.log(result);
    result && result.type === 'success' && setFile(result);
    // console.log(presetContext.month);
    //console.log('pickdocument ran');
    // console.log(result);
  };
  React.useEffect(() => {
    if (file) {
      // console.log(file);
      // console.log('useEffect file ran');
      const formData = new FormData();
      formData.append('file', file, file.name);
      uploadCSV(formData);
    }
  }, [file]);

  //csvpresets && console.log(csvpresets.map((preset) => preset.name));
  return (
    <TouchableOpacity onPress={_pickDocument} style={styles.container}>
      <Text>Upload CSV-file</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
});

export default withNavigation(CSV_DocumentPicker);
