import React from 'react';
import { View, FlatList, Dimensions, ImageBackground } from 'react-native';
import PresetContext from '../context/preset/presetContext';
import AuthContext from '../context/auth/authContext';
import SwipeItem from '../components/SwipeItem';
import FH_ActivityIndicator from '../components/FH_ActivityIndicator';
import axios from 'axios';
import { NavigationEvents } from 'react-navigation';
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
    calcCategorySumOnlyNegNumByYear,
    setCategoryNameOnlyNegNumByYear,
  } = presetContext;
  const { loading, isAuthenticated, user } = authContext;
  //state
  //const [LocalLoading, setLocalLoading] = React.useState(false);
  const [localYear, setLocalYear] = React.useState(2019);
  const [Lastoffset, setLastOffset] = React.useState(0); // used to check if offset occured to see if swipe occured

  const { width, height } = Dimensions.get('window');

  let fromMonth = navigation.getParam('fromMonth');
  /*  React.useEffect(() => {
    setLocalLoading(false);
  }); */
  //console.log('fromMonthOutside: ' + fromMonth);
  //console.log(fromMonth);
  //on mount
  /*   React.useEffect(() => {
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

  }, [year, fromMonth]); */
  React.useEffect(() => {
    // console.log('getPresets tried to run');
    // console.log('presets:');
    //  console.log(presets === null);
    // console.log('isAuth');
    // console.log(isAuthenticated);
    //user && console.log('user exist');
    //!user && console.log('user does NOT exist');
    //console.log(user);
    presets === null && isAuthenticated && user && getPresets();
    // presets === null && isAuthenticated && user && console.log('getPresets ran');
  }, [year, isAuthenticated, user]);
  // React.useEffect(() => {
  //console.log('why did this fkn update');
  //  console.log(year);
  // console.log(localYear);
  // if (isAuthenticated) {
  /*  presets && month === null && calcYearsum(year);  // year summary used in BarChart
      presets &&
        month === null &&
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
        ]); */
  /* presets && month === null && calcCapital();
      presets && month === null && calcSavings();
      presets && month === null && calcSum(); */
  /* presets && calcCategorySumOnlyNegNumByYear();
      presets && setCategoryNameOnlyNegNumByYear(); */
  //  }
  // }, [year, localYear, presets]);
  console.log(year);
  const changeMonthList = (e) => {
    const swipeoffset = e.nativeEvent.targetContentOffset.x;
    const newindex = swipeoffset / width;
    if (newindex > 6) {
      //swipe right
      //console.log('swipreright');
      // setLocalLoading(true);
      addMonth('January');
      navigation.navigate('Month');
    } else {
      // console.log('swipeleft go back');
      setYear(parseInt(year) - 1);
      navigation.navigate('Month', { fromYear: 'December' });
    }
    //console.log(newindex);
  };
  const [isFocused, setFocus] = React.useState(true);
  const notFocus = () => {
    setFocus(false);
  };
  const doFocus = () => {
    setFocus(true);
  };
  return (
    <>
      <NavigationEvents
        /* onWillFocus={(payload) => console.log('will focus', payload)} */
        onWillFocus={doFocus}
        /*  onDidFocus={(payload) => console.log('did focus', payload)}
        onWillBlur={(payload) => console.log('will blur', payload)} */
        onWillBlur={notFocus}
        /*   onDidBlur={(payload) => console.log('did blur', payload)} */
      />
      {/*    {LocalLoading || loading ? (
        <FH_ActivityIndicator position={'absolute'} infiniteloop={false} />
      ) : ( */}
      {isFocused && (
        <FlatList
          windowSize={3}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
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
          renderItem={(data) => {
            // console.log(data.item.image);
            return (
              <View>
                <SwipeItem
                  // navigation={navigation} // problem keeping yearbalancescreen loaded in bg on monthscreen?
                  month={data.item.month}
                  key={data.item.month}
                  index={data.index}
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
      {/*   )} */}
    </>
  );
};

export default YearBalanceScreen;
