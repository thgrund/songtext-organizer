import React from 'react';
import { connect } from 'react-redux'
import SongList from '../views/SongList'

const SongListContainer = ({songs}) => (
    <SongList
        songs={songs}
    />
);

const mapStateToProps = state => ({
  songs: state.songs
});

export default connect(
    mapStateToProps,
    {}
)(SongListContainer)