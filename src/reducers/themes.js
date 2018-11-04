import {ADD_SONG_TO_THEME,
  ADD_THEME, RECEIVE_THEMES, DELETE_SONG_FROM_THEMES,
  SET_THEME_SQLITE_SYNC_STATUS_TO_FALSE,
  SET_THEME_SQLITE_SYNC_STATUS_TO_TRUE} from "../constants/ThemeActionTypes";
import { Map } from 'immutable';
import Theme from '../records/Theme';
import Immutable from 'immutable';
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
        themeGeneral: action.themeGeneral,
      }));

    case ADD_SONG_TO_THEME:
      let songIdArr = state.get(action.themeId).songIds;
      songIdArr.push(action.songId);

      state = state.update(
          action.themeId,
          theme => theme.set('songIds', songIdArr));
      return state;

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

    case SET_THEME_SQLITE_SYNC_STATUS_TO_TRUE:
      return state.update(
          action.themeId,
          theme => theme.set('syncStatus', true));


    case SET_THEME_SQLITE_SYNC_STATUS_TO_FALSE:
      return state.update(
          action.themeId,
          theme => theme.set('syncStatus', false));

    default:
      return state;
  }
}