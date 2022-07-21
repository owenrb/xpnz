import { createJournal, getJournal, removeJournal } from '../dao'
import moment from 'moment'
import { addMonths, monthDiff } from '../../utils/date'
import { DATE_FORMAT, DATE_FORMAT_KEY } from '../../config/constants'

export const loginUser = value => ({
  type: 'auth/loginUser',
  // always success this time
  payload: {
    isAuth: true,
  },
})

export const addJournalEntry = value => ({
  type: 'JOURNAL_ENTRY',
  payload: api.addJournalEntry(values),
})

const handleRepeat = async values => {
  const { repeat, date, description } = values

  const value = parseInt(repeat || '0')

  if (value < 2) return

  const dateVal = moment(date, DATE_FORMAT).toDate()

  for (m = 1; m < value; m++) {
    const next = addMonths(dateVal, m)
    const desc = '(' + (m + 1) + '/' + value + ') ' + description
    await addEntry({
      ...values,
      repeat: '0',
      date: moment(next).format(DATE_FORMAT),
      description: desc,
    })
  }
}

export const addEntry = async values => {
  await handleRepeat(values)

  const payload = await createJournal(values)

  console.log({ addEntry: payload })

  return {
    type: 'journal/entry',
    payload,
  }
}

export const getEntries = async yyyymm => {
  const label = '@journal-' + (yyyymm || moment().format(DATE_FORMAT_KEY))

  const payload = await getJournal(label)

  return {
    type: 'journal/entry',
    payload,
  }
}

export const deleteEntry = async (id, date) => {
  const label = '@journal-' + moment(date).format(DATE_FORMAT_KEY)

  const payload = await removeJournal(label, id)

  return {
    type: 'journal/entry',
    payload,
  }
}
