import React from 'react';
import { View, Text, FlatList } from 'react-native';

import PresetContext from '../context/preset/presetContext';
import AuthContext from '../context/auth/authContext';

import PresetItem from './PresetItem';

const PresetFilter = ({ monthlist, activeindex, presetthismonth }) => {
  //console.log(presetthismonth);
  const presetContext = React.useContext(PresetContext);
  const { filteredmonthandposnum, presets, year } = presetContext;
  const authContext = React.useContext(AuthContext);
  const { loading } = authContext;
  const [localMonthFilter, setLocalMonthFilter] = React.useState(null);
  //console.log(monthlist[activeindex].month);
  if (presets && filteredmonthandposnum !== null && filteredmonthandposnum.length === 0 && !loading) {
    return <Text>Please add a Value</Text>;
  }
  //filteredmonthandposnum && filteredmonthandposnum.length !== 0 && console.log(filteredmonthandposnum[index].month);
  //console.log(filteredmonthandposnum);
  /*   React.useEffect(() => {
    const calcLocalMonthFilter = presets.filter(
      (preset) =>
        preset.month === monthlist[activeindex].month &&
        preset.number > 0 &&
        preset.type !== 'savings' &&
        preset.type !== 'capital' &&
        preset.type !== 'purchase' &&
        preset.year.toString() === year.toString() // multiple datatypes
    );
    setLocalMonthFilter(calcLocalMonthFilter);
  }, []); */
  //console.log(filteredmonthandposnum);
  return (
    <>
      {filteredmonthandposnum && (
        <FlatList
          data={filteredmonthandposnum}
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
