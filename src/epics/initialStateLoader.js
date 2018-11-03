import {SET_SQLITE_SYNC_STATUS_TO_FALSE, LOAD_INITIAL_SONG_STATE, LOAD_INITIAL_THEME_STATE} from '../constants/InitialStateLoader';
import {RECEIVE_THEMES} from "../constants/ThemeActionTypes";
import {RECEIVE_SONGS} from "../constants/SongFormActionTypes";
import {Observable} from "rxjs/Rx";
import 'rxjs';

const themeUrl = 'http://192.168.0.8:3001/api/theme/';
const songUrl = 'http://192.168.0.8:3001/api/song/';

export const initiateThemeState = (actions$, store, {ajax}) => (
    actions$
    .ofType(LOAD_INITIAL_THEME_STATE)
    .switchMap(action =>
        ajax({
          method: 'GET',
          url: themeUrl
        })
        .flatMap(response =>
            Observable.of({
              type: RECEIVE_THEMES,
              themes: response.response
            })
        )
        .catch(error => Observable.of({
          type: SET_SQLITE_SYNC_STATUS_TO_FALSE,
          themeId: action.themeId
        }))
    )
);

export const initiateSongState = (actions$, store, {ajax}) => (
    actions$
    .ofType(LOAD_INITIAL_SONG_STATE)
    .switchMap(action =>
        ajax({
          method: 'GET',
          url: songUrl
        })
        .flatMap(response =>
            Observable.of({
              songs: response.response,
              themes: store.getState('themes').themes,
              type: RECEIVE_SONGS
            }),
        )
        .catch(error => Observable.of({
          type: SET_SQLITE_SYNC_STATUS_TO_FALSE,
          songId: action.songId
        }))
    )
);