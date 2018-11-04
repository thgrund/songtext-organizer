import {DELETE_SONG, ADD_SONG,
  RECEIVE_SONGS, UPDATE_SONG,
  SET_SONG_SQLITE_SYNC_STATUS_TO_TRUE,
  SET_SONG_SQLITE_SYNC_STATUS_TO_FALSE} from "../constants/SongFormActionTypes";

import {default as Immutable, Map} from 'immutable';
import Song from '../records/Song';

export default function songs (state = Map({}), action) {
  switch (action.type) {
    case ADD_SONG:

      if (!action.title) {
        return state;
      }

      return state.set(action.songId, new Song ({
        songId: action.songId,
        themeId: action.themeId,
        title: action.title,
        poeticReferencePicture: action.poeticReferencePicture,
        songtext: action.songtext,
        themeContentRelated: action.themeContentRelated,
        themeDetailed: action.themeDetailed,
        rhymingScheme: action.rhymingScheme,
        chords: action.chords
      }));

    case UPDATE_SONG:
      return state.set(action.songId, new Song ({
        songId: action.songId,
        themeId: action.themeId,
        title: action.title,
        poeticReferencePicture: action.poeticReferencePicture,
        songtext: action.songtext,
        themeContentRelated: action.themeContentRelated,
        themeDetailed: action.themeDetailed,
        rhymingScheme: action.rhymingScheme,
        chords: action.chords
      }));

    case RECEIVE_SONGS:
      return (action.songs.reduce((acc, item) => {
        return acc.set(item.songId,
            new Song({
                songId: item.songId,
                themeId: item.themeId,
                title: item.title,
                poeticReferencePicture: item.poeticReferencePicture,
                songtext: item.songtext,
                themeContentRelated: item.themeContentRelated,
                themeDetailed: item.themeDetailed,
                rhymingScheme: item.rhymingScheme,
                chords: item.chords
            })
        )
      }, new Immutable.Map()));

    case DELETE_SONG:
      return state.delete(action.songId);

    case SET_SONG_SQLITE_SYNC_STATUS_TO_TRUE:
      return state.update(
          action.songId,
          song => song.set('syncStatus', true));


    case SET_SONG_SQLITE_SYNC_STATUS_TO_FALSE:
      return state.update(
          action.songId,
          song => song.set('syncStatus', false));

      default:
      return state;
  }
}