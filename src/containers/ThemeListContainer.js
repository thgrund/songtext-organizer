import React from 'react';
import { connect } from 'react-redux'
import ThemeList from '../views/ThemeList'

const ThemeListContainer = ({songs, themes}) => (
    <ThemeList
        songs={songs}
        themes={themes}
    />
);

const mapStateToProps = state => ({
  songs: state.songs,
  themes: state.themes,
});

export default connect(
    mapStateToProps,
    {}
)(ThemeListContainer)