import React from 'react';
import { View, Text, FlatList } from 'react-native';
import PresetContext from '../context/preset/presetContext';
import CsvPresetItem from './CsvPresetItem';
const Csv_CreateTransactions = () => {
  const { csvpresets } = React.useContext(PresetContext);
  const flatList = React.useRef();
  const isFocused = (index) => {
    console.log(index);
    flatList.current.scrollToIndex({ index });
  };
  const renderItem = (csvpreset) => {
    return <CsvPresetItem preset={csvpreset} isFocused={isFocused} />;
  };

  return <FlatList data={csvpresets} keyExtractor={(item) => item.id} renderItem={renderItem} ref={flatList} />;
};

export default Csv_CreateTransactions;
