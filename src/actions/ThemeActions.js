import {
  ADD_THEME, RECEIVE_THEMES,
  ADD_SONG_TO_THEME,
  INSERT_THEME,
  SET_THEME_SQLITE_SYNC_STATUS_TO_TRUE,
  SET_THEME_SQLITE_SYNC_STATUS_TO_FALSE
} from '../constants/ThemeActionTypes';


export const insertTheme = (themeGeneral) => ({
  themeGeneral,
  type: INSERT_THEME
});


export const addTheme = (themeId, themeGeneral) => ({
  themeId,
  themeGeneral,
  type: ADD_THEME
});

export const addSongToTheme = (themeId, songId) => ({
  themeId,
  songId,
  type: ADD_SONG_TO_THEME
});

export const receiveThemes = (themes) => ({
  themes,
  type: RECEIVE_THEMES
});

export const setThemeSqliteSyncStatusToTrue = (themeId) => ({
  themeId,
  type: SET_THEME_SQLITE_SYNC_STATUS_TO_TRUE
});

export const setThemeSqliteSyncStatusToFalse = (themeId) => ({
  themeId,
  type: SET_THEME_SQLITE_SYNC_STATUS_TO_FALSE
});