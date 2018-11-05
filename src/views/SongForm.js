import React, {Component} from 'react';
import { Container, Form, Header, Segment, Button} from 'semantic-ui-react'
import PropTypes from 'prop-types';
import SongEditForm from "./SongEditForm";
import SongNewForm from "./SongNewForm";
import Song from '../records/Song';

export default class SongForm extends Component {
  constructor(props) {
    super(props);
    // let propsSong = this.props.songs.get(parseInt(this.props.songId, 10));

    let propsSong = this.props.songs.get(parseInt(this.props.songId, 10));

    this.state = {
      song: propsSong !== undefined ? propsSong : new Song(),
      themeId: propsSong !== undefined ? propsSong.themeId : '',
      dropDownThemes: [],
      newTheme: {
        newThemeTitle: '',
        hasNewThemeError: false,
        isNewThemeFormVisible: false,
      }
    };
  }

  setNewThemeFormVisibility(isVisible, e) {
    this.setState(prevState => ({
      newTheme: {
        ...prevState.newTheme,
        isNewThemeFormVisible: isVisible
      }
    }));
  }

  refreshThemeArray() {
    const propsThemes = this.props.themes;
    let dropDownThemeArr = [];

    propsThemes.keySeq().forEach(k =>
        dropDownThemeArr.push({key: k, value: k, text: propsThemes.get(k).themeGeneral})
    );

    return dropDownThemeArr;
  }

  inputSongChange(e) {
    this.setState({song:
          this.state.song.set(e.target.name, e.target.value)});
  }

  inputThemeChange(e, data) {
    this.setState({themeId: data.value});
  }
  inputNewThemeChange(e, data) {
    this.setState(prevState => ({
      newTheme: {
        ...prevState.newTheme,
        newThemeTitle: data.value
      }
    }));
  }

  addNewTheme() {
    let newThemeTitle = this.state.newTheme.newThemeTitle;
    let result = this.props.themes.find(
        function(obj){
          return obj.get('themeGeneral') === newThemeTitle;
        });

    if (result !== undefined || newThemeTitle=== '') {
      this.setState(prevState => ({
        newTheme: {
          ...prevState.newTheme,
          hasNewThemeError: true
        }
      }));

    } else {
      this.setState(prevState => ({
        newTheme: {
          ...prevState.newTheme,
          hasNewThemeError: false,
          isNewThemeFormVisible: false,
          newThemeTitle: ''
        }
      }));

      this.props.onInsertTheme(newThemeTitle);
    }
  }

  render() {
    const { onDeleteSong, onInsertSong, onUpdateSong } = this.props;


    return (

          <Container>
            <Header size='huge'>Song-Formular</Header>

            <Segment>
              <Form>
                <Form.Input value={this.state.song.title}
                            onChange={this.inputSongChange.bind(this) }
                            fluid name='title' label='Songname' placeholder='' width={16} />

                <Form.Group widths='equals'>
                  <Form.Dropdown label='Thema' value={this.state.themeId} onChange={this.inputThemeChange.bind(this) }
                                 selection fluid options={this.refreshThemeArray()} width={4}/>
                  <Button circular icon='plus' basic color='green' onClick={this.setNewThemeFormVisibility.bind(this, true)} />
                  <Form.Input name='themeDetailed' onChange={this.inputSongChange.bind(this) } value={this.state.song.themeDetailed} fluid label='Detailliertes Thema' placeholder='' width={12}/>
                </Form.Group>

                {this.state.newTheme.isNewThemeFormVisible &&
                  <Segment>
                    <Form.Input name='themeContentRelated' onChange={this.inputNewThemeChange.bind(this) }
                                value={this.state.newTheme.newThemeTitle} fluid label='Neues Thema' placeholder='' width={16} />
                    {this.state.newTheme.hasNewThemeError &&
                      <p color='red'>Das Thema existiert bereits oder ist leer. Es wurde kein Datensatz angelegt.</p>
                    }
                    <Button onClick={this.setNewThemeFormVisibility.bind(this, false)} color='red' >Abbrechen</Button>
                    <Button onClick={ this.addNewTheme.bind(this)} primary>Hinzufügen</Button>
                  </Segment>
                }

                <Form.TextArea name='themeContentRelated' onChange={this.inputSongChange.bind(this) } value={this.state.song.themeContentRelated} fluid label='Inhaltliches Thema' placeholder='' autoHeight rows={1} width={16}/>

                <Form.TextArea name='poeticReferencePicture' onChange={this.inputSongChange.bind(this) } value={this.state.song.poeticReferencePicture} label='Poetisches Bezugsbild' autoHeight rows={1} />

                <Form.Group widths='equal'>
                  <Form.TextArea name='rhymingScheme' onChange={this.inputSongChange.bind(this) } value={this.state.song.rhymingScheme} label='Reimschema' autoHeight rows={1} width={2}/>
                  <Form.TextArea name='songtext' onChange={this.inputSongChange.bind(this) } value={this.state.song.songtext} label='Songtext' autoHeight rows={1} width={10}/>
                  <Form.TextArea name='chords' onChange={this.inputSongChange.bind(this) } value={this.state.song.chords} label='Akkorde' autoHeight rows={1} width={4}/>

                </Form.Group>
                {onInsertSong !== undefined &&
                <SongNewForm song={this.state.song} themeId={this.state.themeId} onInsertSong={onInsertSong}/>
                }
                {onDeleteSong !== undefined &&
                  <SongEditForm song={this.state.song} themeId={this.state.themeId} onDeleteSong={onDeleteSong} onUpdateSong={onUpdateSong}/>
                }

              </Form>
            </Segment>

          </Container>
      )
  }
}

SongEditForm.propTypes = {
  songs: PropTypes.object.isRequired,
  themes: PropTypes.object.isRequired,
  onInsertSong: PropTypes.func.isRequired,
  onInsertTheme: PropTypes.func.isRequired
};

