import React, {Component} from 'react';
import { Button, Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

export default class SongNewForm extends Component {
  render() {
    const { song, onInsertSong, themeId } = this.props;

      return (
          <Grid stackable columns={3}>
            <Grid.Column width={16}>
              <Link to={'/song/'}>
                <Button
                    onClick={ () => onInsertSong(
                        themeId,
                        song.title,
                        song.poeticReferencePicture,
                        song.songtext,
                        song.themeContentRelated,
                        song.themeDetailed,
                        song.rhymingScheme,
                        song.chords
                    ) }
                    primary className={"floated"}>Speichern</Button>
              </Link>
            </Grid.Column>
          </Grid>

      )
    }
}

SongNewForm.propTypes = {
  song: PropTypes.object.isRequired,
  themeId: PropTypes.number.isRequired,
  onInsertSong: PropTypes.func.isRequired,
};

