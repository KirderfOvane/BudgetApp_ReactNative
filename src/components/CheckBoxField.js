import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FH_CheckBox from './FH_CheckBox';
import { theme } from '../constants';

const CheckBoxField = ({ localPreset, setLocalPreset }) => {
  return (
    <View style={styles.containerflex}>
      <View style={styles.checkboxfield}>
        <Text style={{ fontSize: theme.sizes.font, fontWeight: theme.fonts.weight.semibold, color: theme.colors.gray }}>Add to</Text>
        {/* overhead */}

        <FH_CheckBox
          localPreset={localPreset}
          setLocalPreset={setLocalPreset}
          checkedval='overhead'
          background={theme.colors.light}
          color={theme.colors.gray}
          title='Overhead'
        />

        {/* purchase */}

        <FH_CheckBox
          localPreset={localPreset}
          setLocalPreset={setLocalPreset}
          checkedval='purchase'
          background={theme.colors.light}
          color={theme.colors.gray}
          title='Purchase'
        />

        {/* savings */}

        <FH_CheckBox
          localPreset={localPreset}
          setLocalPreset={setLocalPreset}
          checkedval='savings'
          background={theme.colors.light}
          color={theme.colors.gray}
          title='Savings'
        />

        {/* Capital */}

        <FH_CheckBox
          localPreset={localPreset}
          setLocalPreset={setLocalPreset}
          checkedval='capital'
          background={theme.colors.light}
          color={theme.colors.gray}
          title='Capital'
        />

        {/* end */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 414,
    height: 725,
    backgroundColor: 'gray',
  },

  picker: {
    flex: 1,
  },
  containerflex: {
    flex: 1,
    marginTop: 25,
  },
  flexrow: {
    flexDirection: 'row',
  },
  checkboxcontainer: {
    //
    flex: 1,
    minHeight: 38,
    maxWidth: 40,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'red',
  },
  checkboxlabelcontainer: {
    flex: 1,
    alignSelf: 'center',
    paddingVertical: 8,
  },
  checkboxtext: {
    fontSize: 18,
    fontWeight: '400',
    paddingBottom: 7,
  },
});
export default CheckBoxField;
