import React from 'react';
import { View, Text } from 'react-native';

const CsvPrompt = ({ setPrompt, validCsv, csvpresets }) => {
  // console.log('csvpromptreached');
  //console.log(validCsv);
  return (
    <View>
      <Text>
        {csvpresets.length - validCsv.length} of {csvpresets.length}
        transactions does not have a category selected
      </Text>
    </View>
  );
};

export default CsvPrompt;
