import React, { useState } from 'react'
import { Text, View } from 'react-native'
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  TextInput,
  Provider,
} from 'react-native-paper'
import uuid from 'react-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SettingScreen = () => {
  const [visible, setVisible] = useState(false)
  const [text, setText] = React.useState('')
  const [pass, setPass] = useState(uuid().split('-')[0])

  const clearData = async () => {
    await AsyncStorage.clear()
  }

  return (
    <Provider>
      <View>
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

export default SettingScreen
