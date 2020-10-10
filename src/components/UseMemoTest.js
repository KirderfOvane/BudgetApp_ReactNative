import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const UseMemoTest = () => {
  const [number, setNumber] = React.useState(0);
  const [dark, setDark] = React.useState(false);
  const doubleNumber = React.useMemo(() => {
    return slowFunction(parseInt(number));
  }, [number]);
  const themeStyles = React.useMemo(() => {
    return {
      backgroundColor: dark ? 'black' : 'white',
      color: dark ? 'white' : 'black',
    };
  }, [dark]);
  React.useEffect(() => {
    console.log('Theme changed');
  }, [themeStyles]);
  return (
    <View>
      <Text>WTF</Text>
      <TextInput
        style={{ textAlign: 'center', padding: 15, margin: 10, borderColor: 'black', borderWidth: 2 }}
        placeholder='number'
        onChangeText={(newNum) => setNumber({ ...number, number: parseInt(newNum) })}
        name='number'
        value={number}
        autoCapitalize='none'
        maxLength={25}
        keyboardType='numeric'
      />
      <Button onPress={() => setDark((prevDark) => !prevDark)} title='Change Theme' />
      <View style={{ backgroundColor: themeStyles.backgroundColor, color: themeStyles.color }}>
        <Text>{doubleNumber}</Text>
      </View>
    </View>
  );
};

function slowFunction(num) {
  // console.log('Calling slow function');
  for (let i = 0; i <= 100000000; i++) {}
  return num * 2;
}

export default UseMemoTest;
