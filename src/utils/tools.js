import React from 'react'
import Toast from 'react-native-toast-message'

export const showToast = (type, text1, text2) => {
  switch (type) {
    case 'success':
      Toast.show({
        type: 'success',
        text1,
        text2,
        position: 'bottom',
        visibilityTime: 7000,
        autoHide: true,
        bottomOffset: 150,
      })
      break
    case 'error':
      Toast.show({
        type: 'error',
        text1,
        text2,
        position: 'bottom',
        visibilityTime: 7000,
        autoHide: true,
        bottomOffset: 150,
      })
      break
    default:
      null
  }
}

export const currencyFormat = (numStr, symbol) => {
  const num = parseFloat(numStr)
  sym = symbol || ''
  return sym + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
