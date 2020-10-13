import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { icons, theme } from '../constants';
import PresetContext from '../context/preset/presetContext';
import PresetItemName from './PresetItemName';
import PresetItemNumber from './PresetItemNumber';
import SelectCategory from './SelectCategory';

// Inline Requires init variable
let CategoryPicker = null;
const CsvPresetItem = ({ preset, isFocused }) => {
  // console.log(preset.item.id);
  // Context
  const { doSubmitCsv, updateCsvPresets } = React.useContext(PresetContext);

  // State
  const [InputMode, toggleInputMode] = React.useState('');
  const [localPreset, setLocalPreset] = React.useState({
    id: preset.item.id,
    name: preset.item.name,
    number: preset.item.number,
    category: 'Select Category',
    type: 'Overhead',
    markDelete: false,
    //piggybank: preset.item.piggybank,
  });
  const [income, setIncome] = React.useState(true);
  const [pickerActive, setPickerActive] = React.useState(false);
  const [pickerButtonTitle, setPickerButtonTitle] = React.useState('Select Category');
  const [selected, setSelected] = React.useState('Select Category');
  // Logic

  // Activate editmode
  const onDeletePress = (e) => {
    isFocused(preset.index);
    const markDelTempValHolder = localPreset.markDelete;
    setLocalPreset({ ...localPreset, markDelete: !markDelTempValHolder });
  };
  const onCategoryPress = (e) => {
    if (localPreset.category !== 'Select Category') {
      setPickerButtonTitle(localPreset.category); //<--
    }
    if (CategoryPicker === null) {
      CategoryPicker = require('./CategoryPicker').default;
    }
    isFocused(preset.index);
    setPickerActive(!pickerActive);
  };

  const onNumberPress = (e) => {
    toggleInputMode('number');
    isFocused(preset.index);
  };
  const onNamePress = (e) => {
    isFocused(preset.index);
    toggleInputMode('name');
  };

  // change value in picker
  const selectedCategory = (value) => {
    setSelected(value);
    setLocalPreset({ ...localPreset, category: value });
  };

  // Deactivate editmode
  const onBlur = () => {
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
  const inputCategoryRef = React.useRef();

  // useEffect input-interaction
  React.useEffect(() => {
    // update database when edit is finished
    if (InputMode === 'finished') {
      // sendEdit(localPreset);
      toggleInputMode('');
    }

    InputMode === 'name' && inputNameRef.current.focus();
    InputMode === 'number' && inputNumRef.current.focus();
  }, [InputMode]);

  const addToDB = () => {
    console.log('addtoDB reached');
  };
  // useEffect add csvpresets to db in 2 steps
  React.useEffect(() => {
    // console.log(localPreset);
    //  console.log('CsvPresetItem useEffect ran' + doSubmitCsv);
    // doSubmitCsv === 'step1' && localPreset.category !== 'Select Category' && console.log(localPreset);
    doSubmitCsv === 'step1' && localPreset.category !== 'Select Category' && updateCsvPresets(localPreset);

    doSubmitCsv === 'submit' && localPreset.category !== 'Select Category' && localPreset.markdelete !== true && addToDB();
    //eslint-disable-next-line
  }, [doSubmitCsv]);

  // jsx
  return (
    <>
      {pickerActive ? (
        <>
          <View style={[styles.container]}>
            <PresetItemName
              fontSize={theme.sizes.base}
              onNamePress={onNamePress}
              InputMode={InputMode}
              inputNameRef={inputNameRef}
              changeName={changeName}
              localPreset={localPreset}
              onBlur={onBlur}
            />

            <PresetItemNumber
              fontSize={theme.sizes.base}
              onNumberPress={onNumberPress}
              InputMode={InputMode}
              inputNumRef={inputNumRef}
              changeNumber={changeNumber}
              localPreset={localPreset}
              onBlur={onBlur}
              income={income}
            />
          </View>
          <CategoryPicker
            selected={selected}
            selectedCategory={selectedCategory}
            localPreset={localPreset}
            inputCategoryRef={inputCategoryRef}
            setLocalPreset={setLocalPreset}
            onCategoryPress={onCategoryPress}
          />
        </>
      ) : (
        /* name */
        <View style={styles.container}>
          <PresetItemName
            fontSize={theme.sizes.base}
            onNamePress={onNamePress}
            InputMode={InputMode}
            inputNameRef={inputNameRef}
            changeName={changeName}
            localPreset={localPreset}
            onBlur={onBlur}
          />
          {/* number */}
          <PresetItemNumber
            fontSize={theme.sizes.base}
            onNumberPress={onNumberPress}
            InputMode={InputMode}
            inputNumRef={inputNumRef}
            changeNumber={changeNumber}
            localPreset={localPreset}
            onBlur={onBlur}
            income={income}
          />
          {/* category */}
          <SelectCategory onCategoryPress={onCategoryPress} localPreset={localPreset} />
          {/* markdeletebutton */}
          <TouchableOpacity style={styles.deleteButton} onPress={onDeletePress}>
            <Text>{localPreset.markDelete === false ? icons.getIcon('delete_dark') : icons.getIcon('plus')}</Text>
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
    // display: 'none',
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

export default CsvPresetItem;
