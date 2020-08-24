import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

function getIcon(name) {
  switch (name) {
    case 'commute':
      return <MaterialCommunityIcons name='train-car' size={24} color='black' />;
    case 'car':
      return <FontAwesome5 name='car-alt' size={24} color='black' />;
    case 'delete':
      return <Feather name='delete' size={24} color='#eaeaea' />;
    default:
      return <MaterialCommunityIcons name='train-car' size={24} color='black' />;
  }
}

export { getIcon };
