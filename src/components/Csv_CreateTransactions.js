import React from 'react';
import { FlatList, View, Text } from 'react-native';
import PresetContext from '../context/preset/presetContext';
import CsvPresetItem from './CsvPresetItem';
import Csv_CreateTransactions_Footer from './Csv_CreateTransactions_Footer';
import CsvPrompt from './CsvPrompt';

const Csv_CreateTransactions = ({ onSubmit }) => {
  // context
  const { csvpresets } = React.useContext(PresetContext);
  //console.log(csvpresets.length);
  // state
  const [Prompt, setPrompt] = React.useState(false);
  const [validCsv, setValidCsv] = React.useState(null);

  // useRef
  const flatList = React.useRef();
  // focus on item when clicked on.
  const isFocused = (index) => {
    flatList.current.scrollToIndex({ index });
  };

  // renderItem
  const renderItem = (csvpreset) => {
    return <CsvPresetItem preset={csvpreset} isFocused={isFocused} />;
  };

  return (
    <>
      {Prompt && csvpresets ? (
        <CsvPrompt setPrompt={setPrompt} validCsv={validCsv} csvpresets={csvpresets} />
      ) : (
        <FlatList
          data={csvpresets}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ref={flatList}
          ListFooterComponent={<Csv_CreateTransactions_Footer setValidCsv={setValidCsv} setPrompt={setPrompt} />}
        />
      )}
    </>
  );
};

export default Csv_CreateTransactions;
