import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Container, Accordion, Icon, Label, Header, Divider} from 'semantic-ui-react';
import ThemeListEntry from './ThemeListEntry';

export default class ThemeList extends Component {

  state = { }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  };

  render() {
    const { activeIndex } = this.state;
    const { songs, themes } = this.props;
    const rows = [];


    return (

        <Container>

          <Header size='huge'>Themenliste</Header>

          <Accordion fluid styled>
            {[...themes.values()].forEach((theme, index) => {
              rows.push(
                  <span>
                  <Accordion.Title active={activeIndex === index} index={index} onClick={this.handleClick}>
                    <Icon name='dropdown' />
                    {theme.themeGeneral}
                    <Label className="floated" circular color='blue' key='blue'>{theme.songIds.length}</Label>
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === index}>
                    <Divider />
                    <ThemeListEntry songs={songs} themeId={theme.themeId}/>
                  </Accordion.Content>
                  </span>
              );
            })}
            {rows}

        </Accordion>
      </Container>
    )
  }
}

ThemeList.propTypes = {
  songs: PropTypes.object.isRequired,
  themes: PropTypes.object.isRequired
};

