import { combineReducers } from 'redux';
import songs from './songs'
import themes from './themes'
import initialStateLoader  from './initialStateLoader'

export default combineReducers({
  songs,
  themes,
  initialStateLoader
})

