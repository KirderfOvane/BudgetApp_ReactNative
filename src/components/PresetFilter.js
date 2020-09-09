import React from 'react';
import { View, Text, FlatList } from 'react-native';

import PresetContext from '../context/preset/presetContext';
import AuthContext from '../context/auth/authContext';

import PresetItem from './PresetItem';
import FH_ActivityIndicator from './FH_ActivityIndicator';

const PresetFilter = ({ data }) => {
  const authContext = React.useContext(AuthContext);
  const presetContext = React.useContext(PresetContext);
  const { loading } = authContext;
  const { calculating } = presetContext;
  /*   const presetContext = React.useContext(PresetContext);
  const { filteredmonthandposnum } = presetContext; */
  //console.log(filteredmonthandposnum);
  if (data && data.length === 0 && !loading) {
    return <Text>Please add a Value</Text>;
  }

  /*  const [total, setTotal] = React.useState(0);
  React.useEffect(() => {
    //console.log('############');
    let counter = 0;
    presetthismonth.map((preset) => (counter = counter + preset.number));
    setTotal(counter);
  }, [presetContext.year]); */

  return (
    <>
      {data === null || calculating ? (
        <FH_ActivityIndicator position={'relative'} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(preset) => preset._id}
          renderItem={(preset) => {
            return <PresetItem preset={preset} key={preset._id} />;
          }}
        />
      )}
    </>
  );
};

export default PresetFilter;
