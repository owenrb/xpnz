/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './screen/home.screen'
import InputScreen from './screen/add.screen'
import SettingScreen from './screen/setting.screen'
import AuthScreen from './screen/auth.screen'

import { connect } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import ButtonPrevNext from './component/button-prev-next'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { getEntries } from './store/actions'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const get1stDayOfCurrentMonth = () => {
  const date = new Date()
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function App(props) {
  const dispatch = useDispatch()
  const [month, setMonth] = useState(get1stDayOfCurrentMonth())

  const printMonthYear = date => {
    return moment(date).format('MMMM YYYY')
  }

  const changeMonth = async date => {
    setMonth(date)
    const yyyymm = moment(date).format('YYYY-MM')
    dispatch(await getEntries(yyyymm))
  }

  const onLeftPress = time => {
    const m = new Date(time)
    changeMonth(m.setMonth(m.getMonth() - 1))
  }

  const onRightPress = time => {
    const m = new Date(time)
    changeMonth(m.setMonth(m.getMonth() + 1))
  }

  console.log({ PROPS: props })

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {props.auth.isAuth ? (
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              initialParams={{ MONTH: 'XXXX' }}
              options={{
                headerTitle: props => (
                  <ButtonPrevNext
                    onLeftPress={() => onLeftPress(month)}
                    title={printMonthYear(month)}
                    onRightPress={() => onRightPress(month)}
                  />
                ),
              }}
            />
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
