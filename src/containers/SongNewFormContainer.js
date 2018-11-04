import React from 'react';
import { connect } from 'react-redux'
import SongForm from "../views/SongForm";
import {insertSong} from "../actions/SongActions";
import {insertTheme} from "../actions/ThemeActions";


const SongNewFormContainer = ({songs, songId, themes, insertSong, insertTheme}) => (
    <SongForm
        songs={songs}
        songId={songId}
        themes={themes}
        onInsertSong={insertSong}
        onInsertTheme={insertTheme}
    />
);

const mapStateToProps = (state, props) => ({
  songs: state.songs,
  themes: state.themes,
  songId: props.match.params.id
});

const mapDispatchToProps = {
  insertSong,
  insertTheme
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SongNewFormContainer)