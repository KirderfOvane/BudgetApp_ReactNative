import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PresetItem = ({ preset }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.namebutton}> {preset.item.name}</Text>
      <Text style={preset.item.number > 0 ? styles.positivenumber : styles.negativenumber}>{preset.item.number}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginVertical: 5,
    marginHorizontal: 10,
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 3,
    flexWrap: 'wrap',
  },
  namebutton: {
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 21,
    marginRight: 8,
    fontWeight: 'normal',
    overflow: 'hidden',
    color: '#000000',
  },
  positivenumber: {
    color: '#58c45f',
  },
  negativenumber: {
    color: '#ec5a23',
  },
});

export default PresetItem;
