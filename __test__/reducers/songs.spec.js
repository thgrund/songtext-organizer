import {ADD_SONG, RECEIVE_SONGS, DELETE_SONG, SET_SONG_SQLITE_SYNC_STATUS_TO_TRUE, SET_SONG_SQLITE_SYNC_STATUS_TO_FALSE} from '../../src/constants/SongFormActionTypes';
import reducer from '../../src/reducers/songs';
import { Map } from 'immutable';

import Song from '../../src/records/Song';

describe('songs rootReducer', () => {

  const song_1 = Song({
    songId: '1',
    themeId: '3',
    title: 'Run the test',
    poeticReferencePicture: 'Poetisches Bezugsbild',
    songtext: 'Songtext',
    themeContentRelated: 'Inhaltsbezogenes Thema',
    themeDetailed: 'Detailliertes Thema',
    rhymingScheme: 'Reimschema',
    chords: 'Akkorde',
    syncStatus: false
  });
  const song_2 = Song({
    songId: '2',
    themeId: '3',
    title: 'Run the next test',
    poeticReferencePicture: 'Poetisches Bezugsbild',
    songtext: 'Songtext',
    themeContentRelated: 'Inhaltsbezogenes Thema',
    themeDetailed: 'Detailliertes Thema',
    rhymingScheme: 'Reimschema',
    chords: 'Akkorde',
    syncStatus: false
  });

  it('should handle ADD_SONG', () => {
    expect(
        reducer(Map({}), {
          songId: '1',
          themeId: '3',
          title: 'Run the test',
          poeticReferencePicture: 'Poetisches Bezugsbild',
          songtext: 'Songtext',
          themeContentRelated: 'Inhaltsbezogenes Thema',
          themeDetailed: 'Detailliertes Thema',
          rhymingScheme: 'Reimschema',
          chords: 'Akkorde',
          syncStatus: false,
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
          themeId: '3',
          title: 'Run the next test',
          poeticReferencePicture: 'Poetisches Bezugsbild',
          songtext: 'Songtext',
          themeContentRelated: 'Inhaltsbezogenes Thema',
          themeDetailed: 'Detailliertes Thema',
          rhymingScheme: 'Reimschema',
          chords: 'Akkorde',
          syncStatus: false,
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

  it ('should handle SET_SONG_SQLITE_SYNC_STATUS_TO_TRUE', () => {
   expect(
        reducer(Map({'1': Song({songId: '1', syncStatus: false})}), {
          songId: '1',
          type: SET_SONG_SQLITE_SYNC_STATUS_TO_TRUE
        })
    ).toEqual(Map(
        {'1': Song({songId: '1', syncStatus: true})}
    ))
  });

  it ('should handle SET_SONG_SQLITE_SYNC_STATUS_TO_FALSE', () => {
    expect(
        reducer(Map({'2': Song({songId: '2', syncStatus: true})}), {
          songId: '2',
          type: SET_SONG_SQLITE_SYNC_STATUS_TO_FALSE
        })
    ).toEqual(Map(
        {
          '2': Song({songId: '2', syncStatus: false})
        }
    ))
  });

});