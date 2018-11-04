import { addTheme, receiveThemes, deleteSongFromThemes, insertTheme } from '../../src/actions/ThemeActions';
import {ADD_THEME, INSERT_THEME,
  ADD_SONG_TO_THEME,
  RECEIVE_THEMES,
  DELETE_SONG_FROM_THEMES,
  SET_THEME_SQLITE_SYNC_STATUS_TO_FALSE,
  SET_THEME_SQLITE_SYNC_STATUS_TO_TRUE } from '../../src/constants/ThemeActionTypes';
import {
  setThemeSqliteSyncStatusToFalse,
  setThemeSqliteSyncStatusToTrue,
  addSongToTheme
} from "../../src/actions/ThemeActions";

describe('insert theme action', () => {

  it('insertTheme should create INSERT_THEME action with all fields', () => {
    expect(insertTheme('Theme title')).toEqual({
      themeGeneral: 'Theme title',
      type: INSERT_THEME
    })
  });
});

describe('add theme action', () => {

  it('addTheme should create ADD_THEME action with all fields', () => {
    expect(addTheme('2', 'Theme title', '2')).toEqual({
      themeId: '2',
      themeGeneral: 'Theme title',
      type: ADD_THEME
    })
  });

  it('addTheme should create ADD_THEME action with no themeGeneral', () => {
    expect(addTheme('3', '', '2')).toEqual({
      themeId: '3',
      themeGeneral: '',
      type: ADD_THEME
    })
  });
});

describe('add song to theme action', () => {

  it('addSongToTheme should create ADD_SONG_TO_THEME action with all fields', () => {
    expect(addSongToTheme('1', '2')).toEqual({
      themeId: '1',
      songId: '2',
      type: ADD_SONG_TO_THEME
    })
  });
});

describe('receive theme action', () => {

  it('receiveTheme should create RECEIVE_THEME action', () => {
    expect(receiveThemes([
      { id: '1', themeGeneral: 'Fernweh' },
      { id: '2', themeGeneral: 'Liebe'}
    ])).toEqual({
      themes: [
        { id: '1', themeGeneral: 'Fernweh' },
        { id: '2', themeGeneral: 'Liebe'}
      ],
      type: RECEIVE_THEMES
    })
  });
});

describe('delete song from theme action', () => {

  it('deleteSongFromThemes should create DELETE_SONG_FROM_THEMES action', () => {
    expect(deleteSongFromThemes('1', '2')).toEqual({
      songId: '1',
      themeId: '2',
      type: DELETE_SONG_FROM_THEMES
    })
  });
});

describe('SQLite sync theme action', () => {

  it('SQLite theme sync should create SET_THEME_SQLITE_SYNC_STATUS_TO_TRUE action', () => {
    expect(setThemeSqliteSyncStatusToTrue('1')).toEqual({
      themeId: '1',
      type: SET_THEME_SQLITE_SYNC_STATUS_TO_TRUE
    })
  });

  it('SQLite theme sync should create SET_THEME_SQLITE_SYNC_STATUS_TO_FALSE action', () => {
    expect(setThemeSqliteSyncStatusToFalse('1')).toEqual({
      themeId: '1',
      type: SET_THEME_SQLITE_SYNC_STATUS_TO_FALSE
    })
  });
});