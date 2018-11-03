import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './reducers';
import rootEpic from './epics';
import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './assets/css/song.css';
import { loadInitialSongState, loadInitialThemeState } from './actions/InitialStateLoaderAction';

import { Provider } from 'react-redux';
import OrganizerContainer from './containers/OrganizerContainer'

const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware)
);

store.dispatch(loadInitialThemeState());
store.dispatch(loadInitialSongState());

render(
    <Provider store={store}>
      <OrganizerContainer />
    </Provider>,
    document.getElementById('root')
);

