import * as songEpic from './songs';
import * as initialLoaderEpic from './initialStateLoader';

import { combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';

export default (...args) => combineEpics(
    songEpic.addSong,
    songEpic.deleteSong,
    initialLoaderEpic.initiateThemeState,
    initialLoaderEpic.initiateSongState
)(...args, {ajax});