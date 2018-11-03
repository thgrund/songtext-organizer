import {LOAD_INITIAL_STATE, RECEIVE_THEMES} from '../constants/InitialStateLoader';
import reducer from './themes';
import { Map } from 'immutable';
import Theme from '../records/Theme';

describe('initialStatelLoader rootReducer', () => {

  const theme_1 = Theme({
    themeId: '1',
    songIds: ['1', '2'],
    themeGeneral: 'Liebe',
  });
  const theme_2 = Theme({
    themeId: '2',
    songIds: ['3'],
    themeGeneral: 'Angst',
  });


  it('should handle LOAD_INITIAL_STATE', () => {
    expect(
        reducer(Map({'1': theme_1}), {
          type: LOAD_INITIAL_STATE,
        })
    ).toEqual(Map({
          '1': theme_1
        })
    );
  });


});