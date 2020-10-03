import React from 'react';
import { TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import { theme } from '../constants';

const PresetItemName = ({ onNamePress, InputMode, inputNameRef, changeName, localPreset, onBlur, fontSize }) => {
  return (
    <>
      <TouchableOpacity style={{ flex: 5 }} onPress={onNamePress}>
        {InputMode === 'name' ? (
          <TextInput
            ref={inputNameRef}
            style={styles.input}
            onChangeText={changeName}
            name='name'
            value={localPreset.name}
            autoCorrect={false}
            onBlur={onBlur}
          />
        ) : (
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.namebutton, { fontSize: fontSize }]}>
            {localPreset.month}
            {localPreset.name}
          </Text>
        )}
      </TouchableOpacity>
    </>
  );
};
//default prop values
PresetItemName.defaultProps = {
  fontSize: theme.sizes.font,
};
// css
const styles = StyleSheet.create({
  namebutton: {
    flexWrap: 'nowrap',
    fontSize: theme.sizes.font,
    marginRight: 8,
    fontWeight: 'normal',
    color: '#000000',
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

export default PresetItemName;
