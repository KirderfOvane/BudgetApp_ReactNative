import React from 'react';
import DotStepsMenu from './DotStepsMenu';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const GuideSteps = ({ text, setGuide, guide, nextStep, onExit, prevStep, placement }) => {
  return (
    <>
      <View className={placement}>
        <DotStepsMenu guide={guide} setGuide={setGuide} />
        <TouchableOpacity className='guide__closebtn' value='close' onClick={onExit}>
          x
        </TouchableOpacity>
        <View className='guide__text'>
          <Text>{text}</Text>
        </View>
        <View className='guide__btn__group'>
          {guide !== '2' && (
            <TouchableOpacity className='guide__btn__group__prev' onClick={prevStep}>
              <Text>Previous</Text>
            </TouchableOpacity>
          )}
          {nextStep && (
            <TouchableOpacity className='guide__btn__group__next' onClick={nextStep}>
              <Text>Next</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity className='guide__btn__group__exit' onClick={onExit}>
            <Text>Exit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
GuideSteps.defaultProps = {
  placement: 'guide__card',
};
export default GuideSteps;
