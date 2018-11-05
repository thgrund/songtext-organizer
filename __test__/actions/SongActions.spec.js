import { addSong, insertSong } from '../../src/actions/SongActions';
import { ADD_SONG, RECEIVE_SONGS, DELETE_SONG, INSERT_SONG,SET_SONG_SQLITE_SYNC_STATUS_TO_FALSE, SET_SONG_SQLITE_SYNC_STATUS_TO_TRUE } from '../../src/constants/SongFormActionTypes';
import {receiveSongs, deleteSong, setSongSqliteSyncStatusToTrue, setSongSqliteSyncStatusToFalse, deleteSongFromThemes} from "../../src/actions/SongActions";
import Theme from "../../src/records/Theme";
import {Map} from "immutable";
import {DELETE_SONG_FROM_THEMES} from "../../src/constants/ThemeActionTypes";

const theme_1 = Theme({
  themeId: '1',
  songIds: [''],
  themeGeneral: 'Liebe'
});

describe('song actions', () => {

  it('insertSong should create INSERT_SONG action with all fields', () => {
    expect(insertSong('1', 'Song title', 'Poetisches Bezugsbild', 'Songtext', 'Inhaltsbezogenes Thema', 'Detailliertes Thema', 'Reimschema', 'Akkorde')).toEqual({
      themeId: '1',
      title: 'Song title',
      poeticReferencePicture: 'Poetisches Bezugsbild',
      songtext: 'Songtext',
      themeContentRelated: 'Inhaltsbezogenes Thema',
      themeDetailed: 'Detailliertes Thema',
      rhymingScheme: 'Reimschema',
      chords: 'Akkorde',
      type: INSERT_SONG
    })
  });

  it('addSong should create ADD_SONG action with all fields', () => {
    expect(addSong('2', '1', 'Song title', 'Poetisches Bezugsbild', 'Songtext', 'Inhaltsbezogenes Thema', 'Detailliertes Thema', 'Reimschema', 'Akkorde')).toEqual({
      songId: '2',
      themeId: '1',
      title: 'Song title',
      poeticReferencePicture: 'Poetisches Bezugsbild',
      songtext: 'Songtext',
      themeContentRelated: 'Inhaltsbezogenes Thema',
      themeDetailed: 'Detailliertes Thema',
      rhymingScheme: 'Reimschema',
      chords: 'Akkorde',
      type: ADD_SONG
    })
  });

  it('addSong should create ADD_SONG action without optional fields', () => {
    expect(addSong('3', '1', 'Song title', '', '', '', '', '', '')).toEqual({
      songId: '3',
      themeId: '1',
      title: 'Song title',
      poeticReferencePicture: '',
      songtext: '',
      themeContentRelated: '',
      themeDetailed: '',
      rhymingScheme: '',
      chords: '',
      type: ADD_SONG
    })
  });
});

describe('delete song from theme action', () => {

  it('deleteSongFromThemes should create DELETE_SONG_FROM_THEMES action', () => {
    expect(deleteSongFromThemes('1')).toEqual({
      songId: '1',
      type: DELETE_SONG_FROM_THEMES
    })
  });
});

describe('receive song action', () => {

  it('receiveSong should create RECEIVE_SONGS action', () => {
    expect(receiveSongs([
      { id: '1', themeId: '1', themeGeneral: 'Fernweh' },
      { id: '2', themeId: '1', themeGeneral: 'Liebe'}
      ], new Map({'1': theme_1}))).toEqual({
      songs: [
        { id: '1', themeId: '1', themeGeneral: 'Fernweh' },
        { id: '2', themeId: '1', themeGeneral: 'Liebe'}
      ],
      themes: new Map({'1': theme_1}),
      type: RECEIVE_SONGS
    })
  });
});

describe('delete song action', () => {

  it('delete song should create DELETE_SONG action', () => {
    expect(deleteSong('1', '1')).toEqual({
      songId: '1',
      themeId: '1',
      type: DELETE_SONG
    })
  });
});


describe('sqlite sync song action', () => {

  it('sqlite song sync should create SET_SONG_SQLITE_SYNC_STATUS_TO_TRUE action', () => {
    expect(setSongSqliteSyncStatusToTrue('1')).toEqual({
      songId: '1',
      type: SET_SONG_SQLITE_SYNC_STATUS_TO_TRUE
    })
  });

  it('sqlite song sync should create SET_SONG_SQLITE_SYNC_STATUS_TO_FALSE action', () => {
    expect(setSongSqliteSyncStatusToFalse('1')).toEqual({
      songId: '1',
      type: SET_SONG_SQLITE_SYNC_STATUS_TO_FALSE
    })
  });
});