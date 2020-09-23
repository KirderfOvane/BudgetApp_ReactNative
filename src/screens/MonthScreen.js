import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, KeyboardAvoidingView } from 'react-native';

import PresetContext from '../context/preset/presetContext';
import AuthContext from '../context/auth/authContext';

import SwipeItem from '../components/SwipeItem';
import YearBalanceScreen from './YearBalanceScreen';
import FH_ActivityIndicator from '../components/FH_ActivityIndicator';

const MonthScreen = ({ navigation }) => {
  //context
  const presetContext = React.useContext(PresetContext);
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
  } = presetContext;
  const { loading } = authContext;

  //console.log('################');
  //console.log(prefilter[0]);
  //state

  const [displayYear, setDisplayYear] = React.useState(year);
  const [_initialScrollIndex, set_InitialScrollIndex] = React.useState(6);
  const [indexCounter, setIndexCounter] = React.useState(_initialScrollIndex);
  const [Lastoffset, setLastOffset] = React.useState(0); // used to check if offset occured to see if swipe occured
  const [lastSwipe, setLastSwipe] = React.useState(''); // used to tell Balance-screen what month we swiped from
  /*  const [MonthList, setMonthList] = React.useState([
    {
      // data: prefilter[7],
      month: 'August',
      //monthIncomeSum: prefilter[7][2],
      // monthExpenseSum: prefilter[7][3],
      image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__1.jpg'),
    },
    {
      // data: prefilter[8],
      month: 'September',
      // monthIncomeSum: prefilter[8][2],
      // monthExpenseSum: prefilter[8][3],
      image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__2.jpg'),
    },
    {
      // data: prefilter[9],
      month: 'October',
      //  monthIncomeSum: prefilter[9][2],
      // monthExpenseSum: prefilter[9][3],
      image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__3.jpg'),
    },
    {
      // data: prefilter[10],
      month: 'November',
      //   monthIncomeSum: prefilter[10][2],
      //  monthExpenseSum: prefilter[10][3],
      image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__4.jpg'),
    },
    {
      // data: prefilter[11],
      month: 'December',
      //   monthIncomeSum: prefilter[11][2],
      // monthExpenseSum: prefilter[11][3],
      image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__5.jpg'),
    },
    {
      //  data: [[], []],
      month: displayYear.toString(),
      //  monthIncomeSum: [11][2],
      //monthExpenseSum: prefilter[11][3],
      image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__6.jpg'),
    },
    {
      data: prefilter[0],
      month: 'January',
      //  monthIncomeSum: prefilter[0][2],
      // monthExpenseSum: prefilter[0][3],
      image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__7.jpg'),
    },
    {
      data: prefilter[1],
      month: 'February',
      //  monthIncomeSum: prefilter[1][2],
      //  monthExpenseSum: prefilter[1][3],
      image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__8.jpg'),
    },
    {
      data: prefilter[2],
      month: 'March',
      // monthIncomeSum: prefilter[2][2],
      // monthExpenseSum: prefilter[2][3],
      image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__9.jpg'),
    },
    {
      data: prefilter[3],
      month: 'April',
      //  monthIncomeSum: prefilter[3][2],
      //monthExpenseSum: prefilter[3][3],
      image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__10.jpg'),
    },
    {
      data: prefilter[4],
      month: 'May',
      //  monthIncomeSum: prefilter[4][2],
      //  monthExpenseSum: prefilter[4][3],
      image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__11.jpg'),
    },
    {
      data: prefilter[5],
      month: 'June',
      //    monthIncomeSum: prefilter[5][2],
      //monthExpenseSum: prefilter[5][3],
      image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__12.jpg'),
    },
    {
      data: prefilter[6],
      month: 'July',
      //    monthIncomeSum: prefilter[6][2],
      // monthExpenseSum: prefilter[6][3],
      image: require('../../assets/iphone_725x414/antelope-canyon_iphoneslices__13.jpg'),
    },
  ]); */

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

  //logic
  const changeMonthList = (e) => {
    const swipeoffset = e.nativeEvent.targetContentOffset.x;
    const newindex = swipeoffset / width;

    setIndexCounter(newindex);

    //check if swipe happened
    if (swipeoffset !== Lastoffset) {
      //check DIRECTION
      if (Lastoffset > swipeoffset) {
        //swipe left

        //year navigation
        if (!isNaN(MonthList[newindex].month)) {
          setYear(parseInt(year) - 1);
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
        if (MonthList[newindex].month === 'November') {
          //   console.log('yeardisplayadjust');
          setDisplayYear(parseInt(year) - 1);
        }
        setLastSwipe('left');
        const counter = _initialScrollIndex - newindex;
        //console.log(`counter: ${counter}`);
        if (counter >= 4) {
          const tempMonthListCopy = [...MonthList];
          for (let i = 0; i < 4; i++) {
            tempMonthListCopy.unshift(tempMonthListCopy.pop());
          }
          //console.log(tempMonthListCopy);
          setMonthList(tempMonthListCopy);
          flatlistRef.current.scrollToIndex({ index: 6, animated: false });
          setIndexCounter(6);
        }
      } else {
        //swipe right

        //year navigation
        if (!isNaN(MonthList[newindex].month)) {
          setYear(parseInt(year) + 1);
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
        //console.log(counter);
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
      setLastOffset(e.nativeEvent.targetContentOffset.x);
    } else null; //console.log('No Swipe');
  };

  // set monthlist with focus on december
  const decemberMonthList = () => {
    // console.log('decran');
    setDisplayYear(parseInt(year) + 1);
    const decMonthListCopy = [...MonthList];
    for (i = 0; i < 2; i++) {
      decMonthListCopy.unshift(decMonthListCopy.pop());
      // console.log(tempMonthListCopy);
    }
    // console.log(tempMonthListCopy.map((month) => month.month));
    // console.log(tempMonthListCopy);
    setMonthList(decMonthListCopy);
    flatlistRef.current.scrollToIndex({ index: 6, animated: false });
    setIndexCounter(6);
  };
  // from Year params
  let fromYear = navigation.getParam('fromYear');
  //console.log(year);
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
  }, []); // old dependencies: presetContext.month, presets, MonthSum

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
      // console.log('////////////////////////////');
      //  console.log(SumOfAllPiggyBanksByMonthByPreset);
      //console.log(monthpurchasewithpiggybank);
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

      // console.log(MyArray);
      return MyArray;
    };

    if (presets) {
      //calculates MonthPiggySavingsSums
      setMonthPiggySavingsSums(createSavingsItem());
    }
    TotalOfAllPiggybanksThisMonth && TotalOfAllPiggybanksThisMonth !== 0 && setTotalOfAllPiggybanksThisMonth(TotalOfAllPiggybanksThisMonth);
    // eslint-disable-next-line
  }, [presetContext.month, presets, year]);
  //renderItem
  const renderItem = (object) => {
    return (
      <SwipeItem
        index={object.index}
        // key={object.item.month}
        activeindex={indexCounter}
        monthlist={MonthList}
        setMonthList={setMonthList}

        // presetByMonth={object.item.data}
        // monthIncomeSum={object.item.monthIncomeSum}
        // monthExpenseSum={object.item.monthExpenseSum}
      />
    );
  };
  //jsx
  return (
    <>
      {/*  {loading ? (
        <FH_ActivityIndicator position={'absolute'} />
      ) : ( */}
      <FlatList
        windowSize={3}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        removeClippedSubviews={false}
        ref={flatlistRef}
        data={MonthList}
        //extraData={presetContext.month}
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
      {/*   )} */}
    </>
  );
};

export default MonthScreen;
