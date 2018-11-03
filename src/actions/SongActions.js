import {
  ADD_SONG, RECEIVE_SONGS, DELETE_SONG
} from '../constants/SongFormActionTypes';

import SongCounter from "../utils/SongCounter";


export const addSong = (themeTitle, title, poeticReferencePicture, songtext, themeContentRelated,themeDetailed, rhymingScheme, chords) => ({
  themeTitle,
  songId: SongCounter.increment(),
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