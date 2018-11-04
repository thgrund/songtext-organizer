import * as songEpic from './songs';
import * as themeEpic from './themes';
import * as initialLoaderEpic from './initialStateLoader';

import { combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';

export default (...args) => combineEpics(
    songEpic.insertSong,
    songEpic.deleteSong,
    songEpic.updateSong,
    themeEpic.addTheme,
    initialLoaderEpic.initiateThemeState,
    initialLoaderEpic.initiateSongState
)(...args, {ajax});