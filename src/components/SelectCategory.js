import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { icons, theme } from '../constants';
const SelectCategory = ({ localPreset, onCategoryPress }) => {
  return (
    <TouchableOpacity style={{ paddingTop: 10 }} onPress={onCategoryPress}>
      {localPreset.category !== 'Select Category' ? (
        <Text style={styles.categoryIcon}>{icons.getIcon(localPreset.category.toLowerCase())}</Text>
      ) : (
        <Text style={{ borderWidth: 2, borderColor: 'black', color: 'black', backgroundColor: 'orange', borderRadius: 5 }}>
          Select Category
        </Text>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  categoryIcon: {
    flex: 1,
    marginHorizontal: 10,
  },
});
export default SelectCategory;
