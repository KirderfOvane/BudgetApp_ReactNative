import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

//icons
import { AntDesign } from '@expo/vector-icons';
import { theme } from '../constants';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.icons} onPress={() => Linking.openURL('http://google.com')}>
        <AntDesign name='instagram' size={24} color='white' />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icons} onPress={() => Linking.openURL('https://twitter.com/imessi')}>
        <AntDesign name='twitter' size={24} color='white' />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icons} onPress={() => Linking.openURL('http://google.com')}>
        <AntDesign name='facebook-square' size={24} color='white' />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  footer: {
    height: 100,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.dark,
  },
  icons: {
    padding: 15,
  },
});
export default Footer;
