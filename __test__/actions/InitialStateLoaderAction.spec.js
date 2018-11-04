import {loadInitialThemeState, loadInitialSongState} from "../../src/actions/InitialStateLoaderAction";
import {LOAD_INITIAL_THEME_STATE, LOAD_INITIAL_SONG_STATE} from "../../src/constants/InitialStateLoader";


  describe('load initial theme state action', () => {

    it('loadInitialState should create LOAD_INITIAL_THEME_STATE action', () => {
      expect(loadInitialThemeState()).toEqual({
        type: LOAD_INITIAL_THEME_STATE
      })
    });
  });

describe('load initial song state action', () => {

  it('loadInitialState should create LOAD_INITIAL_SONG_STATE action', () => {
    expect(loadInitialSongState()).toEqual({
      type: LOAD_INITIAL_SONG_STATE
    })
  });
});