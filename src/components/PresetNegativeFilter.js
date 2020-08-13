import React from 'react';
import { View, Text, FlatList } from 'react-native';

import PresetContext from '../context/preset/presetContext';
import AuthContext from '../context/auth/authContext';

import PresetItem from './PresetItem';

const PresetNegativeFilter = ({ monthlist, activeindex }) => {
  const presetContext = React.useContext(PresetContext);
  const { filteredmonthandnegnum, filterOutPositiveNumsAndMonth, presets } = presetContext;
  const authContext = React.useContext(AuthContext);
  const { loading } = authContext;

  // console.log(index);
  if (presets && filteredmonthandnegnum !== null && filteredmonthandnegnum.length === 0 && !loading) {
    return <Text>Please add a Value</Text>;
  }
  //filteredmonthandnegnum && filteredmonthandnegnum.length !== 0 && console.log(filteredmonthandnegnum[index].month);
  //console.log(filteredmonthandnegnum);

  return (
    <>
      <FlatList
        data={filteredmonthandnegnum}
        keyExtractor={(preset) => preset._id}
        renderItem={(preset) => {
          return <PresetItem preset={preset} key={preset._id} />;
        }}
      />
    </>
  );
};

export default PresetNegativeFilter;
