import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'

/**
 *
 * @param {*} data see journal.reducer.js
 * @returns
 */
const createJournal = async data => {
  const { date } = data
  const parsed = moment(date, 'YYYY-MM-DD')
  const label = '@journal-' + parsed.format('YYYY-MM')

  const value =
    (await AsyncStorage.getItem(label)) || JSON.stringify({ entries: [] })

  const obj = JSON.parse(value)

  obj.entries.push(data)

  const updated = JSON.stringify(obj)

  //await AsyncStorage.setItem(label, updated)

  return obj
}

const getJournal = async label => {
  const value =
    (await AsyncStorage.getItem(label)) || JSON.stringify({ entries: [] })

  return JSON.parse(value)
}

export { createJournal, getJournal }
