import {
  ADD_SONG, INSERT_SONG,
  DELETE_SONG,
  SET_SONG_SQLITE_SYNC_STATUS_TO_TRUE,
  UPDATE_SONG
} from '../../src/constants/SongFormActionTypes';
import {
  ADD_SONG_TO_THEME,
  DELETE_SONG_FROM_THEMES
} from '../../src/constants/ThemeActionTypes';
import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import rootEpic from '../../src/epics';
import {insertSong, deleteSong, updateSong} from '../../src/epics/songs';
import { createEpicMiddleware } from 'redux-observable';
import {Map, Record} from 'immutable';
import Song from '../../src/records/Song';
import { assert } from 'chai';

export const song = Song({
  songId: "1",
  title: 'Task Title'
});

const epicMiddleware = createEpicMiddleware(rootEpic);
import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore([epicMiddleware]);
const store = mockStore(Record({
  songs: new Map({'1' : song}),
}));

describe('add song from song epic to database', () => {

  const action$ = ActionsObservable.of({type: INSERT_SONG, themeId: '2', title: 'Song title',
    poeticReferencePicture: 'Poetisches Bezugsbild',
    songtext: 'Songtext',
    themeContentRelated: 'Inhaltsbezogenes Thema',
    themeDetailed: 'Detailliertes Thema',
    rhymingScheme: 'Reimschema',
    chords: 'Akkorde'});

  it('dispatches the correct action when ajax call is successful', (done) => {
    const ajax = () => Observable.of({ response : '1'  });

    const expectedOutputActions =   [
      { type: ADD_SONG,
        songId: '1',
        themeId: '2',
        title: 'Song title',
        poeticReferencePicture: 'Poetisches Bezugsbild',
        songtext: 'Songtext',
        themeContentRelated: 'Inhaltsbezogenes Thema',
        themeDetailed: 'Detailliertes Thema',
        rhymingScheme: 'Reimschema',
        chords: 'Akkorde'},
      { type: ADD_SONG_TO_THEME, songId: '1', themeId: '2'},
      { type: SET_SONG_SQLITE_SYNC_STATUS_TO_TRUE, songId: '1'}];

    insertSong(action$, store, {ajax})
    .toArray()
    .subscribe(actualOutputActions => {
      assert.deepEqual(actualOutputActions, expectedOutputActions);
      done();
    })
  });
});

describe('update song from database', () => {

  const action$ = ActionsObservable.of({type: UPDATE_SONG,
    songId: '1',
    themeId: '2',
    title: 'Song title',
    poeticReferencePicture: 'Poetisches Bezugsbild',
    songtext: 'Songtext',
    themeContentRelated: 'Inhaltsbezogenes Thema',
    themeDetailed: 'Detailliertes Thema',
    rhymingScheme: 'Reimschema',
    chords: 'Akkorde'});

  it('dispatches the correct action when ajax call is successful', (done) => {
    const ajax = () => Observable.of();
    const expectedOutputActions = [
        {type: DELETE_SONG_FROM_THEMES, songId: '1', themeId: '2'},
        {type: ADD_SONG_TO_THEME, songId: '1', themeId: '2'},
        {type: SET_SONG_SQLITE_SYNC_STATUS_TO_TRUE, songId: '1'}
    ];

    updateSong(action$, store, {ajax})
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
    const expectedOutputActions = [{ type: DELETE_SONG_FROM_THEMES, songId: '1' }];

    deleteSong(action$, store, {ajax})
    .toArray()
    .subscribe(actualOutputActions => {
      assert.deepEqual(actualOutputActions, expectedOutputActions);
      done();
    })
  });

});