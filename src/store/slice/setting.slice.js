import { createSlice } from '@reduxjs/toolkit'

const settingSlice = createSlice({
  name: 'user',
  initialState: {
    descending: false,
  },
  reducers: {
    setting: (state, action) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { setting } = settingSlice.actions
export default settingSlice.reducer
