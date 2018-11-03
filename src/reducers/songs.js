import {
  ADD_SONG, DELETE_SONG
} from '../constants/SongFormActionTypes';
import {default as Immutable, Map} from 'immutable';
import Song from '../records/Song';
import {RECEIVE_SONGS} from "../constants/SongFormActionTypes";

export default function songs (state = Map({}), action) {
  switch (action.type) {
    case ADD_SONG:

      if (!action.title) {
        return state;
      }

      return state.set(action.songId, new Song ({
        songId: action.songId,
        title: action.title,
        poeticReferencePicture: action.poeticReferencePicture,
        songtext: action.songtext,
        themeContentRelated: action.themeContentRelated,
        themeDetailed: action.themeDetailed,      }));

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
    default:
      return state;
  }
}