import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { icons, theme } from '../constants';
import PresetContext from '../context/preset/presetContext';
import PresetItemName from './PresetItemName';
import PresetItemNumber from './PresetItemNumber';

// Inline Requires
let CategoryPicker = null;
const PresetItem = ({ preset, setMonthList }) => {
  const presetContext = React.useContext(PresetContext);
  const { setEdit, sendEdit, edit, buildFlatListData, cancelEdit, filterPresets, clearFilter } = presetContext;
  // State
  const [InputMode, toggleInputMode] = React.useState('');
  const [localPreset, setLocalPreset] = React.useState({
    _id: preset.item._id,
    name: preset.item.name,
    number: preset.item.number,
    category: preset.item.category,
    type: preset.item.type,
    piggybank: preset.item.piggybank,
  });
  const [income, setIncome] = React.useState(true);
  const [pickerActive, setPickerActive] = React.useState(false);
  const [pickerButtonTitle, setPickerButtonTitle] = React.useState('Select Category');
  const [selected, setSelected] = React.useState('Select Category');
  // Logic

  // Activate editmode
  const onDeletePress = (e) => {
    console.log('delete');
    console.log(localPreset._id);
  };
  const onCategoryPress = (e) => {
    if (localPreset.category !== 'Select Category') {
      setPickerButtonTitle(localPreset.category); //<--
    }

    if (CategoryPicker === null) {
      CategoryPicker = require('./CategoryPicker').default;
    }

    setPickerActive(!pickerActive);
  };

  // console.log(pickerActive);
  const onNumberPress = (e) => {
    toggleInputMode('number');
    // localPreset.number > 0 ? filterPresets('positive') : filterPresets('negative');
  };
  const onNamePress = (e) => {
    toggleInputMode('name');
  };

  // change value in picker
  const selectedCategory = (value) => {
    setSelected(value);
    setLocalPreset({ ...localPreset, category: value });
  };

  // Deactivate editmode
  const onBlur = () => {
    //filterPresets(null);
    toggleInputMode('finished');
  };

  // editmode
  const changeNumber = (newNumber) => {
    setLocalPreset({ ...localPreset, number: newNumber });
  };
  const changeName = (newName) => {
    setLocalPreset({ ...localPreset, name: newName });
  };

  // init useRef
  const inputNumRef = React.useRef();
  const inputNameRef = React.useRef();

  // useEffect
  React.useEffect(() => {
    // update database when edit is finished
    if (InputMode === 'finished') {
      sendEdit(localPreset);
      toggleInputMode('');
    }

    InputMode === 'name' && inputNameRef.current.focus();
    InputMode === 'number' && inputNumRef.current.focus();
  }, [InputMode]);

  // jsx
  return (
    <>
      {pickerActive ? (
        /*  <View style={styles.containerwhenpickeractive}>
          <View style={styles.picker}> */
        <CategoryPicker
          selected={selected}
          selectedCategory={selectedCategory}
          localPreset={localPreset}
          setLocalPreset={setLocalPreset}
          onCategoryPress={onCategoryPress}
        />
      ) : (
        /*  <TouchableOpacity onPress={onCategoryPress}>
              <Text style={styles.selectBtnInPicker}>Select</Text>
            </TouchableOpacity>
          </View>
        </View> */
        <View style={pickerActive ? styles.hide : styles.container}>
          <PresetItemName
            onNamePress={onNamePress}
            InputMode={InputMode}
            inputNameRef={inputNameRef}
            changeName={changeName}
            localPreset={localPreset}
            onBlur={onBlur}
          />

          <PresetItemNumber
            onNumberPress={onNumberPress}
            InputMode={InputMode}
            inputNumRef={inputNumRef}
            changeNumber={changeNumber}
            localPreset={localPreset}
            onBlur={onBlur}
            income={income}
          />

          <TouchableOpacity style={{ paddingTop: 10 }} onPress={onCategoryPress}>
            <Text style={styles.categoryIcon}>{icons.getIcon(localPreset.category.toLowerCase())}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={onDeletePress}>
            <Text>{icons.getIcon('delete')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

// css
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginVertical: 5,
    marginHorizontal: 10,
    borderBottomColor: theme.colors.light,
    borderBottomWidth: 3,
    paddingHorizontal: 10,
  },
  containerwhenpickeractive: {
    marginHorizontal: 25,
    marginTop: 0,
    marginBottom: 180,
  },
  hide: {
    display: 'none',
  },

  positivenumber: {
    color: '#58c45f',
    fontSize: theme.sizes.font,
  },
  negativenumber: {
    color: '#ec5a23',
    fontSize: theme.sizes.font,
  },
  categoryIcon: {
    flex: 1,
    marginHorizontal: 10,
  },
  deleteButton: {
    flex: 1,
    color: 'gray',
    marginLeft: 10,
  },
  input: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 12,
    maxHeight: 100,
    minHeight: 40,
    // minWidth: 25,
    fontSize: theme.sizes.font,
    color: theme.colors.dark,
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

export default PresetItem;
