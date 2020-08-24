import React from 'react';
import { View, Text, FlatList } from 'react-native';

import PresetContext from '../context/preset/presetContext';
import AuthContext from '../context/auth/authContext';

import PresetItem from './PresetItem';
import FH_ActivityIndicator from './FH_ActivityIndicator';

const PresetFilter = ({ presetthismonth }) => {
  const authContext = React.useContext(AuthContext);
  const { loading } = authContext;
  const presetContext = React.useContext(PresetContext);

  if (presetthismonth && presetthismonth.length === 0 && !loading) {
    return <Text>Please add a Value</Text>;
  }

  const [total, setTotal] = React.useState(0);
  React.useEffect(() => {
    console.log('############');
    let counter = 0;
    presetthismonth.map((preset) => (counter = counter + preset.number));
    setTotal(counter);
  }, [presetContext.year]);
  return (
    <>
      <View>
        <Text>{total}</Text>
      </View>
      {presetthismonth && loading === false ? (
        <FlatList
          data={presetthismonth}
          keyExtractor={(preset) => preset._id}
          renderItem={(preset) => {
            return <PresetItem preset={preset} key={preset._id} />;
          }}
        />
      ) : (
        {
          /* <FH_ActivityIndicator position={'relative'} /> */
        }
      )}
    </>
  );
};

export default PresetFilter;
