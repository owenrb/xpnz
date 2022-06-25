import { call, put, takeEvery } from 'redux-saga/effects'
import AsyncStorage from '@react-native-async-storage/async-storage'

function* loginUser(action) {
  const user = action.payload
  console.log({ module: 'saga', user })
  const jsonStr = JSON.stringify(user)
  yield AsyncStorage.setItem('@user', jsonStr)
  //yield put({ type: 'auth/loginUserSuccess', user })
}

function* authSaga() {
  yield takeEvery('auth/loginUser', loginUser)
}

export default authSaga
