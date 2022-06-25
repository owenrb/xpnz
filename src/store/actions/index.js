import { createJournal } from '../dao'

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

  return {
    type: 'journal/entry',
    payload,
  }
}
