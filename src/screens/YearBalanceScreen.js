import React from 'react';
import { View, FlatList } from 'react-native';
import PresetContext from '../context/preset/presetContext';
import SwipeItem from '../components/SwipeItem';
import BarChart from '../components/BarChart';

const YearBalanceScreen = ({ navigation }) => {
  const fromMonth = navigation.getParam('fromMonth');
  //console.log(`fromMonth: ${fromMonth}`);
  //context
  const presetContext = React.useContext(PresetContext);
  //context destruct
  const { getPresets, year, presets, calcYearsum, calcAllMonthSum, calcCapital, calcSavings, calcSum } = presetContext;
  //state
  const [localYear, setLocalYear] = React.useState(2019);
  const [Lastoffset, setLastOffset] = React.useState(0); // used to check if offset occured to see if swipe occured

  //on mount
  React.useEffect(() => {
    getPresets();
    console.log('getPresets ran');
  }, []);
  React.useEffect(() => {
    presets && calcYearsum();
    console.log('calcYearsum ran');
    presets &&
      calcAllMonthSum([
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
    presets && calcCapital();
    presets && calcSavings();
    presets && calcSum();
  }, [year, presets]);

  React.useEffect(() => {
    fromMonth === 'right' && setLocalYear(localYear + 1);
  }, [fromMonth]);

  const changeMonthList = (e) => {
    const swipeoffset = e.nativeEvent.targetContentOffset.x;
    //console.log(swipeoffset);
    navigation.navigate('Month');
  };

  return (
    <FlatList
      data={[
        { month: 'August', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__1.jpg') },
        { month: 'September', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__2.jpg') },
        { month: 'October', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__3.jpg') },
        { month: 'November', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__4.jpg') },
        { month: 'December', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__5.jpg') },
        { month: localYear.toString(), image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__6.jpg') },
        { month: 'January', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__7.jpg') },
        { month: 'February', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__8.jpg') },
        { month: 'March', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__9.jpg') },
        { month: 'April', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__10.jpg') },
        { month: 'May', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__11.jpg') },
        { month: 'June', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__12.jpg') },
        { month: 'July', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__13.jpg') },
      ]}
      onScrollEndDrag={changeMonthList} // runs when movement finished
      snapToInterval={414}
      snapToAlignment={'start'}
      decelerationRate='fast'
      initialScrollIndex={6}
      horizontal
      keyExtractor={(item) => item.month}
      renderItem={(object) => {
        return (
          <View>
            <SwipeItem
              month={object.item.month}
              key={object.item.month}
              index={object.index}
              activeindex={5}
              monthlist={[
                { month: 'August', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__1.jpg') },
                { month: 'September', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__2.jpg') },
                { month: 'October', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__3.jpg') },
                { month: 'November', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__4.jpg') },
                { month: 'December', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__5.jpg') },
                { month: localYear.toString(), image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__6.jpg') },
                { month: 'January', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__7.jpg') },
                { month: 'February', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__8.jpg') },
                { month: 'March', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__9.jpg') },
                { month: 'April', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__10.jpg') },
                { month: 'May', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__11.jpg') },
                { month: 'June', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__12.jpg') },
                { month: 'July', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__13.jpg') },
              ]}
            />
          </View>
        );
      }}
      getItemLayout={(data, index = 12) => {
        // this shows problem: getItemLayout runs every scroll. unnecessary?  console.log('get item layout ' + index);
        return { length: 414, offset: 414 * index, index };
      }}
    />
  );
};

export default YearBalanceScreen;
