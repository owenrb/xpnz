import AsyncStorage from '@react-native-async-storage/async-storage'

const createJournal = async data => {
  const value =
    (await AsyncStorage.getItem('@journal')) || JSON.stringify({ entries: [] })

  const obj = JSON.parse(value)

  obj.isDirty = true
  obj.entries.push(data)

  const updated = JSON.stringify(obj)

  //await AsyncStorage.setItem('@journal', updated)

  return obj
}

export { createJournal }
