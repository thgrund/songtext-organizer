import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from 'semantic-ui-react'
import {Link } from "react-router-dom";

export default class ThemeListEntry extends Component {

  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  };

  render() {
    const { songs, themeId } = this.props;
    const rows = [];

    return (
        <span>
        {[...songs.values()].forEach((song) => {
          if (song.themeId === themeId) {
            rows.push(
                <Grid stackable columns={3}>

                  <Grid.Row>
                  <Grid.Column width={3}>

                  <b> Songname </b>
                    <p>
                      {song.title}
                    </p>
                    </Grid.Column>
                    <Grid.Column width={3}>

                      <b> Detailliertes Thema </b>
                      <p>
                        {song.themeDetailed}
                      </p>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <b> Inhaltliches Thema </b>
                    <p>
                      {song.themeContentRelated}
                    </p>
                    </Grid.Column>
                    <Grid.Column width={16}>
                      <Link to={'/song/edit/' + song.songId}>
                      <Button color='blue' className="floated">
                          Bearbeiten
                      </Button>
                      </Link>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
            )
          }
      })}
          {rows}
        </span>
    )
  }
}

ThemeListEntry.propTypes = {
  songs: PropTypes.object.isRequired,
  themeId: PropTypes.number.isRequired
};

