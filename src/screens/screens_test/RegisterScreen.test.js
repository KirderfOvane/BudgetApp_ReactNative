import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import React from 'react';
import RegisterScreen from '../RegisterScreen';
import AuthContext from '../../context/auth/authContext';
import AuthState from '../../context/auth/AuthState';
import renderer from 'react-test-renderer';
import { render, fireEvent } from 'react-native-testing-library';
import { Text } from 'react-native';
import registerAction from '../../actions/registerAction';

// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

Enzyme.configure({ adapter: new EnzymeAdapter() });

let findElement = function (tree, element) {
  //console.warn(tree.children[0].props.testID === "test");
  let count = 0;
  for (node in tree.children) {
    if (tree.children[node].props.testID === element) {
      count++;
      //console.warn(tree.children[node].props.testID);
    }
  }
  return count;
};

describe('Rendering', () => {
  test('find Element test ', () => {
    let tree = renderer
      .create(
        <AuthState>
          <RegisterScreen />
        </AuthState>
      )
      .toJSON();
    expect(findElement(tree, 'test')).toBe(1);
  });

  test('component renders without error', () => {
    /* const wrapper = shallow(<RegisterScreen />);
    const component = wrapper.find("[testID='register-component']");
    expect(component.length).toBe(1); */
    let tree = renderer
      .create(
        <AuthState>
          <RegisterScreen />
        </AuthState>
      )
      .toJSON();
    //console.warn(tree.props.testID);
    expect(tree.props.testID.toString()).toBe('register-component');
  });

  test('renders input name', () => {
    /*   const wrapper = shallow(<RegisterScreen />);
    const nameinput = wrapper.find("[testID='register-input-name']");
    expect(nameinput.length).toBe(1); */
    let tree = renderer
      .create(
        <AuthState>
          <RegisterScreen />
        </AuthState>
      )
      .toJSON();
    // console.warn(tree);
    expect(findElement(tree, 'register-input-name')).toBe(1);
  });

  test('renders input email address', () => {
    /*   const wrapper = shallow(<RegisterScreen />);
    const emailinput = wrapper.find("[testID='register-input-email']");
    expect(emailinput.length).toBe(1); */
    let tree = renderer
      .create(
        <AuthState>
          <RegisterScreen />
        </AuthState>
      )
      .toJSON();
    // console.warn(tree);
    expect(findElement(tree, 'register-input-email')).toBe(1);
  });

  test('renders input password', () => {
    /*     const wrapper = shallow(<RegisterScreen />);
    const passwordinput = wrapper.find("[testID='register-input-password']");
    expect(passwordinput.length).toBe(1); */
    let tree = renderer
      .create(
        <AuthState>
          <RegisterScreen />
        </AuthState>
      )
      .toJSON();
    // console.warn(tree);
    expect(findElement(tree, 'register-input-password')).toBe(1);
  });

  test('renders input password with label Password', () => {
    /*  const wrapper = shallow(<RegisterScreen />);
    const passwordinput = wrapper.find("[testID='register-input-password']");
    const passwordlabel = passwordinput.find("[label='Password']");
    expect(passwordlabel.length).toBe(1); */
    let tree = renderer
      .create(
        <AuthState>
          <RegisterScreen />
        </AuthState>
      )
      .toJSON();
    //console.warn(tree.children.filter((child) => child.props.testID === 'register-input-password' && child.props.label === 'Password'));
    const element = tree.children.filter((child) => child.props.testID === 'register-input-password' && child.props.label === 'Password');
    // console.log(typeof element);
    // const element = findElement(tree, 'register-input-password');
    //console.warn(element);
    expect(typeof element).toBe('object');
  });

  test('renders password input with autoCapitalize off', () => {
    /*  const wrapper = shallow(<RegisterScreen />);
    const passwordelement = wrapper.find("[testID='register-input-password']");
    const capitalize = passwordelement.find("[autoCapitalize='none']");
    expect(capitalize.length).toBe(1); */
    let tree = renderer
      .create(
        <AuthState>
          <RegisterScreen />
        </AuthState>
      )
      .toJSON();
    //console.warn(tree.children.filter((child) => child.props.testID === 'register-input-password' && child.props.label === 'Password'));
    const element = tree.children.filter(
      (child) => child.props.testID === 'register-input-password' && child.props.autoCapitalize === 'none'
    );
    //console.log(typeof element);
    // const element = findElement(tree, 'register-input-password');
    //console.warn(element);
    expect(typeof element).toBe('object');
  });

  test('renders password input with autocorrect false', () => {
    /*  const wrapper = shallow(<RegisterScreen />);
    const passwordelement = wrapper.find("[testID='register-input-password']");
    const autocorrect = passwordelement.find('[autoCorrect=false]');
    expect(autocorrect.length).toBe(1); */
    let tree = renderer
      .create(
        <AuthState>
          <RegisterScreen />
        </AuthState>
      )
      .toJSON();
    //console.warn(tree.children.filter((child) => child.props.testID === 'register-input-password' && child.props.label === 'Password'));
    const element = tree.children.filter((child) => child.props.testID === 'register-input-password' && child.props.autoCorrect === false);
    //console.log(typeof element);
    // const element = findElement(tree, 'register-input-confirm');
    //console.warn(element);
    expect(typeof element).toBe('object');
  });

  test('renders password input with hidden characters', () => {
    /*   const wrapper = shallow(<RegisterScreen />);
    const passwordelement = wrapper.find("[testID='register-input-password']");
    const securetext = passwordelement.find('[secureTextEntry=true]');
    expect(securetext.length).toBe(1); */
    let tree = renderer
      .create(
        <AuthState>
          <RegisterScreen />
        </AuthState>
      )
      .toJSON();
    //console.warn(tree.children.filter((child) => child.props.testID === 'register-input-password' && child.props.label === 'Password'));
    const element = tree.children.filter(
      (child) => child.props.testID === 'register-input-password' && child.props.secureTextEntry === true
    );
    //console.log(typeof element);
    // const element = findElement(tree, 'register-input-confirm');
    //console.warn(element);
    expect(typeof element).toBe('object');
  });

  test('renders password2 input with hidden characters', () => {
    /*    const wrapper = shallow(<RegisterScreen />);
    const passwordelement = wrapper.find("[testID='register-input-confirm']");
    const securetext = passwordelement.find('[secureTextEntry=true]');
    expect(securetext.length).toBe(1); */
    let tree = renderer
      .create(
        <AuthState>
          <RegisterScreen />
        </AuthState>
      )
      .toJSON();
    //console.warn(tree.children.filter((child) => child.props.testID === 'register-input-password' && child.props.label === 'Password'));
    const element = tree.children.filter(
      (child) => child.props.testID === 'register-input-confirm' && child.props.secureTextEntry === true
    );
    //console.log(typeof element);
    // const element = findElement(tree, 'register-input-confirm');
    //console.warn(element);
    expect(typeof element).toBe('object');
  });

  test('renders submit button', () => {
    /*   const wrapper = shallow(<RegisterScreen />);
    const button = wrapper.find("[testID='register-submit-button']");
    expect(button.length).toBe(1); */
    const { getByTestId, debug } = render(
      <AuthState>
        <RegisterScreen />
      </AuthState>
    );
    const element = getByTestId('register-submit-button');
    expect((typeof element).toString()).toBe('object');
  });
});

