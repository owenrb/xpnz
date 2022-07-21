import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import uuid from 'react-uuid'

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

  data.id = uuid()
  obj.entries.push(data)

  const updated = JSON.stringify(obj)

  await AsyncStorage.setItem(label, updated)

  return obj
}

const getJournal = async label => {
  const value =
    (await AsyncStorage.getItem(label)) || JSON.stringify({ entries: [] })

  return JSON.parse(value)
}

const removeJournal = async (label, id) => {
  const journal = await getJournal(label)

  const { entries } = journal

  console.log({ entries })

  const filtered = entries.filter(item => item.id !== id)

  console.log({ filtered })

  journal.entries = filtered
  const updated = JSON.stringify(journal)
  await AsyncStorage.setItem(label, updated)

  return journal
}

export { createJournal, getJournal, removeJournal }
