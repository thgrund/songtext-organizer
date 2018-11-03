import React, {Component} from 'react';
import { Container, List, Header, Segment } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

export default class SongList extends Component {
  render() {
    const { songs } = this.props;
    const rows = [];

    return (
     <Container>
       <Header size='huge'>Songliste</Header>

       <Segment>
         <List divided relaxed>
           {[...songs.values()].forEach((song) => {
             rows.push(

             <List.Item>
               <List.Content>
                 <Link className="listElement" to={'/song/edit/' + song.songId}>
                   {song.title}
                 </Link>

               </List.Content>
             </List.Item>
             )
           })}

           {rows}

         </List>
     </Segment>
     </Container>
    )
  }
}

SongList.propTypes = {
  songs: PropTypes.object.isRequired,
};

