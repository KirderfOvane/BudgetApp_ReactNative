import React from 'react';
import AlertState from './AlertState';
import AlertContext from './alertContext';
import { Text, Button } from 'react-native';
import { renderer } from 'react-test-renderer';
import { render, fireEvent, update } from 'react-native-testing-library';

describe('alert context testing', () => {
  test('button click toggles value', async () => {
    //mockConstruct of context
    const TestComponent = () => {
      const { alerts, setAlert } = React.useContext(AlertContext);
      const runThings = () => {
        setAlert({ msg: 'mytestalert', type: 'danger' });
      };
      return (
        <>
          <Text testID='valueasstring'>{alerts.toString()}</Text>
          <Button testID='button' title='testbtn' onPress={runThings}>
            test
          </Button>
        </>
      );
    };

    const { getByTestId, update } = render(
      <AlertState>
        <TestComponent />
      </AlertState>
    );

    // get value element
    const value = getByTestId('valueasstring');

    // check inital value
    //expect(value.children[0]).toBe('false');
    // get button and press it
    const btn = getByTestId('button');
    await fireEvent(btn, 'press');
    update(
      <AlertState>
        <TestComponent />
      </AlertState>
    );
    // check value has changed. The real context test!
    // expect(value.children[0]).toBe('true');
    console.warn(value.props.children);
    expect(value.props.children).not.toBe('');
    // click button again
    // fireEvent(btn, 'press');
    // check value to see that it toggled.
    //expect(value.children[0]).toBe('false');
  });
});
