import {
  ADD_SONG,
  INSERT_SONG,
  SET_SONG_SQLITE_SYNC_STATUS_TO_TRUE,
  SET_SONG_SQLITE_SYNC_STATUS_TO_FALSE,
  DELETE_SONG, RECEIVE_SONGS
} from '../constants/SongFormActionTypes';
import {ADD_THEME, INSERT_THEME, DELETE_SONG_FROM_THEMES} from '../constants/ThemeActionTypes';
import {Observable} from "rxjs/Rx";
import 'rxjs';
import {
  LOAD_INITIAL_SONG_STATE,
  SET_SQLITE_SYNC_STATUS_TO_FALSE
} from "../constants/InitialStateLoader";

const url = 'http://192.168.0.8:3001/api/song/';

export const addSong = (actions$, store, {ajax}) => (
    actions$
    .ofType(ADD_SONG)
    .switchMap(action =>
        ajax({
          method: 'POST',
          url: url + "create",
          body: {
            title: action.title,
            poeticReferencePicture: action.poeticReferencePicture,
            songtext: action.songtext,
            themeContentRelated: action.themeContentRelated,
            themeDetailed: action.themeDetailed,
            rhymingScheme: action.rhymingScheme,
            chords: action.chords
          }
        })
        .flatMap(response =>
            Observable.concat(
                Observable.of({
                  type: SET_SONG_SQLITE_SYNC_STATUS_TO_TRUE,
                  songId: action.songId
                }),
                Observable.of({
                  type: ADD_THEME,
                  songId: response.response.songId,
                  themeTitle: action.themeTitle
                })
            )
        )
        .catch(error => Observable.of({
          type: SET_SONG_SQLITE_SYNC_STATUS_TO_FALSE,
          songId: action.songId
        }))

    )
);

export const deleteSong = (actions$, store, {ajax}) => (
    actions$
    .ofType(DELETE_SONG)
    .switchMap(action =>
        ajax({
          method: 'DELETE',
          url: url + action.songId
        })
        .flatMap(response =>
            Observable.of({
              songId: action.songId,
              themeId: action.themeId,
              type: DELETE_SONG_FROM_THEMES
            }),
        )
    )
);