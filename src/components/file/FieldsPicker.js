import React from 'react';
import { Picker, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { icons, theme } from '../../constants';
const FieldsPicker = ({ pickerItems, selectedFileFormat, changePickerFileFormatSelect, onFileFormatPress }) => {
  return (
    <View style={styles.containerwhenpickeractive}>
      <View style={styles.picker}>
        <Picker onValueChange={changePickerFileFormatSelect} selectedValue={selectedFileFormat}>
          {pickerItems.map((item) => (
            <Picker.Item label={item} value={item} key={item}></Picker.Item>
          ))}
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
export default FieldsPicker;
