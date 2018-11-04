import {
  LOAD_INITIAL_SONG_STATE,
  LOAD_INITIAL_THEME_STATE
} from "../../src/constants/InitialStateLoader";

import {RECEIVE_THEMES} from "../../src/constants/ThemeActionTypes";
import {RECEIVE_SONGS} from "../../src/constants/SongFormActionTypes";
import Theme from '../../src/records/Theme';
import rootEpic from '../../src/epics';
import {initiateThemeState, initiateSongState} from '../../src/epics/initialStateLoader';
import {Map, Record} from 'immutable';

import { createEpicMiddleware, ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import {assert} from "chai";
import configureMockStore from 'redux-mock-store';

const epicMiddleware = createEpicMiddleware(rootEpic);
const mockStore = configureMockStore([epicMiddleware]);

const theme_1 = Theme({
  themeId: '1',
  songIds: [''],
  themeGeneral: 'Liebe'
});

const store = mockStore(() => ({
  themes:  new Map({'1': theme_1})
}));

describe('load initial theme state from database', () => {

  const action$ = ActionsObservable.of({type: LOAD_INITIAL_THEME_STATE});

  it('dispatches the correct action when ajax call is successful', (done) => {
    const ajax = () => Observable.of({ response : [{ id: '1', themeGeneral: 'Fernweh' }, {id: '2', themeGeneral: 'Liebe'}]  });

    const expectedOutputActions =   [
      { type: RECEIVE_THEMES, themes: [
          {id: '1', themeGeneral: 'Fernweh'},
          {id: '2', themeGeneral: 'Liebe'}]},
    ];

    initiateThemeState(action$, store, {ajax})
    .toArray()
    .subscribe(actualOutputActions => {
      assert.deepEqual(actualOutputActions, expectedOutputActions);
      done();
    })
  });

});

describe('load initial song state from database', () => {

  const action$ = ActionsObservable.of({type: LOAD_INITIAL_SONG_STATE});

  it('dispatches the correct action when ajax call is successful', (done) => {
    const ajax = () => Observable.of({ response : [{ id: '1', themeGeneral: 'Fernweh' }, {id: '2', themeGeneral: 'Liebe'}]  });

    const expectedOutputActions =
        [{
          type: RECEIVE_SONGS,
          songs: [
            {id: '1', themeGeneral: 'Fernweh'},
            {id: '2', themeGeneral: 'Liebe'}],
          themes: new Map({'1': theme_1})
        }];

    initiateSongState(action$, store, {ajax})
    .toArray()
    .subscribe(actualOutputActions => {
assert.deepEqual(actualOutputActions, expectedOutputActions);
      done();
    })
  });

});