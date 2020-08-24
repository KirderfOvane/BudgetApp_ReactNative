import React from 'react';
import { StyleSheet, View, Dimensions, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';

import PresetContext from '../context/preset/presetContext';

const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function YearSavingsScreen() {
  const [_initialScrollIndex, set_InitialScrollIndex] = React.useState(6);
  const [indexCounter, setIndexCounter] = React.useState(_initialScrollIndex);
  const [Lastoffset, setLastOffset] = React.useState(0); // used to check if offset occured to see if swipe occured
  const [lastSwipe, setLastSwipe] = React.useState(''); // used to tell Balance-screen what month we swiped from
  // refs
  const { width, height } = Dimensions.get('window');
  const flatlistRef = React.useRef(null);

  //logic
  const onMovement = (e) => {
    const swipeoffset = e.nativeEvent.targetContentOffset.x;
    const newindex = swipeoffset / width;
    setIndexCounter(newindex);

    //check if swipe happened
    if (swipeoffset !== Lastoffset) {
      //check direction
      if (Lastoffset > swipeoffset) {
        //swipe left

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
          // flatlistRef.current.scrollToIndex({ index: 6, animated: false });
          setIndexCounter(6);
        }
      } else {
        //swipe right
        console.log('swipe right');
      }
      setLastOffset(e.nativeEvent.targetContentOffset.x);
    } else null; //console.log('No Swipe');
  };
  const [test, setTest] = React.useState([]);

  const contextData = [
    { id: 1, pagedata: 1000 },
    { id: 2, pagedata: 40 },
    { id: 3, pagedata: 450 },
    { id: 4, pagedata: 70 },
    { id: 5, pagedata: 190 },
  ];
  React.useState(() => {
    setTest(contextData);
    input && txtref.current.focus();
  }, []);
  const [input, toggleInput] = React.useState(false);

  const txtref = React.useRef();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={test}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          //console.log('#####');
          // console.log(item.pagedata);

          return (
            <View style={{ flex: 1 }}>
              {input ? (
                <NestedComponent txtref={txtref} item={item} />
              ) : (
                <TouchableOpacity onPress={() => toggleInput(!input)}>
                  <Text style={{ fontSize: 54 }}>{item.pagedata}</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />
      {input && (
        <TouchableOpacity onPress={() => toggleInput(!input)}>
          <Text style={{ fontSize: 35 }}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

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

function NestedComponent({ item, txtref }) {
  console.log(item);
  const [localPagedata, setLocalPagedata] = React.useState({ id: item.id, page: item.pagedata });
  const onChangeText = (newTxt) => {
    setLocalPagedata({ ...localPagedata, page: newTxt });
  };
  const onBlur = () => {
    console.log('shit got blurry');
  };
  return (
    <TextInput
      style={{ borderWidth: 3, padding: 15, margin: 5, color: 'black', flex: 1 }}
      name={'whatever'}
      value={localPagedata.id}
      onChangeText={onChangeText}
      ref={txtref}
      onBlur={onBlur}
    />
  );
}
