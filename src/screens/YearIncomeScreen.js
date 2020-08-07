import React from 'react';
import { View } from 'react-native';
import Svg, { Rect, Circle, Text } from 'react-native-svg';

const YearIncomeScreen = () => {
  return (
    <View>
      <Svg width='300' height='200'>
        <Rect width='100%' height='100%' fill='red' />
        <Text x='40' y='125' fontSize='60'>
          SVG test
        </Text>
      </Svg>
    </View>
  );
};

export default YearIncomeScreen;