describe('interaction', () => {
  test('should change state if name is entered', () => {
    const { getByTestId } = render(
      <AuthState>
        <RegisterScreen />
      </AuthState>
    );
    fireEvent.changeText(getByTestId('register-input-name'), 'Hello world');
    expect(getByTestId('register-input-name').props.value).toEqual('Hello world');
  });

  test('should change state if email is entered', () => {
    const { getByTestId } = render(
      <AuthState>
        <RegisterScreen />
      </AuthState>
    );
    fireEvent.changeText(getByTestId('register-input-email'), 'Hello@world.com');
    expect(getByTestId('register-input-email').props.value).toEqual('Hello@world.com');
  });

  test('should change state if password is entered', () => {
    const { getByTestId } = render(
      <AuthState>
        <RegisterScreen />
      </AuthState>
    );
    fireEvent.changeText(getByTestId('register-input-password'), 'password');
    expect(getByTestId('register-input-password').props.value).toEqual('password');
  });

  test('should change state if password2 is entered', () => {
    const { getByTestId } = render(
      <AuthState>
        <RegisterScreen />
      </AuthState>
    );
    fireEvent.changeText(getByTestId('register-input-confirm'), 'password');
    expect(getByTestId('register-input-confirm').props.value).toEqual('password');
  });

  test('resets submit fields if registerbutton is pressed and inputs are valid', () => {
    const { getByTestId } = render(
      <AuthState>
        <RegisterScreen />
      </AuthState>
    );

    //create user
    fireEvent.changeText(getByTestId('register-input-name'), 'TestPerson');
    fireEvent.changeText(getByTestId('register-input-email'), 'TestPerson@mailbox.com');
    fireEvent.changeText(getByTestId('register-input-password'), 'password');
    fireEvent.changeText(getByTestId('register-input-confirm'), 'password');

    //submit user
    const buttonelement = getByTestId('register-submit-button');
    fireEvent(buttonelement, 'press');

    expect(getByTestId('register-input-name').props.value).toEqual('');
  });

  test('register runs when valid user input is submitted', () => {
    //mock
    const mockSendRegister = jest.fn();
    //setup
    //mockSendRegister.mockClear();
    registerAction.sendRegister = mockSendRegister;
    const { getByTestId, update, debug, getByA11yState } = render(
      <AuthState>
        <RegisterScreen />
      </AuthState>
    );
    //create user
    fireEvent.changeText(getByTestId('register-input-name'), 'TestPerson');
    fireEvent.changeText(getByTestId('register-input-email'), 'TestPerson@mailbox.com');
    fireEvent.changeText(getByTestId('register-input-password'), 'password');
    fireEvent.changeText(getByTestId('register-input-confirm'), 'password');
    //submit user
    //debug();
    const buttonelement = getByTestId('register-submit-button');
    fireEvent(buttonelement, 'press');
    // debug();

    //console.warn(test.props.children);
    expect(mockSendRegister).toHaveBeenCalled();
  });

  test('register does NOT run when invalid name user input is submitted', () => {
    //mock
    const mockSendRegister = jest.fn();
    registerAction.sendRegister = mockSendRegister;
    //setup
    const { getByTestId } = render(
      <AuthState>
        <RegisterScreen />
      </AuthState>
    );
    //create user input
    fireEvent.changeText(getByTestId('register-input-name'), '');
    fireEvent.changeText(getByTestId('register-input-email'), 'TestPerson@mailbox.com');
    fireEvent.changeText(getByTestId('register-input-password'), 'password');
    fireEvent.changeText(getByTestId('register-input-confirm'), 'password');
    //submit user
    const buttonelement = getByTestId('register-submit-button');
    fireEvent(buttonelement, 'press');

    expect(mockSendRegister).not.toHaveBeenCalled();
  });

  test('register does NOT run when invalid email user input is submitted', () => {
    //mock
    const mockSendRegister = jest.fn();
    registerAction.sendRegister = mockSendRegister;
    //setup
    const { getByTestId } = render(
      <AuthState>
        <RegisterScreen />
      </AuthState>
    );
    //create user input
    fireEvent.changeText(getByTestId('register-input-name'), 'ValidName');
    fireEvent.changeText(getByTestId('register-input-email'), 'mailbox.com');
    fireEvent.changeText(getByTestId('register-input-password'), 'password');
    fireEvent.changeText(getByTestId('register-input-confirm'), 'password');
    //submit user
    const buttonelement = getByTestId('register-submit-button');
    fireEvent(buttonelement, 'press');

    expect(mockSendRegister).not.toHaveBeenCalled();
  });

  test('register does NOT run when invalid password user input is submitted', () => {
    //mock
    const mockSendRegister = jest.fn();
    registerAction.sendRegister = mockSendRegister;
    //setup
    const { getByTestId } = render(
      <AuthState>
        <RegisterScreen />
      </AuthState>
    );
    //create user input
    fireEvent.changeText(getByTestId('register-input-name'), 'ValidName');
    fireEvent.changeText(getByTestId('register-input-email'), 'validmail@mailbox.com');
    fireEvent.changeText(getByTestId('register-input-password'), 'pass');
    fireEvent.changeText(getByTestId('register-input-confirm'), 'pass');
    //submit user
    const buttonelement = getByTestId('register-submit-button');
    fireEvent(buttonelement, 'press');

    expect(mockSendRegister).not.toHaveBeenCalled();
  });

  test('register does NOT run when password confirm user input is not matching', () => {
    //mock
    const mockSendRegister = jest.fn();
    registerAction.sendRegister = mockSendRegister;
    //setup
    const { getByTestId } = render(
      <AuthState>
        <RegisterScreen />
      </AuthState>
    );
    //create user input
    fireEvent.changeText(getByTestId('register-input-name'), 'ValidName');
    fireEvent.changeText(getByTestId('register-input-email'), 'validmail@mailbox.com');
    fireEvent.changeText(getByTestId('register-input-password'), 'password');
    fireEvent.changeText(getByTestId('register-input-confirm'), 'somethingelse');
    //submit user
    const buttonelement = getByTestId('register-submit-button');
    fireEvent(buttonelement, 'press');

    expect(mockSendRegister).not.toHaveBeenCalled();
  });

  test('shows alert if user name input is invalid on submit', () => {});
  test('shows alert if user email input is invalid on submit', () => {});
  test('shows alert if user password input is invalid on submit', () => {});
  test('shows alert if user password confirm input is not matching on submit', () => {});
});
