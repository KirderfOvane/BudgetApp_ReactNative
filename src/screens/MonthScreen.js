import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';

import MonthItemScreen from './MonthItemScreen';

const MonthScreen = ({ navigation }) => {
  const [_initialScrollIndex, set_InitialScrollIndex] = React.useState(6);
  const [indexCounter, setIndexCounter] = React.useState(_initialScrollIndex);
  const [Lastoffset, setLastOffset] = React.useState(0); // used to check if offset occured to see if swipe occured
  const [MonthList, setMonthList] = React.useState([
    { month: 'August' },
    { month: 'September' },
    { month: 'October' },
    { month: 'November' },
    { month: 'December' },
    { month: '2019' },
    { month: 'January' },
    { month: 'February' },
    { month: 'March' },
    { month: 'April' },
    { month: 'May' },
    { month: 'June' },
    { month: 'July' },
  ]);
  const { width, height } = Dimensions.get('window');

  const flatlistRef = React.useRef(null);

  const changeMonthList = (e) => {
    const swipeoffset = e.nativeEvent.targetContentOffset.x;
    const newindex = swipeoffset / width;
    setIndexCounter(newindex);
    // console.log(MonthList[newindex].month);

    //console.log(isNaN(MonthList[newindex].month));
    //check if year happened
    if (!isNaN(MonthList[newindex].month)) {
      console.log('year selected!');
      navigation.navigate('yearFlow');
    }
    //check if swipe happened
    if (swipeoffset !== Lastoffset) {
      //check direction
      if (Lastoffset > swipeoffset) {
        //swipe left
        console.log('swiped left');
        const counter = _initialScrollIndex - newindex;

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
        console.log('swiped rigth');
        const counter = newindex - _initialScrollIndex;

        if (counter >= 4) {
          const tempMonthListCopy = [...MonthList];
          for (i = 0; i < 9; i++) {
            tempMonthListCopy.unshift(tempMonthListCopy.pop());
          }
          // console.log(tempMonthListCopy);
          setMonthList(tempMonthListCopy);
          flatlistRef.current.scrollToIndex({ index: 6, animated: false });
        }
      }
      setLastOffset(e.nativeEvent.targetContentOffset.x);
    } else console.log('No Swipe');
  };

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
        return <MonthItemScreen name={object.item.month} key={object.item.index} index={indexCounter} monthlist={MonthList} />;
      }}
      getItemLayout={(data, index) => {
        // this shows problem: getItemLayout runs every scroll. unnecessary?  console.log('get item layout ' + index);
        return { length: width, offset: width * index, index };
      }}
    />
  );
};

export default MonthScreen;
