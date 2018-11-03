import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Container, Menu } from 'semantic-ui-react'
import SongListContainer from '../containers/SongListContainer';
import SongNewForm from './SongNewForm';
import SongEditFormContainer from '../containers/SongEditFormContainer';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ThemeListContainer from '../containers/ThemeListContainer';

export default class Organizer extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: 'Songliste',
    };
  }

  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;

    return (
        <Router>
          <Container>
              <Menu pointing>
                <Menu.Item as={ Link } to="/song" name='Songliste' active={activeItem === 'Songliste'}
                           onClick={this.handleItemClick} >
                  Songliste
                </Menu.Item>
                <Menu.Item as={Link} to="/theme" name='Themenliste' active={activeItem === 'Themenliste'}
                           onClick={this.handleItemClick} >
                  Themenliste
                </Menu.Item>

                <Menu.Item as={Link} to="/song/new" name='Neuer Song' active={activeItem === 'Neuer Song'}
                           onClick={this.handleItemClick} >
                  Neuer Song
                </Menu.Item>
              </Menu>
              <Route exact path="/" component={SongListContainer} />
              <Route exact path="/song" component={SongListContainer} />
              <Route exact path="/theme" component={ThemeListContainer} />
              <Route exact path="/song/new" component={SongNewForm} />
              <Route path="/song/edit/:id" component={SongEditFormContainer} />

          </Container>
      </Router>

    )
  }
}

Organizer.propTypes = {
  themes: PropTypes.object.isRequired,
  songs: PropTypes.object.isRequired,
};

