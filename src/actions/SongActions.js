import {
  INSERT_SONG, UPDATE_SONG,
  ADD_SONG, RECEIVE_SONGS, DELETE_SONG,
  SET_SONG_SQLITE_SYNC_STATUS_TO_FALSE,
  SET_SONG_SQLITE_SYNC_STATUS_TO_TRUE
} from '../constants/SongFormActionTypes';
import {DELETE_SONG_FROM_THEMES} from "../constants/ThemeActionTypes";


export const insertSong = (themeId, title, poeticReferencePicture, songtext, themeContentRelated,themeDetailed, rhymingScheme, chords) => ({
  themeId,
  title,
  poeticReferencePicture,
  songtext,
  themeContentRelated,
  themeDetailed,
  rhymingScheme,
  chords,
  type: INSERT_SONG
});

export const updateSong = (songId, themeId, title, poeticReferencePicture, songtext, themeContentRelated,themeDetailed, rhymingScheme, chords) => ({
  songId,
  themeId,
  title,
  poeticReferencePicture,
  songtext,
  themeContentRelated,
  themeDetailed,
  rhymingScheme,
  chords,
  type: UPDATE_SONG
});


export const addSong = (songId, themeId, title, poeticReferencePicture, songtext, themeContentRelated,themeDetailed, rhymingScheme, chords) => ({
  songId,
  themeId,
  title,
  poeticReferencePicture,
  songtext,
  themeContentRelated,
  themeDetailed,
  rhymingScheme,
  chords,
  type: ADD_SONG
});


export const receiveSongs = (songs, themes) => ({
  songs,
  themes,
  type: RECEIVE_SONGS
});

export const deleteSong = (songId, themeId) => ({
  songId,
  themeId,
  type: DELETE_SONG
});

export const deleteSongFromThemes = (songId) => ({
  songId,
  type: DELETE_SONG_FROM_THEMES
});

export const setSongSqliteSyncStatusToTrue = (songId) => ({
  songId,
  type: SET_SONG_SQLITE_SYNC_STATUS_TO_TRUE
});

export const setSongSqliteSyncStatusToFalse = (songId) => ({
  songId,
  type: SET_SONG_SQLITE_SYNC_STATUS_TO_FALSE
});