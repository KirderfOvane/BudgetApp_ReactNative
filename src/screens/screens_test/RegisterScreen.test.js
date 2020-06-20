import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import React from "react";
import RegisterScreen from "../RegisterScreen";
import App from "../../../App";
import renderer from "react-test-renderer";
import { render, fireEvent } from "react-native-testing-library";

// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

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
describe("Rendering", () => {
  test("find Element", () => {
    let tree = renderer.create(<RegisterScreen />).toJSON();
    expect(findElement(tree, "test")).toBe(1);
  });
  test("component renders without error", () => {
    const wrapper = shallow(<RegisterScreen />);
    const component = wrapper.find("[testID='register-component']");
    expect(component.length).toBe(1);
  });
  test("renders input name", () => {
    const wrapper = shallow(<RegisterScreen />);
    const nameinput = wrapper.find("[testID='register-input-name']");
    expect(nameinput.length).toBe(1);
  });
  test("renders input email address", () => {
    const wrapper = shallow(<RegisterScreen />);
    const emailinput = wrapper.find("[testID='register-input-email']");
    expect(emailinput.length).toBe(1);
  });
  test("renders input password", () => {
    const wrapper = shallow(<RegisterScreen />);
    const passwordinput = wrapper.find("[testID='register-input-password']");
    expect(passwordinput.length).toBe(1);
  });
  test("renders input password with label Password", () => {
    const wrapper = shallow(<RegisterScreen />);
    const passwordinput = wrapper.find("[testID='register-input-password']");
    const passwordlabel = passwordinput.find("[label='Password']");
    expect(passwordlabel.length).toBe(1);
  });
  test("renders password input with autoCapitalize off", () => {
    const wrapper = shallow(<RegisterScreen />);
    const passwordelement = wrapper.find("[testID='register-input-password']");
    const capitalize = passwordelement.find("[autoCapitalize='none']");
    expect(capitalize.length).toBe(1);
  });
  test("renders password input with autocorrect false", () => {
    const wrapper = shallow(<RegisterScreen />);
    const passwordelement = wrapper.find("[testID='register-input-password']");
    const autocorrect = passwordelement.find("[autoCorrect=false]");
    expect(autocorrect.length).toBe(1);
  });
  test("renders password input with hidden characters", () => {
    const wrapper = shallow(<RegisterScreen />);
    const passwordelement = wrapper.find("[testID='register-input-password']");
    const securetext = passwordelement.find("[secureTextEntry=true]");
    expect(securetext.length).toBe(1);
  });
  test("renders password2 input with hidden characters", () => {
    const wrapper = shallow(<RegisterScreen />);
    const passwordelement = wrapper.find("[testID='register-input-confirm']");
    const securetext = passwordelement.find("[secureTextEntry=true]");
    expect(securetext.length).toBe(1);
  });
  test("renders submit button", () => {
    const wrapper = shallow(<RegisterScreen />);
    const button = wrapper.find("[testID='register-submit-button']");
    expect(button.length).toBe(1);
  });
});
describe("interaction", () => {
  test("should change state if name is entered", () => {
    const { getByTestId } = render(<RegisterScreen />);
    fireEvent.changeText(getByTestId("register-input-name"), "Hello world");
    expect(getByTestId("register-input-name").props.value).toEqual("Hello world");
  });
  test("should change state if email is entered", () => {
    const { getByTestId } = render(<RegisterScreen />);
    fireEvent.changeText(getByTestId("register-input-email"), "Hello@world.com");
    expect(getByTestId("register-input-email").props.value).toEqual("Hello@world.com");
  });
  test("should change state if password is entered", () => {
    const { getByTestId } = render(<RegisterScreen />);
    fireEvent.changeText(getByTestId("register-input-password"), "password");
    expect(getByTestId("register-input-password").props.value).toEqual("password");
  });
  test("should change state if password2 is entered", () => {
    const { getByTestId } = render(<RegisterScreen />);
    fireEvent.changeText(getByTestId("register-input-confirm"), "password");
    expect(getByTestId("register-input-confirm").props.value).toEqual("password");
  });
  /*   test("should submit if registerbutton is pressed", () => {
    const wrapper = shallow(<RegisterScreen />);
    const button = wrapper.find("[testID='register-submit-button']");
    button.simulate('click')
  });
  test("should clear input fields on submit", () => {
    const wrapper = shallow(<RegisterScreen />);
    const button = wrapper.find("[testID='register-submit-button']");
    button.simulate('click')
  }); */
});
