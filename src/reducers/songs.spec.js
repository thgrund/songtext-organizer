import {ADD_SONG, RECEIVE_SONGS, DELETE_SONG} from '../constants/SongFormActionTypes';
import reducer from './songs';
import { Map } from 'immutable';

import Song from '../records/Song';

describe('songs rootReducer', () => {

  const song_1 = Song({
    songId: '1',
    themeId: '',
    title: 'Run the test',
    poeticReferencePicture: 'Poetisches Bezugsbild',
    songtext: 'Songtext',
    themeContentRelated: 'Inhaltsbezogenes Thema',
    themeDetailed: 'Detailliertes Thema'
  });
  const song_2 = Song({
    songId: '2',
    themeId: '',
    title: 'Run the next test',
    poeticReferencePicture: 'Poetisches Bezugsbild',
    songtext: 'Songtext',
    themeContentRelated: 'Inhaltsbezogenes Thema',
    themeDetailed: 'Detailliertes Thema'
  });

  it('should handle ADD_TASK', () => {
    expect(
        reducer(Map({}), {
          songId: '1',
          title: 'Run the test',
          poeticReferencePicture: 'Poetisches Bezugsbild',
          songtext: 'Songtext',
          themeContentRelated: 'Inhaltsbezogenes Thema',
          themeDetailed: 'Detailliertes Thema',
          rhymingScheme: 'Reimschema',
          chords: 'Akkorde',
          type: ADD_SONG,
        })
    ).toEqual(Map({
      '1': song_1
      })
    );

    expect(
      reducer(
        Map({
          '1': song_1
        }),
        {
          songId: '2',
          title: 'Run the next test',
          poeticReferencePicture: 'Poetisches Bezugsbild',
          songtext: 'Songtext',
          themeContentRelated: 'Inhaltsbezogenes Thema',
          themeDetailed: 'Detailliertes Thema',
          rhymingScheme: 'Reimschema',
          chords: 'Akkorde',
          type: ADD_SONG,
        }
      )
    ).toEqual(
      Map({
        '1': song_1,
        '2': song_2
      }),
    )
  });

  it('should handle RECEIVE_SONGS', () => {
    expect(
        reducer(Map({}), {

          songs: [{
            poeticReferencePicture: null,
            songId: '1',
            songtext: "Songtext",
            themeContentRelated: "Inhaltsbezogenes Thema",
            themeDetailed: "Detailliertes Thema",
            themeId: '1',
            title: "Auf Wiedersehen",
            rhymingScheme: "",
            chords: "",
          }],
          type: RECEIVE_SONGS
        })
    ).toEqual(Map({
          '1': Song({
            songId: '1',
            themeId: '1',
            title: "Auf Wiedersehen",
            poeticReferencePicture: null,
            songtext: 'Songtext',
            themeContentRelated: 'Inhaltsbezogenes Thema',
            themeDetailed: 'Detailliertes Thema',
            rhymingScheme: "",
            chords: "",
          })
        })
    );
  });

  it('should handle RECEIVE_SONGS', () => {
    expect(
        reducer(Map({'1': song_1}), {
          songId: '1',
          type: DELETE_SONG
        })
    ).toEqual(Map({}))
  });
});