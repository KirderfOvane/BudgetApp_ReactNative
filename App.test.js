/* @jest-environment jsdom */

import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Testing React Navigation", () => {
  test("renders LandingScreen when not authenticated", () => {
    const MocksetIsAuthenticated = jest.fn();
    React.useState = jest.fn(() => [false, MocksetIsAuthenticated]);
    const wrapper = shallow(<App />);
    const appComponent = wrapper.find("[testID='Landing']");
    expect(appComponent.length).toBe(1);
  });

  test("renders UserScreen when authenticated", () => {
    const MocksetIsAuthenticated = jest.fn();
    React.useState = jest.fn(() => [true, MocksetIsAuthenticated]);
    const wrapper = shallow(<App />);
    const appComponent = wrapper.find("[testID='YearBalanceScreen']");
    expect(appComponent.length).toBe(1);
  });
});
