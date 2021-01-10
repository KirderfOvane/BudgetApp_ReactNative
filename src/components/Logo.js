import React from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PresetContext from '../context/preset/presetContext';
import LogoSvg from '../../assets/LogoSvg';

const Logo = ({ paddingSides, clickable, clickpath, navigation }) => {
  const { year, calcYearsum, calcAllMonthSum, calcCapital, calcSum, calcSavings } = React.useContext(PresetContext);
  const onClick = () => {
    if (clickpath === 'Balance') {
      calcYearsum(year); // year summary used in BarChart
      calcAllMonthSum([
        // months in barchart
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]);
      calcCapital(); // capital inss
      calcSavings();
      calcSum();
    }
    clickable && clickpath && navigation.navigate(clickpath);
  };
  return (
    <TouchableOpacity onPress={onClick} style={[styles.logo, { paddingHorizontal: paddingSides }]}>
      {/*  <MaterialIcons name='insert-chart' size={66} color='white' /> */}
      <LogoSvg />
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
    color: 'white',
    /*     borderWidth: 2,
    borderColor: 'blue', */
  },
});
export default withNavigation(Logo);
