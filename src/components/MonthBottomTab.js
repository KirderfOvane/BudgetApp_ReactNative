import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../constants';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import AddToBudgetButton from './AddToBudgetButton';
import PresetContext from '../context/preset/presetContext';

const MonthBottomTab = ({ navigation }) => {
  const presetContext = React.useContext(PresetContext);

  return (
    <View style={styles.tab}>
      <TouchableOpacity onPress={() => presetContext.filterPresets(null)} style={styles.rowitem}>
        <Text style={styles.texticon}>Σ</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => presetContext.filterPresets('positive')} style={styles.rowitem}>
        <AntDesign style={styles.texticon} name='arrowup' size={36} color='black' />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => presetContext.filterPresets('negative')} style={styles.rowitem}>
        <AntDesign style={styles.texticon} name='arrowdown' size={36} color='black' />
      </TouchableOpacity>
      <Text style={styles.dummyobject}></Text>
      <AddToBudgetButton navigation={navigation} />
      <TouchableOpacity onPress={(e) => navigation.navigate('Category')} style={styles.rowitem}>
        <Entypo style={styles.texticon} name='grid' size={24} color='black' />
      </TouchableOpacity>
      <TouchableOpacity onPress={(e) => navigation.navigate('Purchase')} style={styles.rowitem}>
        <Fontisto style={styles.texticon} name='shopping-package' size={24} color='black' />
      </TouchableOpacity>
      <TouchableOpacity onPress={(e) => navigation.navigate('Piggybank')} style={styles.rowitem}>
        <FontAwesome5 style={styles.texticon} name='piggy-bank' size={24} color='black' />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  tab: {
    backgroundColor: theme.colors.dark,
    height: 78,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
    paddingHorizontal: 10,
  },
  rowitem: {
    flex: 1,
    fontSize: 34,
    textAlign: 'center',
    color: theme.colors.light,
    // borderWidth: 1,
    //borderColor: 'red',
  },
  texticon: {
    fontSize: 34,
    textAlign: 'center',
    color: theme.colors.light,
  },
  dummyobject: {
    flex: 2,

    width: 34,
  },
});

export default MonthBottomTab;
