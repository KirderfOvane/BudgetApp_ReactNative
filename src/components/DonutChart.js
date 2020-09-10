import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { VictoryPie, VictoryChart, VictoryAxis, VictoryLegend, VictoryLabel } from 'victory-native';
import { theme, icons } from '../constants';
import PresetContext from '../context/preset/presetContext';

const CustomLabel = (props) => {
  const [sliceSizeAngle, setSliceSizeAngle] = React.useState(0);
  const [angleTolerance, setAngleTolerance] = React.useState(0.3); // Angle-tolerance that decides when icon is shown

  React.useEffect(() => {
    // get/calc angleSize of pie-slice
    setSliceSizeAngle(props.slice.endAngle - props.slice.startAngle);
  }, [props]);

  return (
    <>
      {/*  {props.x !== null && props.x !== 0 && ( */}

      <View style={[{ position: 'absolute', top: props.y - 12, left: props.x - 12, fill: 'green' }]}>
        <Text>
          {sliceSizeAngle > angleTolerance && icons.getIcon(props.categorynameonlynegnumbyyear[props.index].toString().toLowerCase())}
        </Text>
        {props.text === 'clicked' && <Text>{Math.ceil(sliceSizeAngle * 10)}%</Text>}
        {props.text === 'clicked' && <Text>{props.categorynameonlynegnumbyyear[props.index].toString()}</Text>}
      </View>

      {/*  )} */}
    </>
  );
};
// css Alternative if absolute has issues: transform={`translate(${34 / -2}, ${34 / -2})`}

const DonutChart = () => {
  //context
  const presetContext = React.useContext(PresetContext);
  //context destruct
  const { categorysumonlynegnumbyyear, categorynameonlynegnumbyyear } = presetContext;

  // state
  const [categories, setCategories] = React.useState(null);

  const w = Dimensions.get('screen').width * 0.8;

  return (
    <View>
      {/*  <Svg width={414} height={414}>
        <Circle cx={212 - 5} cy={212 - 5} r={85} fill={theme.colors.dark} /> */}
      <VictoryPie
        /*  style={{ position: 'relative' }}
        standalone={true} */
        //width={414}
        // height={414}

        colorScale={[
          '#67b7dc',
          '#6794dc',
          '#6771dc',
          '#8067dc',
          '#a367dc',
          '#c767dc',
          '#dc67ce',
          '#dc67ab',
          '#dc6788',
          '#ec5362',
          '#ef4141',
          '#ef6a41',
          '#ef8741',
          '#f2ae4e',
          '#f6e365',
          '#abd951',
          '#9ded76',
          '#9ded77',
          '#76ed98',
          '#76edc2',
          '#67cec3',
          '#6ec5d2',
        ]}
        padAngle={1}
        radius={170}
        innerRadius={115}
        labelRadius={({ innerRadius, radius }) => radius - (radius - innerRadius) / 2}
        data={categorysumonlynegnumbyyear}
        //style={{ labels: { fill: 'white', fontSize: 20, fontWeight: theme.fonts.weight.semibold } }}
        /*    data={[
          { y: 20, label: 'delete' },
          { y: 20, label: 'Test 12' },
          { x: '220%', y: 20, label: 'Test 13' },
          { x: '20%', y: 20, label: 'Test 11' },
          { x: '20%', y: 20, label: 'Test 11' },
        ]} */
        labelComponent={<CustomLabel categorynameonlynegnumbyyear={categorynameonlynegnumbyyear} />}
        //  labelComponent={<CustomLabel />}
        //dataComponent={<CatPoint />}
        events={[
          {
            target: 'data',
            eventHandlers: {
              onPressOut: (e) => {
                // console.log(e);
                return [
                  {
                    target: 'data',
                    mutation: ({ style }) => {
                      return style.fill === '#c43a31' ? null : { style: { fill: '#c43a31' } };
                    },
                  },
                  {
                    target: 'labels',
                    mutation: ({ text }) => {
                      return text === 'clicked' ? null : { text: 'clicked' };
                    },
                  },
                ];
              },
            },
          },
        ]}
      />
      {/*      </Svg> */}
    </View>
  );
};

export default DonutChart;
