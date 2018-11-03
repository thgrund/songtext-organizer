import { addTheme, receiveThemes, deleteSongFromThemes } from './ThemeActions';
import { ADD_THEME, RECEIVE_THEMES, DELETE_SONG_FROM_THEMES } from '../constants/ThemeActionTypes';

describe('add theme action', () => {

  it('addTheme should create ADD_THEME action with all fields', () => {
    expect(addTheme(['1'], 'Theme title',)).toEqual({
      themeId: '2',
      songIds: ['1'],
      themeGeneral: 'Theme title',
      type: ADD_THEME
    })
  });

  it('addTheme should create ADD_THEME action with no themeGeneral', () => {
    expect(addTheme(['1'], '')).toEqual({
      themeId: '3',
      songIds: ['1'],
      themeGeneral: '',
      type: ADD_THEME
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
