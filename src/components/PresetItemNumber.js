import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import { theme } from '../constants';

const PresetItemNumber = ({ onNumberPress, InputMode, inputNumRef, changeNumber, localPreset, onBlur }) => {
  // destructuring
  const { number, markDelete } = localPreset;

  // jsx
  return (
    <>
      <TouchableOpacity style={{ flex: 4, minWidth: 10, maxWidth: 110 }} onPress={onNumberPress} ref={inputNumRef}>
        {InputMode === 'number' && !markDelete ? (
          <TextInput
            style={[styles.input, { color: number > 0 ? theme.colors.success : theme.colors.danger }]}
            keyboardType='numeric'
            onChangeText={changeNumber}
            name='number'
            value={number.toString()}
            autoCapitalize='none'
            autoCorrect={false}
            maxLength={8}
            onBlur={onBlur}
          />
        ) : (
          <Text style={[!markDelete ? (parseFloat(number) > 0 ? styles.positivenumber : styles.negativenumber) : styles.grayedOutNum]}>
            {number}
          </Text>
        )}
      </TouchableOpacity>
    </>
  );
};
//default prop values
PresetItemNumber.defaultProps = {
  fontSize: theme.sizes.font,
};
// css
const styles = StyleSheet.create({
  positivenumber: {
    color: theme.colors.success,
    fontSize: theme.sizes.font,
  },
  negativenumber: {
    color: theme.colors.danger,
    fontSize: theme.sizes.font,
  },
  grayedOutNum: {
    color: theme.colors.gray,
    fontSize: theme.sizes.font,
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
