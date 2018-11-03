import {
  ADD_THEME, RECEIVE_THEMES, DELETE_SONG_FROM_THEMES
} from '../constants/ThemeActionTypes';

import ThemeCounter from "../utils/SongCounter";

export const addTheme = (songIds, themeGeneral ) => ({
  themeId: ThemeCounter.increment(),
  songIds,
  themeGeneral,
  type: ADD_THEME
});

export const receiveThemes = (themes) => ({
  themes,
  type: RECEIVE_THEMES
});

export const deleteSongFromThemes = (songId, themeId) => ({
  songId,
  themeId,
  type: DELETE_SONG_FROM_THEMES
});