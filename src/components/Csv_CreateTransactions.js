import React from 'react';
import { FlatList, View, Text } from 'react-native';
import CsvContext from '../context/csv/csvContext';
import CsvPresetItem from './CsvPresetItem';
import Csv_CreateTransactions_Footer from './Csv_CreateTransactions_Footer';
import CsvPrompt from './CsvPrompt';

const Csv_CreateTransactions = () => {
  // context
  const csvContext = React.useContext(CsvContext);
  const { csvpresets, submitCsvItems, clearCsv } = csvContext;

  // state
  const [Prompt, setPrompt] = React.useState(false);
  const [clickAdd, setClickAdd] = React.useState(false);
  const [validCsv, setValidCsv] = React.useState(null);
  // useRef
  const flatList = React.useRef();
  // focus on item when clicked on.
  const isFocused = (index) => {
    flatList.current.scrollToIndex({ index });
  };

  // useEffect
  React.useEffect(() => {
    if (csvpresets) {
      console.log('csvpreset ran');
      //check for valid csv to add
      const isValidCsv = csvpresets.filter((item) => (item.category !== undefined && item.markDelete === false ? item : null));
      setValidCsv(isValidCsv);
      // isValidCsv ? setValidCsv(isValidCsv) : setValidCsv([]);
      console.log(isValidCsv.length, clickAdd);
      // if no valid csv items at all
      if (isValidCsv.length === 0 && clickAdd) {
        console.log('ran');
        submitCsvItems('noValidCsv');
        setPrompt(true);
      } else {
        // if no invalid csv items submit,otherwise setPrompt to true
        if (isValidCsv.length !== 0 && isValidCsv.length !== csvpresets.length) {
          submitCsvItems('step1');
          setPrompt(true);
        } else if (isValidCsv.length !== 0) {
          submitCsvItems('submit');
        }
        if (csvpresets.length <= 1) {
          clearCsv();
          setPrompt(false);
        }
        console.log('no action on csvpresets change');
      }
    }
    //eslint-disable-next-line
  }, [csvpresets, clickAdd]); //breaks if you add clearCsv and submitCsvItems

  // renderItem
  const renderItem = (csvpreset) => {
    return <CsvPresetItem preset={csvpreset} isFocused={isFocused} />;
  };

  return (
    <>
      {Prompt && csvpresets && <CsvPrompt setPrompt={setPrompt} validCsv={validCsv} csvpresets={csvpresets} setClickAdd={setClickAdd} />}

      <FlatList
        style={Prompt && { display: 'none' }}
        data={csvpresets}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ref={flatList}
        ListFooterComponent={<Csv_CreateTransactions_Footer clickAdd={clickAdd} setClickAdd={setClickAdd} setPrompt={setPrompt} />}
      />
    </>
  );
};

export default Csv_CreateTransactions;
