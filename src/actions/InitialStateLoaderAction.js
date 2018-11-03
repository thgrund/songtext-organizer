import {LOAD_INITIAL_SONG_STATE, LOAD_INITIAL_THEME_STATE} from "../constants/InitialStateLoader";

export const loadInitialSongState = () => ({
  type: LOAD_INITIAL_SONG_STATE
});

export const loadInitialThemeState = () => ({
  type: LOAD_INITIAL_THEME_STATE
});
