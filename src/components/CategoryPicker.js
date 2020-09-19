import React from 'react';
import { Picker, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { icons, theme } from '../constants';
const CategoryPicker = ({ selected, selectedCategory, localPreset, setLocalPreset, onCategoryPress }) => {
  // const [selected, setSelected] = React.useState('Select Category');
  //console.log(selected);
  //React.useEffect(()=>{}[])
  return (
    <View style={styles.containerwhenpickeractive}>
      <View style={styles.picker}>
        <Picker onValueChange={selectedCategory} selectedValue={selected}>
          <Picker.Item label='Select Category' value='Select Category'></Picker.Item>
          <Picker.Item label='Commute' value='Commute'></Picker.Item>
          <Picker.Item label='Car' value='Car'></Picker.Item>
          <Picker.Item label='Travel' value='Travel'></Picker.Item>
          <Picker.Item label='Food' value='Food'></Picker.Item>
          <Picker.Item label='Housing' value='Housing'></Picker.Item>
          <Picker.Item label='Insurance' value='Insurance'></Picker.Item>
          <Picker.Item label='Child benefit' value='Child benefit'></Picker.Item>
          <Picker.Item label='Childcare' value='Childcare'></Picker.Item>
          <Picker.Item label='Salary' value='Salary'></Picker.Item>
          <Picker.Item label='Sport Activities' value='Sport Activities'></Picker.Item>
          <Picker.Item label='Clothing' value='Clothing'></Picker.Item>
          <Picker.Item label='Entertainment Electronics' value='Entertainment Electronics'></Picker.Item>
          <Picker.Item label='Entertainment Subscriptions' value='Entertainment Subscriptions'></Picker.Item>
          <Picker.Item label='Entertainment Hobby' value='Entertainment Hobby'></Picker.Item>
          <Picker.Item label='Phone' value='Phone'></Picker.Item>
          <Picker.Item label='Internet' value='Internet'></Picker.Item>
          <Picker.Item label='Computer' value='Computer'></Picker.Item>
          <Picker.Item label='Giving' value='Giving'></Picker.Item>
          <Picker.Item label='Student loan' value='Student loan'></Picker.Item>
          <Picker.Item label='Electrical bill' value='Electrical bill'></Picker.Item>
          <Picker.Item label='Reminderfees' value='Reminderfees'></Picker.Item>
          <Picker.Item label='Bank fee' value='Bank fee'></Picker.Item>
        </Picker>
        <TouchableOpacity onPress={onCategoryPress}>
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
    maxHeight: 100,
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
export default CategoryPicker;
