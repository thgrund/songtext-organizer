import {
  LOAD_INITIAL_THEME_STATE,
  LOAD_INITIAL_SONG_STATE
} from '../constants/InitialStateLoader';
import { Map } from 'immutable';

export default function initialStateLoader (state = Map({}), action) {

  switch (action.type) {
    case LOAD_INITIAL_THEME_STATE:
      return state;
    case LOAD_INITIAL_SONG_STATE:
      return state;
    default:
      return state;
  }
}