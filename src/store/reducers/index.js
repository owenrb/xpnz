import { combineReducers } from "redux";
import journal  from './journal.reducer'
import auth from './auth.reducer'

const rootReducer = combineReducers( { auth, journal } )

export default rootReducer