import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../constants';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import PresetContext from '../context/preset/presetContext';

const PurchaseItem = ({ Item }) => {
  const presetContext = React.useContext(PresetContext);
  const { MonthBalance, PosMonthSum, NegMonthSum } = presetContext;
  // console.log(MonthBalance);
  //state
  const [MonthsLeftBeforePurchase, setMonthsLeftBeforePurchase] = React.useState('');
  //logic
  const onSave = () => {
    console.log('pressed');
  };

  const onDelete = () => {
    console.log('delete');
  };

  // what to show on button
  const calcPiggybankSum = () => {
    // store only savedAmounts in an array
    const savedAmounts = Item.piggybank.map((item) => item.savedAmount);
    // sift through savedAmounts and count totalsum
    const SumOfPiggybanks = savedAmounts.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
    const ItemAfterPiggy = Item.number - SumOfPiggybanks;
    let MonthsLeft;
    MonthBalance > 0 && MonthBalance !== null
      ? (MonthsLeft = parseInt(parseFloat(ItemAfterPiggy) / parseFloat(MonthBalance)))
      : (MonthsLeft = '+50');

    setMonthsLeftBeforePurchase(MonthsLeft);
  };

  //updates purchase values after modal change
  React.useEffect(() => {
    calcPiggybankSum();
    // eslint-disable-next-line
  }, [MonthBalance, Item]);

  return (
    <View style={styles.itemcard}>
      <Text style={[styles.text, { flex: 1 }]}>{Item.name}</Text>
      <Text type='number' style={[styles.text, { textAlign: 'center' }, { color: theme.colors.orange }, { flex: 1 }]}>
        {Item.number}
      </Text>
      <TouchableOpacity onPress={onSave} style={{ alignSelf: 'center', paddingHorizontal: 10 }}>
        <FontAwesome5 name='piggy-bank' size={24} color={theme.colors.orange} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onSave} style={styles.monthsleftbutton}>
        <Text style={styles.buttontext}>{MonthsLeftBeforePurchase}</Text>
        <Text style={styles.buttontext}>Months</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <MaterialIcons name='delete-forever' size={34} color={theme.colors.gray} />
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
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  text: {
    fontSize: theme.sizes.base,
    fontWeight: theme.fonts.weight.semibold,
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
});
export default PurchaseItem;
