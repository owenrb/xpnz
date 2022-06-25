import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuth: false,
    profile: {},
    error: null,
  },
  reducers: {
    loginUser: (state, action) => {
      console.log({ module: 'slice', state, action })
      //state.push(action.payload)
      //const isAuth = true
      return { ...state, ...action.payload }
    },
    loginUserSuccess: (state, action) => {
      console.log({ reducer: 'success', state, action })
      //state.push(action.payload)
      return state
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser)
  },
})

export const { loginUser } = authSlice.actions
export default authSlice.reducer
