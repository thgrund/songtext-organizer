import React from 'react';
import { connect } from 'react-redux'
import SongEditForm from "../views/SongEditForm";
import {deleteSong} from "../actions/SongActions";

const SongEditFormContainer = ({songs, songId, themes, deleteSong}) => (
    <SongEditForm
        songs={songs}
        songId={songId}
        themes={themes}
        onDeleteSong={deleteSong}
    />
);

const mapStateToProps = (state, props) => ({
  songs: state.songs,
  themes: state.themes,
  songId: props.match.params.id
});

const mapDispatchToProps = {
  deleteSong
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SongEditFormContainer)