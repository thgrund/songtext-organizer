import React from 'react';
import { connect } from 'react-redux'
import Organizer from '../views/Organizer'

const OrganizerContainer = ({themes, songs}) => (

    <Organizer themes={themes} songs={songs} />
);

const mapStateToProps = state => ({
  themes: state.themes,
  songs: state.songs
});

const mapDispatchToProps = {
};

export default connect(
    mapStateToProps,
    {mapDispatchToProps}
)(OrganizerContainer)