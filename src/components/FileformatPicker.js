import React from 'react';
import { Picker, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { icons, theme } from '../constants';
const FileformatPicker = ({ selectedFileFormat, changePickerFileFormatSelect, onFileFormatPress }) => {
  // const [selected, setSelected] = React.useState('Select Category');
  //console.log(selected);
  //React.useEffect(()=>{}[])
  return (
    <View style={styles.containerwhenpickeractive}>
      <View style={styles.picker}>
        <Picker onValueChange={changePickerFileFormatSelect} selectedValue={selectedFileFormat}>
          <Picker.Item label='Select File Format' value='Select File Format'></Picker.Item>
          <Picker.Item label='RFC4180' value='RFC4180'></Picker.Item>
          <Picker.Item label='OFX' value='ofx'></Picker.Item>
          <Picker.Item label='Nordea' value='nordea'></Picker.Item>
          <Picker.Item label='Swedbank' value='swedbank'></Picker.Item>
          <Picker.Item label='Handelsbanken' value='handelsbanken'></Picker.Item>
        </Picker>
        <TouchableOpacity onPress={onFileFormatPress}>
          <Text style={styles.selectBtnInPicker}>Select</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  containerwhenpickeractive: {
    marginHorizontal: 25,
    marginTop: 0,
    marginBottom: 180,
  },
  picker: {
    //  flex: 1,
    minHeight: 75,
    //  maxHeight: 100,
    // paddingLeft: 15,
    paddingTop: 15,
    //borderWidth: 1,
    //  borderColor: 'green',
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
});
export default FileformatPicker;
