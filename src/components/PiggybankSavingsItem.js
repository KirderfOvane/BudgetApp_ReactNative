import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { theme, icons } from '../constants';
const PiggybankSavingsItem = ({ purchases, year }) => {
  const [confirm, setConfirm] = React.useState(false);
  const onDelete = () => {
    console.log('dete');
    setConfirm(!confirm);
  };
  return (
    <FlatList
      data={purchases}
      keyExtractor={(purchase) => purchase._id}
      renderItem={(purchase) => {
        const { item } = purchase;
        /* Look witch year it is and filter out years above this year  */
        const filterpiggybanks = item.piggybank.filter((piggy) => piggy.year && piggy.year <= year);
        /*take the filtered yearlist and create a var for the sums saved */
        const sumoffilteredpiggybanks = filterpiggybanks.map((piggy) => piggy.savedAmount);
        /* sum up the amounts */
        const totalsum = sumoffilteredpiggybanks.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
        //console.log(purchase.item.piggybank);
        return (
          <View style={[styles.card, confirm ? { backgroundColor: 'red' } : null]}>
            <Text style={{ flex: 4, fontSize: 18, fontWeight: theme.fonts.weight.semibold }}>{purchase.item.name}</Text>
            {/*  <Text style={{ flex: 1 }}>{icons.getIcon('piggybank')}</Text> */}
            <View style={{ flex: 4, flexDirection: 'row' }}>
              <Text style={{ color: theme.colors.orange, fontSize: 18, paddingRight: 5 }}>{totalsum}</Text>
              {/* <Text style={{ flex: 1, color: theme.colors.light }}>of</Text> */}
              <Text style={{ color: theme.colors.gray }}>({purchase.item.number})</Text>
            </View>
            <TouchableOpacity onPress={onDelete}>
              <Text style={{ flex: 1 }}>{icons.getIcon('trashcan')}</Text>
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
};
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: theme.colors.gray,
    marginHorizontal: 25,
    marginVertical: 7,
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  cardItem: { flex: 1 },
});
export default PiggybankSavingsItem;
