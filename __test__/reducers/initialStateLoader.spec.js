import {LOAD_INITIAL_SONG_STATE, LOAD_INITIAL_THEME_STATE} from '../../src/constants/InitialStateLoader';
import reducer from '../../src/reducers/themes';
import { Map } from 'immutable';
import Theme from '../../src/records/Theme';

describe('initialStatelLoader rootReducer', () => {

  const theme_1 = Theme({
    themeId: '1',
    songIds: ['1', '2'],
    themeGeneral: 'Liebe',
  });


  it('should handle LOAD_INITIAL_SONG_STATE', () => {
    expect(
        reducer(Map({'1': theme_1}), {
          type: LOAD_INITIAL_SONG_STATE,
        })
    ).toEqual(Map({
          '1': theme_1
        })
    );
  });

  it('should handle LOAD_INITIAL_THEME_STATE', () => {
    expect(
        reducer(Map({'1': theme_1}), {
          type: LOAD_INITIAL_THEME_STATE,
        })
    ).toEqual(Map({
          '1': theme_1
        })
    );
  });

});