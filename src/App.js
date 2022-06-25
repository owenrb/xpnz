/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './screen/home.screen'
import InputScreen from './screen/add.screen'
import SettingScreen from './screen/setting.screen'
import AuthScreen from './screen/auth.screen'

import { connect } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function App(props) {
  //console.log({ KEYS: Object.keys(props) })
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {props.auth.isAuth ? (
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Input" label="+" component={InputScreen} />
            <Tab.Screen name="Settings" component={SettingScreen} />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={AuthScreen}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

const mapStateToProps = state => {
  //console.log({ state })
  return { auth: state.auth, journal: state.journal }
}
export default connect(mapStateToProps)(App)
