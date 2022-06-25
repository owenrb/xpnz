import { createSlice } from '@reduxjs/toolkit'

const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isDirty: false,
    entries: [],
    error: null,
  },
  reducers: {
    entry: (state, action) => {
      console.log({ module: 'slice-journal', state, action })
      //state.push(action.payload)
      //const isAuth = true
      return { ...state, ...action.payload }
    },
  },
})

export const { entry } = journalSlice.actions
export default journalSlice.reducer
