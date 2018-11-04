import {ADD_SONG_TO_THEME, ADD_THEME, RECEIVE_THEMES, DELETE_SONG_FROM_THEMES,
  SET_THEME_SQLITE_SYNC_STATUS_TO_TRUE,
  SET_THEME_SQLITE_SYNC_STATUS_TO_FALSE} from '../../src/constants/ThemeActionTypes';
import reducer from '../../src/reducers/themes';
import { Map } from 'immutable';
import Theme from '../../src/records/Theme';
import Song from '../../src/records/Song';
import {
  RECEIVE_SONGS
} from "../../src/constants/SongFormActionTypes";

describe('songs rootReducer', () => {

  const theme_1 = Theme({
    themeId: '1',
    songIds: [],
    themeGeneral: 'Liebe',
  });
  const theme_2 = Theme({
    themeId: '2',
    songIds: [],
    themeGeneral: 'Angst',
  });

  it('should handle ADD_THEME', () => {
    expect(
        reducer(Map({}), {
          themeId: '1',
          songIds:  [],
          themeGeneral: 'Liebe',
          type: ADD_THEME,
        })
    ).toEqual(Map({
          '1': theme_1
        })
    );

    expect(
        reducer(
            Map({
              '1': theme_1
            }),
            {
              themeId: '2',
              songIds: [],
              themeGeneral: 'Angst',
              type: ADD_THEME,
            }
        )
    ).toEqual(
        Map({
          '1': theme_1,
          '2': theme_2
        }),
    )
  });

  it('should handle ADD_SONG_TO_THEME', () => {
    expect(
        reducer(Map({
          '1': Theme({
            themeId: '1',
            songIds: ['1'],
            themeGeneral: 'Fernweh'
          })
        }), {
          themeId: '1',
          songId: '2',
          type: ADD_SONG_TO_THEME,
        })
    ).toEqual(Map({
          '1': Theme({
            themeId: '1',
            songIds: ['1', '2'],
            themeGeneral: 'Fernweh'
          })
        })
    );
  });



  it('should handle RECEIVE_THEMES', () => {
    expect(
        reducer(Map({}), {
          themes: [
            { id: '1', themeGeneral: 'Fernweh' },
            { id: '2', themeGeneral: 'Liebe'}
          ],
          type: RECEIVE_THEMES,
        })
    ).toEqual(Map({
          '1': Theme({
            themeId: '1',
            songIds: [],
            themeGeneral: 'Fernweh'
          }),
          '2': Theme({
            themeId: '2',
            songIds: [],
            themeGeneral: 'Liebe'
          })
        })
    );
  });

  it('should handle RECEIVE_SONGS', () => {
    expect(
        reducer(Map({'1': theme_1}),
            {
          songs: Map({
            '1': Song({songId: '1', themeId: '1'}),
            '2': Song({songId: '2', themeId: '1'})
          }),
          type: RECEIVE_SONGS,
        })
    ).toEqual(Map({
          '1': Theme({
            themeId: '1',
            songIds: ['1', '2'],
            themeGeneral: 'Liebe',
          })
        })
    );
  });

  it('should handle DELETE_SONG_FROM_THEMES', () => {
    expect(
        reducer(Map({
          '1': Theme({
            themeId: '1',
            songIds: ['1', '2'],
            themeGeneral: 'Liebe',
          })
        }), {
          songId: '2',
          themeId: '1',
          type: DELETE_SONG_FROM_THEMES
        })
    ).toEqual(
        Map({
          '1': Theme({
            themeId: '1',
            songIds: ['1'],
            themeGeneral: 'Liebe',
          })
        })
    )
  });

  it ('should handle SET_THEME_SQLITE_SYNC_STATUS_TO_TRUE', () => {
    expect(
        reducer(Map({'1': Theme({themeId: '1', syncStatus: false})}), {
          themeId: '1',
          type: SET_THEME_SQLITE_SYNC_STATUS_TO_TRUE
        })
    ).toEqual(Map(
        {'1': Theme({themeId: '1', syncStatus: true})}
    ))
  });

  it ('should handle SET_THEME_SQLITE_SYNC_STATUS_TO_FALSE', () => {
    expect(
        reducer(Map({'2': Theme({themeId: '2', syncStatus: true})}), {
          themeId: '2',
          type: SET_THEME_SQLITE_SYNC_STATUS_TO_FALSE
        })
    ).toEqual(Map(
        {
          '2': Theme({themeId: '2', syncStatus: false})
        }
    ))
  });

});