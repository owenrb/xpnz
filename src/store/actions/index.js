import { createJournal, getJournal } from '../dao'
import moment from 'moment'

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

export const addEntry = async values => {
  const payload = await createJournal(values)

  console.log({ addEntry: payload })

  return {
    type: 'journal/entry',
    payload,
  }
}

export const getEntries = async yyyymm => {
  const label = '@journal-' + (yyyymm || moment().format('YYYY-MM'))

  const payload = await getJournal(label)

  return {
    type: 'journal/entry',
    payload,
  }
}
