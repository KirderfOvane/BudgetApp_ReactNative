import React from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Logo = ({ paddingSides, clickable, clickpath, navigation }) => {
  const onClick = () => {
    clickable && navigation.navigate(clickpath);
  };
  return (
    <TouchableOpacity onPress={onClick} style={[styles.logo, { paddingHorizontal: paddingSides }]}>
      <MaterialIcons name='insert-chart' size={66} color='white' />
    </TouchableOpacity>
  );
};
Logo.defaultProps = {
  paddingSides: 35,
  clickable: true,
  clickpath: 'Landing',
};

const styles = StyleSheet.create({
  logo: {
    /*     borderWidth: 2,
    borderColor: 'blue', */
  },
});
export default withNavigation(Logo);
