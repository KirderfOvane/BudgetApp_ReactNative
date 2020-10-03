import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import { theme } from '../constants';

const PresetItemNumber = ({ onNumberPress, InputMode, inputNumRef, changeNumber, localPreset, onBlur, income, fontSize }) => {
  return (
    <TouchableOpacity style={{ flex: 4, minWidth: 10, maxWidth: 110 }} onPress={onNumberPress}>
      {InputMode === 'number' ? (
        <TextInput
          ref={inputNumRef}
          style={[styles.input, { color: income ? theme.colors.success : theme.colors.danger }]}
          keyboardType='numeric'
          onChangeText={changeNumber}
          name='number'
          value={localPreset.number.toString()}
          autoCapitalize='none'
          autoCorrect={false}
          maxLength={8}
          onBlur={onBlur}
        />
      ) : (
        <Text
          style={localPreset.number > 0 ? [styles.positivenumber, { fontSize: fontSize }] : [styles.negativenumber, { fontSize: fontSize }]}
        >
          {localPreset.number}
        </Text>
      )}
    </TouchableOpacity>
  );
};
//default prop values
PresetItemNumber.defaultProps = {
  fontSize: theme.sizes.font,
};
// css
const styles = StyleSheet.create({
  positivenumber: {
    color: '#58c45f',
  },
  negativenumber: {
    color: '#ec5a23',
  },
  input: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 12,
    maxHeight: 100,
    minHeight: 40,

    fontSize: theme.sizes.font,
    color: theme.colors.dark,
  },
});

export default PresetItemNumber;
