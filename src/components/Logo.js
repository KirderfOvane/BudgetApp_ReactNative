import React from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from 'react-native';
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
    <TouchableOpacity onPress={onClick} style={{ paddingHorizontal: paddingSides }}>
      <LogoSvg />
    </TouchableOpacity>
  );
};
Logo.defaultProps = {
  paddingSides: 35,
  clickable: true,
  clickpath: 'Landing',
};

export default withNavigation(Logo);
