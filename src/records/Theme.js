import Immutable from 'immutable';

const Theme = Immutable.Record({
  themeId: '',
  songIds: [],
  themeGeneral: '',
  syncStatus: false
});

export default Theme;