import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme, icons } from '../constants';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import PresetContext from '../context/preset/presetContext';

const MonthSavingsItem = ({ name, sum, category, isPiggyBankSaving }) => {
  // context

  //state

  //logic
  const onSave = () => {
    console.log('pressed');
  };

  const onDelete = () => {
    console.log('delete');
  };

  return (
    <View style={styles.itemcard}>
      <Text style={[styles.text, { flex: 3 }]}>{name}</Text>
      <Text type='number' style={[styles.text, { textAlign: 'center' }, { color: theme.colors.orange }, { flex: 3 }]}>
        {sum}
      </Text>
      {isPiggyBankSaving ? (
        <TouchableOpacity onPress={onSave} style={{ alignSelf: 'center', flex: 1 }}>
          <FontAwesome5 name='piggy-bank' size={20} color={theme.colors.orange} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onSave} style={{ alignSelf: 'center', flex: 1 }}>
          <FontAwesome5 name='piggy-bank' size={20} color='white' />
        </TouchableOpacity>
      )}
      <TouchableOpacity style={{ alignSelf: 'flex-start', paddingTop: 10, flex: 1 }}>
        <Text>{icons.getIcon(category.toLowerCase())}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onDelete} style={{ alignSelf: 'center', flex: 1 }}>
        <MaterialIcons name='delete-forever' size={30} color={theme.colors.gray} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: theme.sizes.h3,
    fontWeight: theme.fonts.weight.bold,
    color: theme.colors.gray,
    textAlign: 'center',
    paddingVertical: 15,
  },

  buttontext: {
    //  paddingHorizontal: 1,
    color: theme.colors.gray,
    fontSize: theme.sizes.base,
    fontWeight: theme.fonts.weight.semibold,
  },
  monthsleftbutton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: theme.colors.gray,
    paddingHorizontal: 2,
  },
  card: {
    flex: 1,
    backgroundColor: theme.colors.light,
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 30,
    borderWidth: 4,
    borderRadius: 16,
    borderColor: theme.colors.dark,
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'center',
  },
  itemcard: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.colors.dark,
    height: 60,
    paddingVertical: 10,
    marginVertical: 5,
    paddingLeft: 10,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  text: {
    fontSize: theme.sizes.base,
    fontWeight: theme.fonts.weight.semibold,
    alignSelf: 'center',
    paddingHorizontal: 5,
  },
});
export default MonthSavingsItem;
