import React, {Component} from 'react';
import { Button, Grid} from 'semantic-ui-react'
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

export default class SongEditForm extends Component {
  render() {
    const { themeId, song, onDeleteSong, onUpdateSong } = this.props;
      return (
        <Grid stackable columns={3}>
          <Grid.Column width={16}>
            <Link to={'/song/'}>
              <Button onClick={ () => onDeleteSong(song.songId, themeId)}
                  color='red'>Löschen</Button>
              <Button onClick={ () => onUpdateSong(
                  song.songId,
                  themeId,
                  song.title,
                  song.poeticReferencePicture,
                  song.songtext,
                  song.themeContentRelated,
                  song.themeDetailed,
                  song.rhymingScheme,
                  song.chords)} type='submit' primary className={"floated"}>Speichern</Button>
            </Link>
          </Grid.Column>
        </Grid>
    )
  }
}

SongEditForm.propTypes = {
  song: PropTypes.object.isRequired,
  themeId: PropTypes.string.isRequired,
  onDeleteSong: PropTypes.func.isRequired,
  onUpdateSong: PropTypes.func.isRequired
};

