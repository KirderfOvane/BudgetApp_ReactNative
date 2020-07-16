import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

//Providers
import AuthState from './src/context/auth/AuthState';
import AlertState from './src/context/alert/AlertState';
import PresetState from './src/context/preset/PresetState';

//Refs
import { setNavigator } from './src/navigationRef';

//Screens
import LandingScreen from './src/screens/LandingScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import YearBalanceScreen from './src/screens/YearBalanceScreen';
import YearExpenseScreen from './src/screens/YearExpenseScreen';
import YearIncomeScreen from './src/screens/YearIncomeScreen';
import YearSavingsScreen from './src/screens/YearSavingsScreen';
import MonthScreen from './src/screens/MonthScreen';
import AddToBudgetScreen from './src/screens/AddToBudgetScreen';
import PlusScreen from './src/screens/PlusScreen';
import MinusScreen from './src/screens/MinusScreen';
import PurchaseScreen from './src/screens/PurchaseScreen';
import PiggybankScreen from './src/screens/PiggybankScreen';
import CategoryScreen from './src/screens/CategoryScreen';

//navigators
const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Landing: LandingScreen,
    Register: RegisterScreen,
    Login: LoginScreen,
  }),
  mainFlow: createStackNavigator({
    yearFlow: createBottomTabNavigator({
      Balance: YearBalanceScreen,
      Expense: YearExpenseScreen,
      Income: YearIncomeScreen,
      Savings: YearSavingsScreen,
    }),
    monthFlow: createBottomTabNavigator({
      Month: MonthScreen,
      Add: AddToBudgetScreen,
      Plus: PlusScreen,
      Minus: MinusScreen,
      Purchase: PurchaseScreen,
      Piggybank: PiggybankScreen,
      Category: CategoryScreen,
    }),
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthState>
      <PresetState>
        <AlertState>
          <App ref={setNavigator} />
        </AlertState>
      </PresetState>
    </AuthState>
  );
};
