import React from 'react';
import AuthState from './AuthState';
import AuthContext from './authContext';
import { Text, Button } from 'react-native';

import { render, fireEvent } from 'react-native-testing-library';
import moxios from 'moxios';

describe('context testing', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test('button click toggles value', () => {
    //mockConstruct of context
    const TestComponent = () => {
      const { testofcontext, testContext } = React.useContext(AuthContext);

      return (
        <>
          <Text testID='valueasstring'>{testofcontext.toString()}</Text>
          <Button testID='button' title='testbtn' onPress={testContext}>
            test
          </Button>
        </>
      );
    };

    const { getByTestId } = render(
      <AuthState>
        <TestComponent />
      </AuthState>
    );

    // get value element
    const value = getByTestId('valueasstring');
    // check inital value
    expect(value.children[0]).toBe('false');
    // get button and press it
    const btn = getByTestId('button');
    fireEvent(btn, 'press');
    // check value has changed. The real context test!
    expect(value.children[0]).toBe('true');
    // click button again
    fireEvent(btn, 'press');
    // check value to see that it toggled.
    expect(value.children[0]).toBe('false');
  });
  /*
  test('loaduser changes expected states', () => {
    //mockConstruct of context
    const TestComponent = () => {
      const { loadUser } = React.useContext(AuthContext);
      const mywatwat = 'newuser';
      //Mock req and res http
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          _id: '5e43c5488df696396831e9d3',
          name: 'newuser',
          email: 'newuser@gmail.com',
          date: '2020-02-12T09:28:40.100Z',
          __v: 0,
        });
      });
      // create mock for callback argument                                        // mock loadUser
      const mockLoadUser = jest.fn();
      const fnneededforasync = async () => {
        await loadUser(mockLoadUser);
      };

      // see whether mock was run with the correct argument 

      return (
        <>
          <Text testID='valueasstring'>{isAuthenticated && isAuthenticated.toString()}</Text>
          <Button testID='button' title='testbtn' onPress={testContext}>
            test
          </Button>
        </>
      );
    };

  

    const { getByTestId } = render(
      <AuthState>
        <TestComponent />
      </AuthState>
    );
    // get value element
    //   const value = getByTestId('valueasstring');
    // check inital value
    //expect(value.children[0]).toBeUndefined();
    // get button and press it
    const btn = getByTestId('button');
    fireEvent(btn, 'press');
    debug(); 
    // check value has changed. The real context test!
    //expect(value.children[0]).toBeUndefined();
    // click button again
    //fireEvent(btn, 'press');
    // check value to see that it toggled.
    // expect(value.children[0]).toBe('false');
  }); */
});
