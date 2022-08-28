/**
 * @format
 */
import 'react-native-gesture-handler'

import React from 'react'
import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './src/app.json'
import { Provider } from 'react-redux'
import { applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import Toast from 'react-native-toast-message'

import { configureStore } from '@reduxjs/toolkit'
import authReducer from './src/store/slice/auth.slice'
import journalReducer from './src/store/slice/journal.slice'
import settingReducer from './src/store/slice/setting.slice'
import createSagaMiddleware from 'redux-saga'
import authSaga from './src/store/saga/auth.saga'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = configureStore({
  reducer: {
    auth: authReducer,
    journal: journalReducer,
    setting: settingReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
})

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    myOwnColor: '#BADA55',
  },
}

const reduxApp = () => (
  <Provider store={store}>
    <PaperProvider theme={theme}>
      <App />
      <Toast position="bottom" />
    </PaperProvider>
  </Provider>
)

AppRegistry.registerComponent(appName, () => reduxApp)

sagaMiddleware.run(authSaga)
//registerRootComponent(reduxApp)
