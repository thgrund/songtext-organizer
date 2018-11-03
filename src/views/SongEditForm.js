import React, {Component} from 'react';
import { Container, Form, Header, Segment, Button, Grid} from 'semantic-ui-react'
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

export default class SongEditForm extends Component {
  render() {
    const { songs, songId, themes, onDeleteSong } = this.props;
    const song = songs.get(parseInt(songId, 10 ));

    if (songs.size > 0) {
      console.log(songs);

      return (

          <Container>
            <Header size='huge'>Song bearbeiten</Header>
            <Segment>
              <Form>
                <Form.Input value={song.title} fluid label='Songname' placeholder='' width={16} />

                <Form.Group widths='equal'>
                  <Form.Input value={themes.get(song.themeId).themeGeneral} fluid label='Thema' placeholder='' width={4} />
                  <Form.Input value={song.themeDetailed} fluid label='Detailliertes Thema' placeholder='' width={12}/>
                </Form.Group>
                <Form.Input value={song.themeContentRelated} fluid label='Inhaltliches Thema' placeholder='' width={16}/>

                <Form.TextArea value={song.poeticReferencePicture} label='Poetisches Bezugsbild' autoHeight rows={1} />

                <Form.Group widths='equal'>
                  <Form.TextArea value={song.rhymingScheme} label='Reimschema' autoHeight rows={1} width={2}/>
                  <Form.TextArea value={song.songtext} label='Songtext' autoHeight rows={1} width={10}/>
                  <Form.TextArea value={song.chords} label='Akkorde' autoHeight rows={1} width={4}/>

                </Form.Group>
                <Grid stackable columns={3}>
                  <Grid.Column width={16}>
                    <Link to={'/song/'}>
                      <Button onClick={ () => onDeleteSong(song.songId, song.themeId)}
                          color='red'>Löschen</Button>
                      <Button type='submit' primary className={"floated"}>Speichern</Button>
                    </Link>
                  </Grid.Column>
                </Grid>
              </Form>
            </Segment>

          </Container>
      )
    } else {
      return <Container />
    }
  }
}

SongEditForm.propTypes = {
  songs: PropTypes.object.isRequired,
  themes: PropTypes.object.isRequired,
  onDeleteSong: PropTypes.func.isRequired,

};

