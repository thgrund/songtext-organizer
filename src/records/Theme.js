import Immutable from 'immutable';

const Theme = Immutable.Record({
  themeId: '',
  songIds: [],
  themeGeneral: '',
});

export default Theme;