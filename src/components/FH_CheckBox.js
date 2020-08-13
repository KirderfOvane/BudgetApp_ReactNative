import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const FH_CheckBox = ({ localPreset, setLocalPreset, title, background, color, checkedval }) => {
  return (
    <TouchableOpacity
      style={styles.flexrow}
      onPress={() => {
        localPreset.type !== checkedval && setLocalPreset({ ...localPreset, type: checkedval });
      }}
    >
      <View style={styles.checkboxcontainer}>
        <View style={[styles.box, { borderColor: color, backgroundColor: localPreset.type !== checkedval ? background : 'gray' }]}>
          {localPreset.type === checkedval && (
            <FontAwesome style={{ position: 'absolute', bottom: 3, left: 1 }} name='check' size={24} color='white' />
          )}
        </View>
      </View>
      <View style={styles.checkboxlabelcontainer}>
        <Text style={styles.checkboxtext}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
FH_CheckBox.defaultProps = {
  title: '',
  //checked: false,
  background: 'white',
  color: 'black',
};
const styles = StyleSheet.create({
  box: {
    //position: 'absolute',
    top: 0,
    left: 0,
    height: 30,
    width: 30,
    borderWidth: 2,
    zIndex: 0,
  },
  checkboxcontainer: {
    flex: 1,
    minHeight: 38,
    maxWidth: 40,
    paddingVertical: 8,
  },
  flexrow: {
    flexDirection: 'row',
    //  borderWidth: 1,
    // borderColor: 'red',
  },
});
export default FH_CheckBox;
