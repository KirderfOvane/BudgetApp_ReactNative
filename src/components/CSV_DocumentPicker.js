import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
//import { DocumentPicker, ImagePicker } from 'expo';
import * as DocumentPicker from 'expo-document-picker';
import { withNavigation } from 'react-navigation';
import PresetContext from '../context/preset/presetContext';

const CSV_DocumentPicker = () => {
  //context
  const { uploadCSV, csvpresets, filterPresets } = React.useContext(PresetContext);

  // state
  const [file, setFile] = React.useState(null);

  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    //alert(result.uri);
    setFile(result);
    // console.log(presetContext.month);

    // console.log(result);
  };
  React.useEffect(() => {
    if (file) {
      console.log('useEffect ran');
      const formData = new FormData();
      formData.append('file', file, file.name);
      uploadCSV(formData);
    }
  }, [file]);

  //csvpresets && console.log(csvpresets.map((preset) => preset.name));
  return (
    <View style={styles.container}>
      <Button title='Select Document' onPress={_pickDocument} />
      {/*   {file !== null && <Text>{file.name}</Text>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withNavigation(CSV_DocumentPicker);
