import React from 'react';
import { View, Text, FlatList } from 'react-native';

import PresetContext from '../context/preset/presetContext';
import AuthContext from '../context/auth/authContext';

import PresetItem from './PresetItem';

const PresetPositiveFilter = ({ monthlist, activeindex }) => {
  const presetContext = React.useContext(PresetContext);
  const { filteredmonthandposnum, presets } = presetContext;
  const authContext = React.useContext(AuthContext);
  const { loading } = authContext;

  //console.log(presets);
  if (presets && filteredmonthandposnum !== null && filteredmonthandposnum.length === 0 && !loading) {
    return <Text>Please add a Value</Text>;
  }
  //filteredmonthandposnum && filteredmonthandposnum.length !== 0 && console.log(filteredmonthandposnum[index].month);
  //console.log(filteredmonthandposnum);

  return (
    <>
      <FlatList
        data={filteredmonthandposnum}
        keyExtractor={(preset) => preset._id}
        renderItem={(preset) => {
          return <PresetItem preset={preset} key={preset._id} />;
        }}
      />
    </>
  );
};

export default PresetPositiveFilter;
