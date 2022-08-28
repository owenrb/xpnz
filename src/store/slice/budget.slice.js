import { createSlice } from '@reduxjs/toolkit'

const budgetSlice = createSlice({
  name: 'budget',
  initialState: {
    entries: [],
  },
  reducers: {
    status: (state, action) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { budget } = budgetSlice.actions
export default budgetSlice.reducer
