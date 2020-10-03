import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

function getIcon(name) {
  switch (name) {
    case 'commute':
      return <MaterialCommunityIcons name='train-car' size={24} color='black' />;
    case 'car':
      return <FontAwesome5 name='car-alt' size={24} color='black' />;
    case 'travel':
      return <Ionicons name='md-airplane' size={24} color='black' />;
    case 'food':
      return <MaterialIcons name='shopping-cart' size={24} color='black' />;
    case 'housing':
      return <Entypo name='home' size={24} color='black' />;
    case 'insurance':
      return <Ionicons name='md-umbrella' size={24} color='black' />;
    case 'child benefit':
      return <MaterialIcons name='child-friendly' size={24} color='black' />;
    case 'childcare':
      return <MaterialIcons name='pregnant-woman' size={24} color='black' />;
    case 'salary':
      return <MaterialCommunityIcons name='briefcase' size={24} color='black' />;
    case 'sport activities':
      return <MaterialCommunityIcons name='tennis' size={24} color='black' />;
    case 'clothing':
      return <FontAwesome5 name='tshirt' size={24} color='black' />;
    case 'entertainment electronics':
      return <MaterialCommunityIcons name='controller-classic' size={24} color='black' />;
    case 'entertainment subscriptions':
      return <Entypo name='ccw' size={24} color='black' />;
    case 'entertainment hobby':
      return <FontAwesome name='book' size={24} color='black' />;
    case 'phone':
      return <Entypo name='phone' size={24} color='black' />;
    case 'internet':
      return <FontAwesome5 name='wifi' size={24} color='black' />;
    case 'computer':
      return <SimpleLineIcons name='screen-desktop' size={24} color='black' />;
    case 'giving':
      return <Feather name='package' size={24} color='black' />;
    case 'student loan':
      return <MaterialIcons name='school' size={24} color='black' />;
    case 'electrical bill':
      return <Entypo name='power-plug' size={24} color='black' />;
    case 'reminderfees':
      return <AntDesign name='bells' size={24} color='black' />;
    case 'bank fee':
      return <MaterialIcons name='payment' size={24} color='black' />;
    case 'delete':
      return <Feather name='delete' size={24} color='#eaeaea' />;
    case 'delete_dark':
      return <Feather name='delete' size={24} color='black' />;
    case 'gift':
      return <Feather name='gift' size={24} color='black' />;
    case 'piggybank':
      return <FontAwesome5 name='piggy-bank' size={20} color='black' />;
    case 'trashcan':
      return <MaterialIcons name='delete-forever' size={28} color='gray' />;
    default:
      return <MaterialCommunityIcons name='train-car' size={24} color='black' />;
  }
}

export { getIcon };
