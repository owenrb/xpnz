import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TransactionScreen from './home.transction.screen';
import BudgetScreen from './home.budget.screen';
import OverviewScreen from './home.overview.screen';

const Tab = createMaterialTopTabNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Overview" component={OverviewScreen} />
      <Tab.Screen name="Transactions" component={TransactionScreen} />
      <Tab.Screen name="Budget" component={BudgetScreen} />
    </Tab.Navigator>
  );
}

export default HomeScreen;