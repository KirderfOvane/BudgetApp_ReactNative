import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import PresetContext from '../context/preset/presetContext';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const AddToBudgetButton = ({ navigation }) => {
  //context
  const presetContext = React.useContext(PresetContext);
  const { filtered } = presetContext;
  // useEffect
  React.useEffect(() => {
    filtered === 'add' ? setButtonColor({ top: '#FB0644', bottom: '#7E0322' }) : setButtonColor({ top: '#8C8C8C', bottom: '#FFFFFF' });
  }, [filtered]);

  //state
  const [buttonColor, setButtonColor] = React.useState({ top: '#8C8C8C', bottom: '#FFFFFF' });
  const onClick = () => {
    //navigation.navigate('Add');
    presetContext.filterPresets('add');
  };
  //jsx
  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <LinearGradient
        // Button Linear Gradient
        colors={[buttonColor.top, buttonColor.bottom]}
        style={[{ padding: 15, alignItems: 'center', borderRadius: 5 }, styles.roundshape]}
      >
        <Text
          style={{
            backgroundColor: 'transparent',
            fontSize: 15,
            color: '#fff',
          }}
        >
          <AntDesign style={styles.plusicon} name='plus' size={24} color='black' />
        </Text>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  roundshape: {
    position: 'absolute',
    left: windowWidth / 2 - 32,
    bottom: 60 - 32,
    flex: 1,
    width: 64,
    height: 64,
    borderWidth: 1,
    backgroundColor: 'gray',
    borderColor: 'white',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusicon: {
    textAlign: 'center',
  },
});
export default AddToBudgetButton;
