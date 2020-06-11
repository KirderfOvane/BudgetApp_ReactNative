import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import TestScreen from './src/screens/TestScreen';
const navigator = createStackNavigator(
  {
    Test: TestScreen,
  },
  {
    initialRouteName: 'Test',
    defaultNavigationOptions: {
      title: 'Test',
    },
  }
);

/* const App = () => {
  return (
    <View testID='component-app' style={styles.container}>
      <Text testID='text'>Open up App.js to start working on your app!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */

export default createAppContainer(navigator);
