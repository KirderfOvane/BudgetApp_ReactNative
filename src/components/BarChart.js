import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLegend, VictoryLabel } from 'victory-native';
import PresetContext from '../context/preset/presetContext';
import { theme } from '../constants';

const BarChart = ({ year }) => {
  const presetContext = React.useContext(PresetContext);
  const { AllMonthSum, presets, yearsum, capital, savings, sum, calcYearsum } = presetContext;
  const yearmonthavg = parseInt(parseFloat(yearsum / 12));
  //console.log(AllMonthSum[0]);
  const data = [
    { month: 'January', value: AllMonthSum[0] },
    { month: 'February', value: AllMonthSum[1] },
    { month: 'March', value: AllMonthSum[2] },
    { month: 'April', value: AllMonthSum[3] },
    { month: 'May', value: AllMonthSum[4] },
    { month: 'June', value: AllMonthSum[5] },
    { month: 'July', value: AllMonthSum[6] },
    { month: 'August', value: AllMonthSum[7] },
    { month: 'September', value: AllMonthSum[8] },
    { month: 'October', value: AllMonthSum[9] },
    { month: 'November', value: AllMonthSum[10] },
    { month: 'December', value: AllMonthSum[11] },
  ];
  const datatwo = [
    { month: 'January', value: 0 },
    { month: 'February', value: 0 },
    { month: 'March', value: 0 },
    { month: 'April', value: 0 },
    { month: 'May', value: 0 },
    { month: 'June', value: 0 },
    { month: 'July', value: 0 },
    { month: 'August', value: 0 },
    { month: 'September', value: 0 },
    { month: 'October', value: 0 },
    { month: 'November', value: 0 },
    { month: 'December', value: 0 },
  ];

  if (typeof AllMonthSum[0] === 'number') {
    // console.log(AllMonthSum);
    return (
      <View style={styles.container}>
        <VictoryChart width={414} height={300}>
          <VictoryLegend
            x={16}
            gutter={-12}
            symbolSpacer={0}
            orientation='horizontal'
            data={[
              { name: 'Jan', symbol: { fill: 'none' } },
              { name: 'Feb', symbol: { fill: 'none' } },
              { name: 'Mar', symbol: { fill: 'none' } },
              { name: 'Apr', symbol: { fill: 'none' } },
              { name: 'May', symbol: { fill: 'none' } },
              { name: 'Jun', symbol: { fill: 'none' } },
              { name: 'Jul', symbol: { fill: 'none' } },
              { name: 'Aug', symbol: { fill: 'none' } },
              { name: 'Sep', symbol: { fill: 'none' } },
              { name: 'Oct', symbol: { fill: 'none' } },
              { name: 'Nov', symbol: { fill: 'none' } },
              { name: 'Dec', symbol: { fill: 'none' } },
            ]}
          />

          <VictoryAxis style={{ tickLabels: { fill: 'none' } }} />

          <VictoryBar data={data} y='value' style={{ x: { visibility: 'hidden' } }} alignment='start' />
        </VictoryChart>
        <View style={styles.sumscontainer}>
          <View style={styles.columns}>
            <View style={styles.divider}>
              <Text>Year Summary:</Text>
              <Text style={yearsum > 0 ? styles.success : styles.danger}>{yearsum}</Text>
            </View>
            <View style={styles.divider}>
              <Text>Monthly Average: </Text>
              <Text style={yearmonthavg > 0 ? styles.success : styles.danger}>{yearmonthavg} </Text>
            </View>
          </View>
          <View style={styles.columns}>
            <View style={styles.divider}>
              <Text>Capital:</Text>
              <Text style={capital > 0 ? styles.success : styles.danger}>{capital}</Text>
            </View>
            <View style={styles.divider}>
              <Text>Savings: </Text>
              <Text style={savings > 0 ? styles.success : styles.danger}>{savings}</Text>
            </View>
            <View style={styles.divider}>
              <Text>Account Balance: </Text>
              <Text style={sum > 0 ? styles.success : styles.danger}>{sum}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <VictoryChart width={414} height={300}>
          <VictoryLegend
            x={16}
            gutter={-12}
            symbolSpacer={0}
            orientation='horizontal'
            data={[
              { name: 'Jan', symbol: { fill: 'none' } },
              { name: 'Feb', symbol: { fill: 'none' } },
              { name: 'Mar', symbol: { fill: 'none' } },
              { name: 'Apr', symbol: { fill: 'none' } },
              { name: 'May', symbol: { fill: 'none' } },
              { name: 'Jun', symbol: { fill: 'none' } },
              { name: 'Jul', symbol: { fill: 'none' } },
              { name: 'Aug', symbol: { fill: 'none' } },
              { name: 'Sep', symbol: { fill: 'none' } },
              { name: 'Oct', symbol: { fill: 'none' } },
              { name: 'Nov', symbol: { fill: 'none' } },
              { name: 'Dec', symbol: { fill: 'none' } },
            ]}
          />

          <VictoryAxis style={{ tickLabels: { fill: 'none' } }} />

          <VictoryBar data={datatwo} y='value' style={{ x: { visibility: 'hidden' } }} alignment='start' />
        </VictoryChart>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    width: Dimensions.get('window').width * 0.9,
    alignSelf: 'center',
    marginVertical: 50,
  },
  sumscontainer: {
    flex: 1,
    flexDirection: 'row',
    // borderRadius: 1,
    //borderColor: 'red',
    //borderWidth: 2,
    padding: 5,
  },
  divider: {
    flex: 1,
    flexDirection: 'row',
  },
  columns: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  success: {
    color: theme.colors.success,
  },
  danger: {
    color: theme.colors.danger,
  },
});
export default BarChart;
