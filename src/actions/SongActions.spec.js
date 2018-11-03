import { addSong } from './SongActions';
import { ADD_SONG, RECEIVE_SONGS, DELETE_SONG } from '../constants/SongFormActionTypes';
import {receiveSongs, deleteSong} from "./SongActions";
import Theme from "../records/Theme";
import {Map} from "immutable";

const theme_1 = Theme({
  themeId: '1',
  songIds: [''],
  themeGeneral: 'Liebe'
});

describe('song actions', () => {

  it('addSong should create ADD_SONG action with all fields', () => {
    expect(addSong('Liebe', 'Song title', 'Poetisches Bezugsbild', 'Songtext', 'Inhaltsbezogenes Thema', 'Detailliertes Thema', 'Reimschema', 'Akkorde')).toEqual({
      songId: '2',
      themeTitle: 'Liebe',
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
    expect(addSong('Liebe', 'Song title', '', '', '', '', '', '')).toEqual({
      songId: '3',
      themeTitle: 'Liebe',
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
