const INITIAL_STATE = {
  user: null,
  isAuth: false,
  profile: {},
  error: null,
}

export default function (state = INITIAL_STATE, action) {
  console.log({ action })
  switch (action.type) {
    case 'AUTH_USER_SUCCESS':
      return { ...state, ...action.payload }
    default:
      return state
  }
}
