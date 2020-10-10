import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { withNavigation } from 'react-navigation';
import PresetContext from '../context/preset/presetContext';
import { theme } from '../constants';

const CSV_DocumentPicker = () => {
  //context presets
  const { uploadCSV } = React.useContext(PresetContext);

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
      const formData = new FormData();
      formData.append('file', file, file.name);
      uploadCSV(formData);
    }
  }, [file]);

  // jsx
  return (
    <TouchableOpacity onPress={_pickDocument} style={styles.container}>
      <Text>Upload CSV-file</Text>
    </TouchableOpacity>
  );
};

// styling
const styles = StyleSheet.create({
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
});

export default withNavigation(CSV_DocumentPicker);
