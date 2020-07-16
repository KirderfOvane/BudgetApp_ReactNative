import React from 'react';
import { View, Text, FlatList } from 'react-native';

import PresetContext from '../context/preset/presetContext';
import AuthContext from '../context/auth/authContext';

import PresetItem from '../components/PresetItem';

const PresetPositiveFilterScreen = ({ monthlist, index }) => {
  const presetContext = React.useContext(PresetContext);
  const { filteredmonthandposnum } = presetContext;
  const authContext = React.useContext(AuthContext);
  const { loading } = authContext;
  React.useEffect(() => {
    presetContext.filterOutPositiveNumsAndMonth(monthlist[index].month);
    console.log('checked month');
  }, [index]);
  // console.log(index);
  if (filteredmonthandposnum !== null && filteredmonthandposnum.length === 0 && !loading) {
    return <Text>Please add a Value</Text>;
  }
  filteredmonthandposnum && filteredmonthandposnum.length !== 0 && console.log(filteredmonthandposnum[0].month);
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

export default PresetPositiveFilterScreen;
