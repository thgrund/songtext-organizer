import {
  ADD_SONG,
  INSERT_SONG,
  SET_SONG_SQLITE_SYNC_STATUS_TO_TRUE,
  DELETE_SONG,
  UPDATE_SONG,
} from '../constants/SongFormActionTypes';
import {
  DELETE_SONG_FROM_THEMES,
  ADD_SONG_TO_THEME} from '../constants/ThemeActionTypes';
import {Observable} from "rxjs/Rx";
import 'rxjs';

const url = 'http://info-grund.com:8080/songtext-organizer-api/api/song/';

export const updateSong = (actions$, store, {ajax}) => (
    actions$
    .ofType(UPDATE_SONG)
    .switchMap(action =>
        ajax({
          method: 'PUT',
          url: url + action.songId,
          body: {
            songId: action.songId,
            title: action.title,
            themeId: action.themeId,
            poeticReferencePicture: action.poeticReferencePicture,
            songtext: action.songtext,
            themeContentRelated: action.themeContentRelated,
            themeDetailed: action.themeDetailed,
            rhymingScheme: action.rhymingScheme,
            chords: action.chords
          }
        }).flatMap(response =>
            Observable.concat(
                Observable.of({
                  type: DELETE_SONG_FROM_THEMES,
                  songId: action.songId
                }),
                Observable.of({
                  type: ADD_SONG_TO_THEME,
                  songId: action.songId,
                  themeId: action.themeId
                }),
                Observable.of({
                  type: SET_SONG_SQLITE_SYNC_STATUS_TO_TRUE,
                  songId: action.songId
                })
            )
        )
    )
);

export const insertSong = (actions$, store, {ajax}) => (
    actions$
    .ofType(INSERT_SONG)
    .switchMap(action =>
        ajax({
          method: 'POST',
          url: url + "create",
          body: {
            title: action.title,
            themeId: action.themeId,
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
                  type: ADD_SONG,
                  songId: response.response,
                  themeId: action.themeId,
                  title: action.title,
                  poeticReferencePicture: action.poeticReferencePicture,
                  songtext: action.songtext,
                  themeContentRelated: action.themeContentRelated,
                  themeDetailed: action.themeDetailed,
                  rhymingScheme: action.rhymingScheme,
                  chords: action.chords
                }),
                Observable.of({
                  type: ADD_SONG_TO_THEME,
                  songId: response.response,
                  themeId: action.themeId
                }),
                Observable.of({
                  type: SET_SONG_SQLITE_SYNC_STATUS_TO_TRUE,
                  songId: response.response
                })
            )
        )
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
              type: DELETE_SONG_FROM_THEMES
            }),
        )
    )
);