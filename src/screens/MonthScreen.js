import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';

import PresetContext from '../context/preset/presetContext';

import SwipeItem from '../components/SwipeItem';
import YearBalanceScreen from './YearBalanceScreen';

const MonthScreen = ({ navigation }) => {
  //context
  const presetContext = React.useContext(PresetContext);
  const {
    presets,
    filterOutPositiveNumsAndMonth,
    addMonth,
    filterOutNegativeNumsAndMonth,
    getPresets,
    filteredmonthandposnum,
    filteredmonthandnegnum,
  } = presetContext;

  //state
  const [_initialScrollIndex, set_InitialScrollIndex] = React.useState(6);
  const [indexCounter, setIndexCounter] = React.useState(_initialScrollIndex);
  const [Lastoffset, setLastOffset] = React.useState(0); // used to check if offset occured to see if swipe occured
  const [lastSwipe, setLastSwipe] = React.useState(''); // used to tell Balance-screen what month we swiped from
  const [MonthList, setMonthList] = React.useState([
    { month: 'August', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__1.jpg') },
    { month: 'September', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__2.jpg') },
    { month: 'October', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__3.jpg') },
    { month: 'November', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__4.jpg') },
    { month: 'December', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__5.jpg') },
    { month: '2019', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__6.jpg') },
    { month: 'January', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__7.jpg') },
    { month: 'February', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__8.jpg') },
    { month: 'March', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__9.jpg') },
    { month: 'April', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__10.jpg') },
    { month: 'May', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__11.jpg') },
    { month: 'June', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__12.jpg') },
    { month: 'July', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__13.jpg') },
  ]);

  // refs
  const { width, height } = Dimensions.get('window');
  const flatlistRef = React.useRef(null);

  //logic
  const changeMonthList = (e) => {
    const swipeoffset = e.nativeEvent.targetContentOffset.x;
    const newindex = swipeoffset / width;
    setIndexCounter(newindex);

    //check if year happened
    /*    if (!isNaN(MonthList[newindex].month)) {
      console.log('year selected!');
      navigation.navigate('yearFlow');
    } */

    //check if swipe happened
    if (swipeoffset !== Lastoffset) {
      //check direction
      if (Lastoffset > swipeoffset) {
        //swipe left
        // console.log('swiped left');
        setLastSwipe('left');
        const counter = _initialScrollIndex - newindex;
        //console.log(`counter: ${counter}`);
        if (counter >= 4) {
          const tempMonthListCopy = [...MonthList];
          for (i = 0; i < 4; i++) {
            tempMonthListCopy.unshift(tempMonthListCopy.pop());
          }
          //console.log(tempMonthListCopy);
          setMonthList(tempMonthListCopy);
          flatlistRef.current.scrollToIndex({ index: 6, animated: false });
        }
      } else {
        //swipe right
        //  console.log('swiped rigth');
        setLastSwipe('rigth');
        const counter = newindex - _initialScrollIndex;
        //console.log(`counter: ${counter}`);
        if (counter >= 4) {
          const tempMonthListCopy = [...MonthList];
          for (i = 0; i < 9; i++) {
            tempMonthListCopy.unshift(tempMonthListCopy.pop());
            // console.log(tempMonthListCopy);
          }
          // console.log(tempMonthListCopy);
          setMonthList(tempMonthListCopy);
          flatlistRef.current.scrollToIndex({ index: 6, animated: false });
        }
      }
      setLastOffset(e.nativeEvent.targetContentOffset.x);
    } else null; //console.log('No Swipe');
  };
  //console.log(`negnum: ${filteredmonthandnegnum}`);
  //updates on swipe
  React.useEffect(() => {
    // console.log('useeffect');
    //getPresets();

    presets && console.log(MonthList[indexCounter].month);
    // when index/month change recalc income presets
    presets && addMonth(MonthList[indexCounter].month);
    presets && filterOutPositiveNumsAndMonth(MonthList[indexCounter].month);
    presets && filterOutNegativeNumsAndMonth(MonthList[indexCounter].month);
    //console.log(indexCounter);
    if (!isNaN(MonthList[indexCounter].month)) {
      console.log('year selected!');
      navigation.navigate('Balance', { fromMonth: lastSwipe });
    }
  }, [indexCounter, presets]);

  //jsx
  return (
    <FlatList
      ref={flatlistRef}
      data={MonthList}
      onScrollEndDrag={changeMonthList} // runs when movement finished
      snapToInterval={width}
      snapToAlignment={'start'}
      decelerationRate='fast'
      initialScrollIndex={_initialScrollIndex}
      horizontal
      keyExtractor={(item) => item.month}
      renderItem={(object) => {
        //console.log(object.item.month);
        return <SwipeItem index={object.index} key={object.item.month} activeindex={indexCounter} monthlist={MonthList} />;
      }}
      getItemLayout={(data, index) => {
        // this shows problem: getItemLayout runs every scroll. unnecessary?  console.log('get item layout ' + index);
        return { length: width, offset: width * index, index };
      }}
    />
  );
};

export default MonthScreen;
