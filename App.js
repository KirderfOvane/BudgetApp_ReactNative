import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

//Providers
import AuthState from './src/context/auth/AuthState';
import AlertState from './src/context/alert/AlertState';
import PresetState from './src/context/preset/PresetState';
import CsvState from './src/context/csv/CsvState';

//Refs
import { setNavigator } from './src/navigationRef';

//Screens
import SplashScreen from './src/screens/SplashScreen';
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
import UserScreen from './src/screens/UserScreen';
import ChangeNameScreen from './src/screens/ChangeNameScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import ChangeEmailScreen from './src/screens/ChangeEmailScreen';
import CustomGoBack from './src/components/CustomGoBack';
import MonthBottomTab from './src/components/MonthBottomTab';

//icons
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

//theme
import { theme } from './src/constants';

//components
import User from './src/components/User';
import Logo from './src/components/Logo';

//navigators
const switchNavigator = createSwitchNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions: {
      title: 'Splash',
      headerShown: false,
    },
  },
  loginFlow: createStackNavigator({
    Landing: {
      screen: LandingScreen,
      navigationOptions: {
        title: 'Landing',
        headerShown: false,
      },
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        headerTitleStyle: {
          color: theme.colors.light,
          fontSize: 24,
        },
        headerStyle: {
          backgroundColor: theme.colors.dark,
          height: 120,
        },
        headerLeft: () => <Logo />,
        headerRight: () => <User clickable={false} />,
        title: 'Budget App',
      },
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headerTitleStyle: {
          color: theme.colors.light,
          fontSize: 24,
        },
        headerStyle: {
          backgroundColor: theme.colors.dark,
          height: 120,
        },
        headerLeft: () => <Logo />,
        headerRight: () => <User clickable={false} />,
        title: 'Budget App',
      },
    },
  }),
  mainFlow: createStackNavigator(
    {
      yearFlow: createBottomTabNavigator(
        {
          Balance: {
            screen: YearBalanceScreen,
            navigationOptions: {
              title: 'Balance',
              tabBarIcon: <FontAwesome5 name='balance-scale' size={24} color='white' />,
            },
          },
          Expense: {
            screen: YearExpenseScreen,
            navigationOptions: { title: 'Expense', tabBarIcon: <Fontisto name='scissors' size={24} color='white' /> },
          },
          Income: YearIncomeScreen,
          Savings: YearSavingsScreen,
        },

        {
          navigationOptions: {
            headerTitleStyle: {
              color: theme.colors.light,
              fontSize: 24,
            },
            headerStyle: {
              backgroundColor: theme.colors.dark,
              height: 120,
            },

            headerLeft: () => <Logo clickpath={'Balance'} />,
            headerRight: () => <User />,
            title: 'Year',
            animationEnabled: false,
            transitionConfig: () => ({
              transitionSpec: {
                duration: 0,
                timing: 0,
              },
            }),
          },
          //bottom tab navigator
          tabBarOptions: {
            style: {
              backgroundColor: theme.colors.dark,
            },
          },
        }
      ),
      monthFlow: createBottomTabNavigator(
        {
          Month: MonthScreen,
          Add: AddToBudgetScreen,
          Plus: PlusScreen,
          Minus: MinusScreen,
          Purchase: PurchaseScreen,
          Piggybank: PiggybankScreen,
          Category: CategoryScreen,
        },
        {
          navigationOptions: {
            headerTitleStyle: {
              color: theme.colors.light,
              fontSize: 24,
            },
            cardStyle: { backgroundColor: 'transparent' },

            headerStyle: {
              backgroundColor: theme.colors.dark,
              height: 120,
            },
            headerLeft: () => <Logo clickpath={'Balance'} />,
            headerRight: () => <User />,
            title: 'Month',
            animationEnabled: false,
            transitionConfig: () => ({
              transitionSpec: {
                duration: 0,
                timing: 0,
              },
            }),
          },
          tabBarOptions: {
            style: {
              backgroundColor: theme.colors.dark,
            },
          },
          tabBarComponent: ({ navigation }) => <MonthBottomTab navigation={navigation} />,
        }
      ),
      userFlow: createStackNavigator(
        {
          User: {
            screen: UserScreen,
            navigationOptions: { headerRight: () => <AntDesign name='right' size={24} color='black' /> },
          },
          Name: {
            screen: ChangeNameScreen,
          },
          Email: {
            screen: ChangeEmailScreen,
          },
          Password: {
            screen: ChangePasswordScreen,
          },
        },
        {
          navigationOptions: {
            headerTitleStyle: {
              color: theme.colors.light, // Specify the height of your custom header
            },
            headerStyle: {
              backgroundColor: theme.colors.dark,
              height: 120,
            },

            headerLeft: () => <CustomGoBack />,
            title: 'User Profile',
          },
        }
      ),
    },
    {
      navigationOptions: {
        animationEnabled: false,
        transitionConfig: () => ({
          transitionSpec: {
            duration: 0,
            timing: 0,
          },
        }),
      },
    }
  ),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthState>
      <PresetState>
        <CsvState>
          <AlertState>
            <App ref={setNavigator} />
          </AlertState>
        </CsvState>
      </PresetState>
    </AuthState>
  );
};
