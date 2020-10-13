import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { icons, theme } from '../constants';
const SelectCategory = ({ localPreset, onCategoryPress }) => {
  // destructuring
  const { markDelete, category } = localPreset;
  //jsx
  return (
    <TouchableOpacity onPress={onCategoryPress}>
      {category !== 'Select Category' ? (
        <Text style={[styles.categoryIcon, markDelete && styles.iconGrayedOut]}>{icons.getIcon(category.toLowerCase())}</Text>
      ) : (
        <Text style={markDelete ? styles.categorybuttonInactive : styles.categorybuttonActive}>Select Category</Text>
      )}
    </TouchableOpacity>
  );
};
//styling
const styles = StyleSheet.create({
  categorybuttonInactive: {
    borderWidth: 0,
    borderColor: 'gray',
    color: 'gray',
    backgroundColor: theme.colors.light,
    borderRadius: 5,
  },

  categorybuttonActive: {
    borderWidth: 2,
    borderColor: 'black',
    color: 'black',
    backgroundColor: 'orange',
    borderRadius: 5,
    overflow: 'hidden',
    paddingVertical: 5,
    paddingHorizontal: 2,
  },
  categoryIcon: {
    //  flex: 1,
    marginHorizontal: 10,
  },
  iconGrayedOut: {
    opacity: 0.3,
  },
});
export default SelectCategory;
