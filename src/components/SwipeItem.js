import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import DateMenu from './DateMenu';
import PresetPositiveFilter from './PresetPositiveFilter';
import PresetNegativeFilter from './PresetNegativeFilter';
import AddToBudget from './AddToBudget';
import YearBalance from '../components/YearBalance';
import PresetContext from '../context/preset/presetContext';

const SwipeItem = ({ monthlist, activeindex, index }) => {
  //context
  const presetContext = React.useContext(PresetContext);
  //context destruct
  const { filtered } = presetContext;

  return (
    <View style={styles.container}>
      <DateMenu monthlist={monthlist} activeindex={activeindex} />
      <ImageBackground source={monthlist[index].image} style={styles.image}>
        {isNaN(monthlist[activeindex].month) ? (
          <>
            {filtered === null || filtered === 'positive' ? <PresetPositiveFilter monthlist={monthlist} activeindex={activeindex} /> : null}
            {filtered === null || filtered === 'negative' ? <PresetNegativeFilter monthlist={monthlist} activeindex={activeindex} /> : null}
            {filtered === 'add' ? <AddToBudget month={monthlist[activeindex].month} /> : null}
          </>
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
