import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet, Easing, Dimensions } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
//import { Value } from 'react-native-reanimated';
const { width, height } = Dimensions.get('window');

export default class FH_ActivityIndicator extends Component {
  // const value = React.useState(new Animated.Value(0))[0];

  static defaultProps = {
    position: 'relative',
    color: 'black',
    infiniteloop: true,
  };

  state = {
    rotateAnim: new Animated.Value(0),
    stopAnimation: false,
  };
  /*  const moveBall = () => {
    Animated.timing(value, {
      toValue: 100,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  }; */
  componentDidMount() {
    this.startAnimation();
  }
  startAnimation() {
    this.state.rotateAnim.setValue(0);
    //console.log(this.props.position);
    Animated.timing(this.state.rotateAnim, {
      toValue: 3600,
      duration: 9000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      this.state.stopAnimation === false && this.props.infiniteloop && this.startAnimation();
    });
  }
  componentWillUnmount() {
    // console.log('spinner removed from dom');
    // this.state.rotateAnim.stopAnimation();
    //  Animated.timing(this.state.rotateAnim).stop();
    this.state = { stopAnimation: true };
  }
  /*   const rotateInterpolate = () => {
    value.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    });
  }; */
  render() {
    /*   animatedStyles = {
      transform: [
        {
          rotate: this.state.rotateAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
          }),
        },
      ],
    }; */
    return (
      <View style={this.props.position === 'absolute' ? styles.containerAbsolute : styles.container}>
        <Animated.View
          style={{
            transform: [
              {
                rotate: this.state.rotateAnim.interpolate({
                  inputRange: [0, 3600],
                  outputRange: ['0deg', '3600deg'],
                }),
              },
            ],
          }}
        >
          <Animated.View
            style={{
              width: 100,
              height: 100,
              borderWidth: 10,
              borderRadius: 100,
              borderTopColor: 'transparent',
              borderColor: this.props.color,

              /*   borderColor: this.state.rotateAnim.interpolate({
                inputRange: [0, 180, 360],
                outputRange: ['red', 'yellow', 'red'],
              }), */
            }}
          ></Animated.View>
        </Animated.View>
        {/*  <TouchableOpacity onPress={this.startAnimation}>
          <Text>PressMe</Text>
        </TouchableOpacity> */}
        {/* <View style={[styles.loader, { borderColor: props.color }]}></View> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerAbsolute: {
    position: 'absolute',
    zIndex: 10,
    top: height / 2 - 150,
    left: width / 2 - 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    width: 50,
    height: 50,
    borderWidth: 5,
    borderRadius: 25,
    borderColor: 'red',
    borderTopColor: 'transparent',
  },
});
//export default FH_ActivityIndicator;
