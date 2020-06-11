import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { StyleSheet, Text, View } from 'react-native';

import TestScreen from './TestScreen';

Enzyme.configure({ adapter: new EnzymeAdapter() });

test('TestScreen runs without crashing', () => {
  const wrapper = shallow(<TestScreen />);
  //console.log(wrapper.debug());
  const appComponent = wrapper.find("[testID='component-testscreen']");
  expect(appComponent.length).toBe(1);
  //expect(true).toBeTruthy();
});
