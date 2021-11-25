import React from 'react';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';

import WelcomeScreen from './screens/WelcomeScreen';
import CartScreen from './screens/CartScreen';
import { AppDrawerNavigator } from './components/AppDrawerNavigator'


export default function App() {
  return (
    <AppContainer/>
  );
}


const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: WelcomeScreen},
  CartScreen:{screen: CartScreen},
  Drawer:{screen: AppDrawerNavigator}
})

const AppContainer =  createAppContainer(switchNavigator);
