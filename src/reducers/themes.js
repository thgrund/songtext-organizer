import {
  ADD_THEME
} from '../constants/ThemeActionTypes';
import { Map } from 'immutable';
import Theme from '../records/Theme';
import Immutable from 'immutable';
import {RECEIVE_THEMES, DELETE_SONG_FROM_THEMES} from "../constants/ThemeActionTypes";
import {RECEIVE_SONGS} from "../constants/SongFormActionTypes";

export default function themes (state = Map({}), action) {


  switch (action.type) {
    case ADD_THEME:

      if (!action.themeGeneral) {
        return state;
      }

      return state.set(action.themeId,
        new Theme ({
        themeId: action.themeId,
        songIds: action.songIds,
        themeGeneral: action.themeGeneral,
      }));

    case RECEIVE_THEMES:
      return (action.themes.reduce((acc, item) => {
        return acc.set(item.id,
            new Theme({
              themeId: item.id,
              songIds: [],
              themeGeneral: item.themeGeneral})
        )
      }, new Immutable.Map()));

    case RECEIVE_SONGS:
      action.songs.map((value) => {
        let themeSongIdArr = state.get(value.themeId).songIds;

        themeSongIdArr.push(value.songId);

        state = state.update(
            value.themeId,
            theme => theme.set('songIds', themeSongIdArr));
        return state;
      });

      return state;

    case DELETE_SONG_FROM_THEMES:

      let newSongIds = state.get(action.themeId).songIds.slice();
      newSongIds.splice(newSongIds.indexOf(action.songId), 1)

      return state.update(action.themeId,
          theme => theme.set('songIds', newSongIds)
      );

    default:
      return state;
  }
}