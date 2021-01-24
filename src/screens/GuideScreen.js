import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { theme } from '../constants';

const Dots = ({ selected }) => {
  let backgroundColor;

  backgroundColor = selected ? theme.colors.orange : theme.colors.light;

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Skip = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16, color: theme.colors.light }}>Exit</Text>
  </TouchableOpacity>
);

const Next = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 18, color: theme.colors.light }}>Next</Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16, color: theme.colors.light }}>Done</Text>
  </TouchableOpacity>
);

const GuideScreen = ({ navigation }) => {
  return (
    <Onboarding
      style={{ backgroundColor: 'blue' }}
      bottomBarHeight={50}
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.navigate('Balance')}
      onDone={() => navigation.navigate('Balance')}
      pages={[
        {
          backgroundColor: theme.colors.dark,
          image: (
            <Image
              style={{ width: windowWidth, height: windowHeight, marginTop: 60 }}
              source={require('../../assets/guide/210117/guide_step1_compressed.jpg')}
            />
          ),
          title: 'Share Your Favorites',
          subtitle: 'Share Your Thoughts With Similar Kind of People',
        },
        {
          backgroundColor: theme.colors.dark,
          image: (
            <Image
              style={{ width: windowWidth, height: windowHeight, marginTop: 60 }}
              source={require('../../assets/guide/210117/guide_step2_compressed.jpg')}
            />
          ),
          title: 'Become The Star',
          subtitle: 'Let The Spot Light Capture You',
        },
        {
          backgroundColor: theme.colors.dark,
          image: (
            <Image
              style={{ width: windowWidth, height: windowHeight, marginTop: 60 }}
              source={require('../../assets/guide/210117/guide_step3_compressed.jpg')}
            />
          ),
          title: 'Become The Star',
          subtitle: 'Let The Spot Light Capture You',
        },
        {
          backgroundColor: theme.colors.dark,
          image: (
            <Image
              style={{ width: windowWidth, height: windowHeight, marginBottom: 100 }}
              source={require('../../assets/guide/210117/guide_step4_compressed.jpg')}
            />
          ),
          title: 'Become The Star',
          subtitle: 'Let The Spot Light Capture You',
        },
        {
          backgroundColor: theme.colors.dark,
          image: (
            <Image
              style={{ width: windowWidth, height: windowHeight, marginTop: 60 }}
              source={require('../../assets/guide/210117/guide_step5_compressed.jpg')}
            />
          ),
          title: 'Become The Star',
          subtitle: 'Let The Spot Light Capture You',
        },
        {
          backgroundColor: theme.colors.dark,
          image: (
            <Image
              style={{ width: windowWidth, height: windowHeight }}
              source={require('../../assets/guide/210117/guide_step6_compressed.jpg')}
            />
          ),
          title: 'Become The Star',
          subtitle: 'Let The Spot Light Capture You',
        },
        {
          backgroundColor: theme.colors.dark,
          image: (
            <Image
              style={{ width: windowWidth, height: windowHeight }}
              source={require('../../assets/guide/210117/guide_step7_compressed.jpg')}
            />
          ),
          title: 'Become The Star',
          subtitle: 'Let The Spot Light Capture You',
        },
        {
          backgroundColor: theme.colors.dark,
          image: (
            <Image
              style={{ width: windowWidth, height: windowHeight }}
              source={require('../../assets/guide/210117/guide_step8_compressed.jpg')}
            />
          ),
          title: 'Become The Star',
          subtitle: 'Let The Spot Light Capture You',
        },
        {
          backgroundColor: theme.colors.dark,
          image: (
            <Image
              style={{ width: windowWidth, height: windowHeight }}
              source={require('../../assets/guide/210117/guide_step9_compressed.jpg')}
            />
          ),
          title: 'Become The Star',
          subtitle: 'Let The Spot Light Capture You',
        },
        {
          backgroundColor: theme.colors.dark,
          image: (
            <Image
              style={{ width: windowWidth, height: windowHeight, marginBottom: 100 }}
              source={require('../../assets/guide/210117/guide_step10_compressed.jpg')}
            />
          ),
          title: 'Become The Star',
          subtitle: 'Let The Spot Light Capture You',
        },
        {
          backgroundColor: theme.colors.dark,
          image: (
            <Image
              style={{ width: windowWidth, height: windowHeight, marginBottom: 100 }}
              source={require('../../assets/guide/210117/guide_step11_compressed.jpg')}
            />
          ),
          title: 'Become The Star',
          subtitle: 'Let The Spot Light Capture You',
        },
        {
          backgroundColor: theme.colors.dark,
          image: (
            <Image
              style={{ width: windowWidth, height: windowHeight, marginTop: 60 }}
              source={require('../../assets/guide/210117/guide_step12_compressed.jpg')}
            />
          ),
          title: 'Become The Star',
          subtitle: 'Let The Spot Light Capture You',
        },
        {
          backgroundColor: theme.colors.dark,
          image: (
            <Image
              style={{ width: windowWidth, height: windowHeight, marginBottom: 100 }}
              source={require('../../assets/guide/210117/guide_step13_compressed.jpg')}
            />
          ),
          title: 'Become The Star',
          subtitle: 'Let The Spot Light Capture You',
        },
        {
          backgroundColor: theme.colors.dark,
          image: (
            <Image
              style={{ width: windowWidth, height: windowHeight, marginBottom: 100 }}
              source={require('../../assets/guide/210117/guide_step14_compressed.jpg')}
            />
          ),
          title: 'Become The Star',
          subtitle: 'Let The Spot Light Capture You',
        },
        {
          backgroundColor: theme.colors.dark,
          image: (
            <Image
              style={{ width: windowWidth, height: windowHeight, marginBottom: 100 }}
              source={require('../../assets/guide/210117/guide_step15_compressed.jpg')}
            />
          ),
          title: 'Become The Star',
          subtitle: 'Let The Spot Light Capture You',
        },
        {
          backgroundColor: theme.colors.dark,
          image: (
            <Image
              style={{ width: windowWidth, height: windowHeight, marginBottom: 100 }}
              source={require('../../assets/guide/210117/guide_step16_compressed.jpg')}
            />
          ),
          title: 'Become The Star',
          subtitle: 'Let The Spot Light Capture You',
        },
      ]}
      //bottomBarHighlight={false}
      imageContainerStyles={{
        paddingBottom: 0,
      }}
      bottomBarHeight={50}
    />
  );
};

/* GuideScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
}; */

export default GuideScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
