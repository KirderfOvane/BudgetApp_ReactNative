import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, KeyboardAvoidingView } from 'react-native';

import PresetContext from '../context/preset/presetContext';
import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext';
import CsvContext from '../context/csv/csvContext';

import SwipeItem from '../components/SwipeItem';
import YearBalanceScreen from './YearBalanceScreen';
import FH_ActivityIndicator from '../components/FH_ActivityIndicator';

const MonthScreen = ({ navigation }) => {
  //context
  const presetContext = React.useContext(PresetContext);
  const alertContext = React.useContext(AlertContext);
  const { setAlert } = alertContext;
  const authContext = React.useContext(AuthContext);
  const {
    presets,
    filterOutPositiveNumsAndMonth,
    addMonth,
    filterOutNegativeNumsAndMonth,
    getPresets,
    filteredmonthandposnum,
    filteredmonthandnegnum,
    prefilter,
    calcYearsum,
    calcCapital,
    calcSavings,
    calcSum,
    getMonthPiggySavings,
    AllMonthSum,
    year,
    setYear,
    yearsum,
    calcPosMonth,
    calcNegMonth,
    calcMonthBalance,
    PosMonthSum,
    calcMonthSavings,
    getMonthSavings,
    calcMonthSum,
    MonthSum,
    calcCategoryByMonth,
    setPurchase,
    setTotalOfAllPiggybanksThisMonth,
    setMonthPiggySavingsSums,
    contacterror,
    clearContactError,
    calcAllMonthSum,
  } = presetContext;
  const { loading } = authContext;
  const { csvpresets } = React.useContext(CsvContext);

  //state
  const [displayYear, setDisplayYear] = React.useState(year);
  const [_initialScrollIndex, set_InitialScrollIndex] = React.useState(6);
  const [indexCounter, setIndexCounter] = React.useState(_initialScrollIndex);
  const [Lastoffset, setLastOffset] = React.useState(2484); // used to check if offset occured to see if swipe occured
  const [lastSwipe, setLastSwipe] = React.useState(''); // used to tell Balance-screen what month we swiped from
  const [MonthList, setMonthList] = React.useState([
    { data: [[], []], month: 'August', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__1.jpg') },
    { data: [[], []], month: 'September', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__2.jpg') },
    { data: [[], []], month: 'October', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__3.jpg') },
    { data: [[], []], month: 'November', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__4.jpg') },
    { data: [[], []], month: 'December', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__5.jpg') },
    { data: [[], []], month: displayYear.toString(), image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__6.jpg') },
    { data: [[], []], month: 'January', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__7.jpg') },
    { data: [[], []], month: 'February', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__8.jpg') },
    { data: [[], []], month: 'March', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__9.jpg') },
    { data: [[], []], month: 'April', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__10.jpg') },
    { data: [[], []], month: 'May', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__11.jpg') },
    { data: [[], []], month: 'June', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__12.jpg') },
    { data: [[], []], month: 'July', image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__13.jpg') },
  ]);

  // refs
  const { width, height } = Dimensions.get('window');
  const flatlistRef = React.useRef(null);

  // Swipe logic
  const changeMonthList = (e) => {
    let swipeoffset;
    // Input of e is type number if button is pressed in DateMenu
    if (typeof e === 'number') {
      swipeoffset = Lastoffset + width;
      //return console.log(e);
    } else {
      swipeoffset = e.nativeEvent.targetContentOffset.x;
    }

    const newindex = swipeoffset / width;
    console.log('Lastoffset: ' + Lastoffset);
    console.log('swipeoffset: ' + swipeoffset);
    setIndexCounter(newindex);

    //check if swipe happened
    if (swipeoffset !== Lastoffset) {
      //check DIRECTION
      if (Lastoffset > swipeoffset) {
        //swipe left
        console.log('swipe left');
        //year navigation
        if (!isNaN(MonthList[newindex].month)) {
          calcYearsum(parseInt(MonthList[newindex].month)); // year summary used in BarChart
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
          calcCapital(); // capital in
          calcSavings();
          calcSum();
          //setYear(parseInt(year));
          navigation.navigate('Balance', { fromMonth: true });
        } else {
          //activate recalc of _ALL_ context values
          addMonth(MonthList[newindex].month);
          filterOutPositiveNumsAndMonth(MonthList[newindex].month);
          filterOutNegativeNumsAndMonth(MonthList[newindex].month);
          calcMonthSum(MonthList[newindex].month);
          getMonthSavings(MonthList[newindex].month);
          calcMonthSavings(MonthList[newindex].month);
          MonthSum && calcMonthBalance();
          calcSum();
          setPurchase();
          calcCategoryByMonth(MonthList[newindex].month);
          getMonthPiggySavings(MonthList[newindex].month);
        }

        //year display adjustment
        if (MonthList[newindex].month === 'November') {
          setDisplayYear(parseInt(year) - 1);
        }
        setLastSwipe('left');
        const counter = _initialScrollIndex - newindex;
        if (counter >= 4) {
          const tempMonthListCopy = [...MonthList];
          for (let i = 0; i < 4; i++) {
            tempMonthListCopy.unshift(tempMonthListCopy.pop());
          }
          setMonthList(tempMonthListCopy);
          flatlistRef.current.scrollToIndex({ index: 6, animated: false });
          setIndexCounter(6);
        }
      } else {
        //swipe right
        console.log('swipe right');
        //year navigation
        if (!isNaN(MonthList[newindex].month)) {
          setYear(parseInt(year) + 1);
          calcYearsum(parseInt(MonthList[newindex].month)); // year summary used in BarChart
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
          calcCapital(); // capital in
          calcSavings();
          calcSum();
          navigation.navigate('Balance', { fromMonth: lastSwipe });
        } else {
          //activate recalc of _ALL_ context values
          addMonth(MonthList[newindex].month);
          filterOutPositiveNumsAndMonth(MonthList[newindex].month);
          filterOutNegativeNumsAndMonth(MonthList[newindex].month);
          calcMonthSum(MonthList[newindex].month);
          getMonthSavings(MonthList[newindex].month);
          calcMonthSavings(MonthList[newindex].month);
          MonthSum && calcMonthBalance();
          calcSum();
          setPurchase();
          calcCategoryByMonth(MonthList[newindex].month);
          getMonthPiggySavings(MonthList[newindex].month);
        }

        //year display adjustment
        if (MonthList[newindex].month === 'December') {
          setDisplayYear(parseInt(year) + 1);
        }

        setLastSwipe('right');
        const counter = newindex - _initialScrollIndex;
        console.log(counter);
        if (counter >= 4) {
          const tempMonthListCopy = [...MonthList];

          for (let i = 0; i < 9; i++) {
            tempMonthListCopy.unshift(tempMonthListCopy.pop());
          }
          setMonthList(tempMonthListCopy);
          flatlistRef.current.scrollToIndex({ index: 6, animated: false });
          setIndexCounter(6);
        }
      }
      if (typeof e !== 'number') {
        setLastOffset(e.nativeEvent.targetContentOffset.x);
      } else {
        setLastOffset((currVal) => currVal + width);
      }
    } else null; //console.log('No Swipe');
  };

  // set monthlist with focus on december
  const decemberMonthList = () => {
    setDisplayYear(parseInt(year) + 1);
    const decMonthListCopy = [...MonthList];
    for (let i = 0; i < 2; i++) {
      decMonthListCopy.unshift(decMonthListCopy.pop());
    }
    setMonthList(decMonthListCopy);
    flatlistRef.current.scrollToIndex({ index: 6, animated: false });
    setIndexCounter(6);
  };
  // from Year params
  let fromYear = navigation.getParam('fromYear');
  // swipe left from yearscreen
  React.useEffect(() => {
    if (fromYear === 'December') {
      (fromYear = ''),
        // shift list to december
        decemberMonthList();
    }
  }, [fromYear]);

  React.useEffect(() => {
    // on first mount, thereafter it updates from changeMonthlist-function
    if (presets !== null) {
      filterOutPositiveNumsAndMonth(presetContext.month);
      filterOutNegativeNumsAndMonth(presetContext.month);
      calcMonthSum(presetContext.month);
      getMonthSavings(presetContext.month);
      calcMonthSavings(presetContext.month);
      MonthSum && calcMonthBalance();
      calcSum();
      setPurchase();
      calcCategoryByMonth(presetContext.month);
      getMonthPiggySavings(presetContext.month);
    }
  }, [presets]); // old dependencies: presetContext.month, presets, MonthSum

  React.useEffect(() => {
    filteredmonthandposnum && calcPosMonth(filteredmonthandposnum);
    filteredmonthandnegnum && calcNegMonth(filteredmonthandnegnum);
  }, [filteredmonthandnegnum, filteredmonthandposnum]);

  React.useEffect(() => {
    let monthpurchasewithpiggybank;
    let filteroutbymonth;
    let savedAmounts;
    let SumOfAllPiggyBanksByMonthByPreset;
    let TotalOfAllPiggybanksThisMonth;
    const calcPiggySavings = () => {
      // part one of getting the value for SumPiggybanksMonth used in monthstats
      // filters out presets that is type purchase and has piggybank savings
      monthpurchasewithpiggybank = presets.filter((preset) => preset.type === 'purchase' && preset.piggybank.length !== 0);
      //console.log(monthpurchasewithpiggybank);
      // filters out piggybankvalues made in active month and active year
      filteroutbymonth = monthpurchasewithpiggybank.map((purchase) =>
        purchase.piggybank.filter(
          (piggybank) =>
            piggybank.month === presetContext.month &&
            piggybank.savedAmount !== 0 &&
            piggybank.year.toString() === presetContext.year.toString()
        )
      );

      // store only savedAmounts in an array
      savedAmounts = filteroutbymonth.map((first) => first.map((second) => second.savedAmount));
      // sift through savedAmounts and count totalsum
      SumOfAllPiggyBanksByMonthByPreset = savedAmounts.map((inner) => inner.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)); //BUG crash in reduce from yearscreen to monthscreen
      TotalOfAllPiggybanksThisMonth = SumOfAllPiggyBanksByMonthByPreset.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
    };
    if (presets) {
      calcPiggySavings();
    }
    const createSavingsItem = () => {
      let i;
      let MyArray = [];
      for (i = 0; i < SumOfAllPiggyBanksByMonthByPreset.length; i++) {
        if (SumOfAllPiggyBanksByMonthByPreset[i] > 0) {
          MyArray.push({
            Item: monthpurchasewithpiggybank[i],
            SumOfPreset: SumOfAllPiggyBanksByMonthByPreset[i],
            key: monthpurchasewithpiggybank[i]._id,
          });
        }
      }
      return MyArray;
    };

    if (presets) {
      //calculates MonthPiggySavingsSums
      setMonthPiggySavingsSums(createSavingsItem());
    }
    TotalOfAllPiggybanksThisMonth && TotalOfAllPiggybanksThisMonth !== 0 && setTotalOfAllPiggybanksThisMonth(TotalOfAllPiggybanksThisMonth);
    // eslint-disable-next-line
  }, [presetContext.month, presets, year]);

  // Handles alert when wrong input is uploaded to csv-upload. Have to be here as if in children it will rerender with all children (windowSize+1).
  React.useEffect(() => {
    console.log('monthscreen here: ', contacterror);
    contacterror === 'Wrong filetype, only accepts csv!' && setAlert('Wrong filetype, only accepts csv!', 'danger');
    contacterror === 'CSV does not contain valid Nordea-values!' && setAlert('CSV does not contain valid Nordea-values!', 'danger');
    contacterror === 'CSV does not contain valid RFC4180-values!' && setAlert('CSV does not contain valid RFC4180-values!', 'danger');
    clearContactError();
  }, [contacterror]);

  // adjust flatlist when valid csv is loaded.
  const [FlatList_WindowSize, setFlatList_WindowSize] = React.useState(7);
  const [scrollEnabled, setScrollEnabled] = React.useState(true);
  React.useEffect(() => {
    if (csvpresets) {
      const csvWinSize = 1;
      setFlatList_WindowSize(csvWinSize);
      setScrollEnabled(false);
    } else {
      const swipeWinSize = 7;
      setFlatList_WindowSize(swipeWinSize);
      setScrollEnabled(true);
    }
  }, [csvpresets]);

  //renderItem
  const renderItem = (object) => {
    return (
      <SwipeItem
        index={object.index}
        activeindex={indexCounter}
        monthlist={MonthList}
        setMonthList={setMonthList}
        monthScrollRef={flatlistRef}
        changeMonthList={changeMonthList}
      />
    );
  };

  //jsx
  return (
    <>
      <FlatList
        scrollEnabled={scrollEnabled}
        windowSize={FlatList_WindowSize}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        removeClippedSubviews={false}
        ref={flatlistRef}
        data={MonthList}
        onScrollEndDrag={changeMonthList} // runs when movement finished
        snapToInterval={width}
        snapToAlignment={'start'}
        decelerationRate='fast'
        initialScrollIndex={_initialScrollIndex}
        horizontal
        keyExtractor={(item) => item.month}
        renderItem={renderItem}
        getItemLayout={(data, index) => {
          // this shows problem: getItemLayout runs every scroll. unnecessary?  console.log('get item layout ' + index);
          return { length: width, offset: width * index, index };
        }}
      />
    </>
  );
};

export default MonthScreen;
