import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { AntDesign } from '@expo/vector-icons';

const CustomGoBack = ({ navigation }) => {
  const goBack = () => {
    if (navigation.state.index !== 0) {
      navigation.navigate('User');
    } else {
      navigation.navigate('Balance');
    }
  };
  return (
    <TouchableOpacity onPress={goBack}>
      <AntDesign name='left' size={24} color='white' style={{ paddingLeft: 15 }} />
    </TouchableOpacity>
  );
};

export default withNavigation(CustomGoBack);
