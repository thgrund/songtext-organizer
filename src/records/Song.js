import Immutable from 'immutable';

const Song = Immutable.Record({
  songId: '',
  themeId: '',
  title: '',
  poeticReferencePicture: '',
  songtext: '',
  themeContentRelated: '',
  themeDetailed: '',
  rhymingScheme: '',
  chords: '',
  syncStatus: false
});

export default Song;