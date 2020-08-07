import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLegend, VictoryLabel } from 'victory-native';
import PresetContext from '../context/preset/presetContext';

const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const YearSavingsScreen = () => {
  /*  const presetContext = React.useContext(PresetContext);
  const { AllMonthSum, presets } = presetContext;
  const [data, setData] = React.useState([
    { month: 'January', value: AllMonthSum[0] },
    { month: 'February', value: AllMonthSum[1] },
    { month: 'March', value: -25677 },
    { month: 'April', value: -980 },
    { month: 'May', value: -4355 },
    { month: 'June', value: 54356 },
    { month: 'July', value: 5437 },
    { month: 'August', value: -35478 },
    { month: 'September', value: AllMonthSum[8] },
    { month: 'October', value: AllMonthSum[9] },
    { month: 'November', value: AllMonthSum[10] },
    { month: 'December', value: 54357 },
  ]);
  console.log(Dimensions.get('window').width * 0.9); */
  return (
    <View>
      <Text>YearSavingsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    width: Dimensions.get('window').width * 0.9,
    alignSelf: 'center',
  },
});
export default YearSavingsScreen;
