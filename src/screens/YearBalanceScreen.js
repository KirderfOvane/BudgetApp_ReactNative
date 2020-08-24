import React from 'react';
import { View, FlatList, Dimensions, ImageBackground } from 'react-native';
import PresetContext from '../context/preset/presetContext';
import AuthContext from '../context/auth/authContext';
import SwipeItem from '../components/SwipeItem';
import FH_ActivityIndicator from '../components/FH_ActivityIndicator';

const YearBalanceScreen = ({ navigation }) => {
  //context
  const presetContext = React.useContext(PresetContext);
  const authContext = React.useContext(AuthContext);
  //context destruct
  const {
    getPresets,
    year,
    presets,
    calcYearsum,
    calcAllMonthSum,
    calcCapital,
    calcSavings,
    calcSum,
    calcPosMonth,
    calcNegMonth,
    buildFlatListData,
    addMonth,
    month,
    setYear,
  } = presetContext;
  const { loading } = authContext;
  //state
  const [LocalLoading, setLocalLoading] = React.useState(false);
  const [localYear, setLocalYear] = React.useState(2019);
  const [Lastoffset, setLastOffset] = React.useState(0); // used to check if offset occured to see if swipe occured

  const { width, height } = Dimensions.get('window');

  let fromMonth = navigation.getParam('fromMonth');
  React.useEffect(() => {
    setLocalLoading(false);
  });
  //console.log('fromMonthOutside: ' + fromMonth);
  //on mount
  React.useEffect(() => {
    // coming from month-tab

    if (fromMonth === 'right') {
      //setYear(parseInt(localYear) + 1);
      setLocalYear(parseInt(localYear) + 1);
      fromMonth = '';
    }
    if (fromMonth === 'left') {
      setLocalYear(parseInt(localYear) - 1);

      fromMonth = '';
    }
    //console.log('fromMonth: ' + fromMonth);
    //console.log(`year: ${year}`);
  }, [year, fromMonth]);
  React.useEffect(() => {
    presets === null && getPresets();
    //presets === null && console.log('getPresets ran');
    presets && buildFlatListData();
    //presets && console.log('buildFlatListData ran');
  }, [presets, year]);
  React.useEffect(() => {
    presets && calcYearsum(year);
    //presets && console.log('calcYearsum ran with yearvalue: ' + year);
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
    //console.log('ffffffff');
    //setLocalLoading(false);
    // console.log(loading);
    //console.log('ffffffff');
    // presets && calcPosMonth();
    // presets && calcNegMonth();
  }, [year, presets, fromMonth, month, localYear]);

  const changeMonthList = (e) => {
    const swipeoffset = e.nativeEvent.targetContentOffset.x;
    const newindex = swipeoffset / width;
    if (newindex > 6) {
      //swipe right
      // console.log('swipreright');
      setLocalLoading(true);
      navigation.navigate('Month');
    } else {
      // console.log('swipeleft go back');
      setYear(parseInt(year) - 1);
      navigation.navigate('Month', { fromYear: 'December' });
    }
    //console.log(newindex);
  };

  return (
    <>
      {LocalLoading || loading ? (
        <FH_ActivityIndicator position={'absolute'} infiniteloop={false} />
      ) : (
        <FlatList
          data={[
            { month: 'August', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__1.jpg') },
            { month: 'September', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__2.jpg') },
            { month: 'October', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__3.jpg') },
            { month: 'November', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__4.jpg') },
            { month: 'December', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__5.jpg') },
            { month: year.toString(), image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__6.jpg') },
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
                    { month: year.toString(), image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__6.jpg') },
                    { month: 'January', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__7.jpg') },
                    { month: 'February', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__8.jpg') },
                    { month: 'March', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__9.jpg') },
                    { month: 'April', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__10.jpg') },
                    { month: 'May', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__11.jpg') },
                    { month: 'June', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__12.jpg') },
                    { month: 'July', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__13.jpg') },
                  ]}
                  setLocalLoading={setLocalLoading}
                  LocalLoading={LocalLoading}
                />
              </View>
            );
          }}
          getItemLayout={(data, index = 12) => {
            // this shows problem: getItemLayout runs every scroll. unnecessary?  console.log('get item layout ' + index);
            return { length: 414, offset: 414 * index, index };
          }}
        />
      )}
    </>
  );
};

export default YearBalanceScreen;
