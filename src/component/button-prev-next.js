import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

export default ButtonPrevNext = ({ title, onLeftPress, onRightPress }) => {
  const headerTitle = title || 'Untitled'

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button icon="chevron-left" onPress={() => onLeftPress()}></Button>
      </View>
      <View style={styles.buttonContainerCenter}>
        <Text>{headerTitle}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button icon="chevron-right" onPress={() => onRightPress()}></Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
  },
  buttonContainerCenter: {
    flex: 3,
    alignItems: 'center',
  },
})
