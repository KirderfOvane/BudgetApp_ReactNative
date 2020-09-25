import React from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import Constants from 'expo-constants';
import PresetItem from './PresetItem';
import PresetContext from '../context/preset/presetContext';
import MonthStats from './MonthStats';
import FH_ActivityIndicator from '../components/FH_ActivityIndicator';
const FH_SectionList = ({ posData, negData }) => {
  const presetContext = React.useContext(PresetContext);
  const { filtered } = presetContext;

  const [localSections, setLocalSections] = React.useState([
    {
      title: 'Income',
      data: [],
    },
    {
      title: 'Expenses',
      data: [],
    },
  ]);
  const [localData, setLocalData] = React.useState({ m: '', p: '', n: '' });

  React.useEffect(() => {
    if (localData.m === presetContext.month && localData.p === posData.length && localData.n === negData.length) {
      null;
    } else {
      posData && negData && setLocalData({ m: presetContext.month, p: posData.length, n: negData.length });
    }
  }, [presetContext.month, posData, negData, localData]);
  React.useEffect(() => {
    if (localData.m === presetContext.month && localData.p === posData.length && localData.n === negData.length) {
      filtered === 'positive' &&
        setLocalSections([
          {
            title: 'Income',
            data: posData,
          },
        ]);
      filtered === 'negative' &&
        setLocalSections([
          {
            title: 'Expenses',
            data: negData,
          },
        ]);
      filtered === null &&
        setLocalSections([
          {
            title: 'Income',
            data: posData,
          },
          {
            title: 'Expenses',
            data: negData,
          },
        ]);
    }
  }, [filtered, localData]);

  if (localData.m === presetContext.month && localData.p === posData.length && localData.n === negData.length) {
    return (
      <>
        <SectionList
          initialNumToRender={7}
          removeClippedSubviews={true}
          sections={localSections}
          extraData={localData}
          keyExtractor={(item) => item._id}
          renderItem={(preset) => {
            return <PresetItem preset={preset} />;
          }}
          ListHeaderComponent={<MonthStats />}
          renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
        />
      </>
    );
  } else return <FH_ActivityIndicator />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
    textAlign: 'center',
    paddingVertical: 25,
  },
  name: {
    flex: 1,
    fontSize: 24,
  },
});

export default FH_SectionList;
