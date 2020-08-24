import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { icons, theme } from '../constants';
import PresetContext from '../context/preset/presetContext';
import PresetItemName from './PresetItemName';
import PresetItemNumber from './PresetItemNumber';

const PresetItem = ({ preset }) => {
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

  // Logic

  // Activate editmode
  const onDeletePress = (e) => {
    console.log('delete');
  };
  const onCategoryPress = (e) => {
    console.log('category');
  };
  const onNumberPress = (e) => {
    toggleInputMode('number');
    // localPreset.number > 0 ? filterPresets('positive') : filterPresets('negative');
  };
  const onNamePress = (e) => {
    toggleInputMode('name');
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
    <View style={styles.container}>
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
});

export default PresetItem;
