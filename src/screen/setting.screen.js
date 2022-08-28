import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  TextInput,
  Provider,
  Switch,
} from 'react-native-paper'
import uuid from 'react-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { updateSetting } from '../store/actions'

const SettingScreen = () => {
  const dispatch = useDispatch()

  const [descending, setDecending] = useState(false)

  const [visible, setVisible] = useState(false)
  const [text, setText] = React.useState('')
  const [pass, setPass] = useState(uuid().split('-')[0])

  const updateSortOrder = desc => {
    setDecending(desc)
    dispatch(updateSetting({ descending: desc }))
  }

  const clearData = async () => {
    await AsyncStorage.clear()
  }

  return (
    <Provider>
      <View>
        <View style={styles.transactionOrder}>
          <Text style={styles.transactionOrderTitle}>Transaction Order</Text>
        </View>
        <View style={styles.transactionOrder}>
          <Text
            style={[
              styles.transactionOrderItem,
              { color: descending ? 'grey' : 'black' },
            ]}>
            Ascending
          </Text>
          <Switch
            onValueChange={value => updateSortOrder(value)}
            value={descending}
          />
          <Text
            style={[
              styles.transactionOrderItem,
              { color: descending ? 'black' : 'grey' },
            ]}>
            Descending
          </Text>
        </View>
        <View style={styles.separator} />
        <Button
          icon="trash-can-outline"
          onPress={() => {
            setText('')
            setVisible(true)
          }}>
          Delete Data
        </Button>

        <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(false)}>
            <Dialog.Content>
              <Paragraph>Enter '{pass}' to delete content</Paragraph>
              <TextInput value={text} onChangeText={text => setText(text)} />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setVisible(false)}>Cancel</Button>
              <Button
                disabled={pass !== text}
                onPress={() => {
                  clearData()
                  setVisible(false)
                }}>
                Ok
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  transactionOrder: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  transactionOrderTitle: {
    margin: 6,
    fontWeight: 'bold',
  },
  transactionOrderItem: {
    margin: 6,
  },
  separator: {
    height: 1,
    backgroundColor: 'grey',
    margin: 25,
  },
})

export default SettingScreen
