import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

import DateMenu from './DateMenu';
import PresetPositiveFilterScreen from '../screens/PresetPositiveFilterScreen';
import YearBalance from '../components/YearBalance';

const SwipeItem = ({ monthlist, activeindex, index }) => {
  console.log(`imageurl: ${monthlist[index].image}`);
  // const [image,setImage] = React.useState()
  // const image = require(`../../assets/iphone_725x414/antelope-canyon_iphoneslices__3.jpg`);
  return (
    <View style={styles.container}>
      <DateMenu monthlist={monthlist} activeindex={activeindex} />
      <ImageBackground source={monthlist[index].image} style={styles.image}>
        {isNaN(monthlist[activeindex].month) ? (
          <PresetPositiveFilterScreen monthlist={monthlist} activeindex={activeindex} />
        ) : (
          <YearBalance />
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 414,
    height: 725,
    backgroundColor: 'gray',
  },
  containerflex: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default SwipeItem;
