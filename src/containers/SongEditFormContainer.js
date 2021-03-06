import React from 'react';
import { connect } from 'react-redux'
import SongForm from "../views/SongForm";
import {deleteSong, updateSong} from "../actions/SongActions";
import {insertTheme} from "../actions/ThemeActions";

const SongEditFormContainer = ({songs, songId, themes, deleteSong, insertTheme, updateSong}) => (
    <SongForm
        songs={songs}
        songId={songId}
        themes={themes}
        onDeleteSong={deleteSong}
        onUpdateSong={updateSong}
        onInsertTheme={insertTheme}
    />
);

const mapStateToProps = (state, props) => ({
  songs: state.songs,
  themes: state.themes,
  songId: props.match.params.id
});

const mapDispatchToProps = {
  deleteSong,
  insertTheme,
  updateSong
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SongEditFormContainer)