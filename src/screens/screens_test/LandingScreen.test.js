import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import LandingScreen from "../LandingScreen";
import App from "../../../App";
import { render, fireEvent } from "react-native-testing-library";

// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Rendering", () => {
  test("component renders without error", () => {
    const wrapper = shallow(<LandingScreen />);
    const component = wrapper.find("[testID='landing-component']");
    expect(component.length).toBe(1);
  });
  test("renders loginbutton", () => {
    const wrapper = shallow(<LandingScreen />);
    const loginbutton = wrapper.find("[testID='loginbutton']");
    expect(loginbutton.length).toBe(1);
  });
  test("renders registerbutton", () => {
    const wrapper = shallow(<LandingScreen />);
    const registerbutton = wrapper.find("[testID='registerbutton']");
    expect(registerbutton.length).toBe(1);
  });
});
describe("Interaction", () => {
  test("click login calls navigate to loginscreen", async () => {
    //get App
    const Appcomponent = <App />;
    const { findByTestId } = render(Appcomponent);

    //click clickety click
    const toClick = await findByTestId("loginbutton");
    fireEvent(toClick, "press");

    //check if testID from loginscreen exist and is View
    const componentid = await findByTestId("loginscreen");
    expect(componentid.type).toBe("View");
  });
  test("click register takes you to registerscreen", async () => {
    // get App
    const Appcomponent = <App />;
    const { findByTestId } = render(Appcomponent);

    // sim click
    const toClick = await findByTestId("registerbutton");
    fireEvent(toClick, "press");

    //check if TestId from registerscreen exist and is View
    const componentid = await findByTestId("register-component");
    expect(componentid.type).toBe("View");
  });
});
