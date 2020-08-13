import React from 'react';
import { Picker } from 'react-native';

const CategoryPicker = ({ localPreset, setLocalPreset }) => {
  const [selected, setSelected] = React.useState('Select Category');
  const selectedCategory = (value) => {
    setSelected(value);
    setLocalPreset({ ...localPreset, category: value });
  };

  return (
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
  );
};

export default CategoryPicker;
