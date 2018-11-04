import {
  ADD_THEME,
  INSERT_THEME,
  SET_THEME_SQLITE_SYNC_STATUS_TO_TRUE
} from '../../src/constants/ThemeActionTypes';
import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import rootEpic from '../../src/epics';
import {addTheme} from '../../src/epics/themes';
import { createEpicMiddleware } from 'redux-observable';
import {Map, Record} from 'immutable';
import Theme from '../../src/records/Theme';
import { assert } from 'chai';

export const theme = Theme({
  themeId: "1",
  themeGeneral: 'Theme Title'
});

const epicMiddleware = createEpicMiddleware(rootEpic);
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore([epicMiddleware]);

const store = mockStore(Record({
  themes: new Map({'1' : theme}),
}));

describe('add theme from theme epic to database', () => {

  const action$ = ActionsObservable.of({type: INSERT_THEME, themeGeneral: 'Liebe'});

  it('dispatches the correct action when ajax call is successful', (done) => {
    const ajax = () => Observable.of({ response : '1'   });

    const expectedOutputActions =   [
      { type: ADD_THEME, themeId: '1', themeGeneral: 'Liebe'},
      { type: SET_THEME_SQLITE_SYNC_STATUS_TO_TRUE, themeId: '1'}];
    addTheme(action$, store, {ajax})
    .toArray()
    .subscribe(actualOutputActions => {
      assert.deepEqual(actualOutputActions, expectedOutputActions);
      done();
    })
  });
});