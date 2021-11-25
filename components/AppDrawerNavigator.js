import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import CartScreen  from '../screens/CartScreen';
import AddItemsscreen  from '../screens/AddItemsscreen';

export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator
    },
  CartScreen : {
    screen : CartScreen,
    
  },
   AddItemsscreen : {
    screen : AddItemsscreen,
    
  },
},
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })
