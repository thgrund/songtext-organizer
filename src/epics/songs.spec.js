import {
  ADD_SONG,
  INSERT_SONG,
  DELETE_SONG,
  SET_SONG_SQLITE_SYNC_STATUS_TO_TRUE,
  SET_SONG_SQLITE_SYNC_STATUS_TO_FALSE
} from '../constants/SongFormActionTypes';
import {ADD_THEME, INSERT_THEME, DELETE_SONG_FROM_THEMES} from '../constants/ThemeActionTypes';
import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import rootEpic from '../epics';
import {addSong, deleteSong} from './songs';
import { createEpicMiddleware } from 'redux-observable';
import {Map, Record} from 'immutable';
import Song from '../records/Song';
import { assert } from 'chai';

export const song = Song({
  songId: "1",
  title: 'Task Title'
});

const epicMiddleware = createEpicMiddleware(rootEpic);
import configureMockStore from 'redux-mock-store';
import {LOAD_INITIAL_SONG_STATE} from "../constants/InitialStateLoader";
import {initiateSongState} from "./initialStateLoader";
const mockStore = configureMockStore([epicMiddleware]);
const store = mockStore(Record({
  songs: new Map({'1' : song}),
}));

describe('add song from song epic to database', () => {

  const action$ = ActionsObservable.of({type: ADD_SONG, themeTitle: 'Liebe', songId: '1'});

    it('dispatches the correct action when ajax call is successful', (done) => {
    const ajax = () => Observable.of({ response : { songId: '1' }  });

    const expectedOutputActions =   [
      { type: SET_SONG_SQLITE_SYNC_STATUS_TO_TRUE, songId: '1'},
      { type: ADD_THEME, songId: '1', themeTitle: 'Liebe'},
    ];

    addSong(action$, store, {ajax})
    .toArray()
    .subscribe(actualOutputActions => {
      assert.deepEqual(actualOutputActions, expectedOutputActions);
      done();
    })
  });

  it('dispatches the correct action when there is an error', (done) => {
    const ajax = () => Observable.throw('save failed');
    const expectedOutputActions = [{ type: SET_SONG_SQLITE_SYNC_STATUS_TO_FALSE, songId: '1' }];

    addSong(action$, store, {ajax})
    .toArray()
    .subscribe(actualOutputActions => {
      assert.deepEqual(actualOutputActions, expectedOutputActions);
      done();
    })
  });
});


describe('delete song from database', () => {

  const action$ = ActionsObservable.of({type: DELETE_SONG, songId: '1', themeId: '2'});

  it('dispatches the correct action when ajax call is successful', (done) => {
    const ajax = () => Observable.of({response: []});
    const expectedOutputActions = [{ type: DELETE_SONG_FROM_THEMES, songId: '1', themeId: '2' }];

    deleteSong(action$, store, {ajax})
    .toArray()
    .subscribe(actualOutputActions => {
      assert.deepEqual(actualOutputActions, expectedOutputActions);
      done();
    })
  });

});