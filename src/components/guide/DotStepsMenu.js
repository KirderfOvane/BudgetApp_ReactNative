import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';

const DotStepsMenu = ({ guide, setGuide }) => {
  const onStepBtnClick = (e) => {
    setGuide(e.target.value);
  };

  return (
    <View className='guide__dotcontainer'>
      <Button value='2' onClick={onStepBtnClick} className={guide === '2' ? 'guide__dots guide__dots__active' : 'guide__dots'}></Button>
      <Button value='3' onClick={onStepBtnClick} className={guide === '3' ? 'guide__dots guide__dots__active' : 'guide__dots'}></Button>
      <Button value='4' onClick={onStepBtnClick} className={guide === '4' ? 'guide__dots guide__dots__active' : 'guide__dots'}></Button>
      <Button value='5' onClick={onStepBtnClick} className={guide === '5' ? 'guide__dots guide__dots__active' : 'guide__dots'}></Button>
      <Button value='6' onClick={onStepBtnClick} className={guide === '6' ? 'guide__dots guide__dots__active' : 'guide__dots'}></Button>
      <Button value='7' onClick={onStepBtnClick} className={guide === '7' ? 'guide__dots guide__dots__active' : 'guide__dots'}></Button>
      <Button value='8' onClick={onStepBtnClick} className={guide === '8' ? 'guide__dots guide__dots__active' : 'guide__dots'}></Button>
      <Button value='9' onClick={onStepBtnClick} className={guide === '9' ? 'guide__dots guide__dots__active' : 'guide__dots'}></Button>
      <Button value='10' onClick={onStepBtnClick} className={guide === '10' ? 'guide__dots guide__dots__active' : 'guide__dots'}></Button>
      <Button value='11' onClick={onStepBtnClick} className={guide === '11' ? 'guide__dots guide__dots__active' : 'guide__dots'}></Button>
      <Button value='12' onClick={onStepBtnClick} className={guide === '12' ? 'guide__dots guide__dots__active' : 'guide__dots'}></Button>
      <Button value='13' onClick={onStepBtnClick} className={guide === '13' ? 'guide__dots guide__dots__active' : 'guide__dots'}></Button>
      <Button value='14' onClick={onStepBtnClick} className={guide === '14' ? 'guide__dots guide__dots__active' : 'guide__dots'}></Button>
      <Button value='15' onClick={onStepBtnClick} className={guide === '15' ? 'guide__dots guide__dots__active' : 'guide__dots'}></Button>
      <Button value='16' onClick={onStepBtnClick} className={guide === '16' ? 'guide__dots guide__dots__active' : 'guide__dots'}></Button>
      <Button value='17' onClick={onStepBtnClick} className={guide === '17' ? 'guide__dots guide__dots__active' : 'guide__dots'}></Button>
    </View>
  );
};

export default DotStepsMenu;
