import React, {Component} from 'react';
import { Container, Form, Header, Segment, Button, Grid} from 'semantic-ui-react'

export default class SongNewForm extends Component {
  render() {

    return (

        <Container>
          <Header size='huge'>Neuer Song</Header>
          <Segment>
            <Form>
              <Form.Input fluid label='Songname' placeholder='' width={16} />

              <Form.Group widths='equal'>
                <Form.Input fluid label='Thema' placeholder='' width={4} />
                <Form.Input fluid label='Detailliertes Thema' placeholder='' width={12}/>
              </Form.Group>
              <Form.Input fluid label='Inhaltliches Thema' placeholder='' width={16}/>

              <Form.TextArea label='Poetisches Bezugsbild' autoHeight rows={1} />

              <Form.Group widths='equal'>
                <Form.TextArea label='Reimschema' autoHeight rows={1} width={2}/>
                <Form.TextArea label='Songtext' autoHeight rows={1} width={10}/>
                <Form.TextArea label='Akkorde' autoHeight rows={1} width={4}/>

              </Form.Group>

              <Grid stackable columns={3}>
                <Grid.Column width={16}>
                    <Button type='submit' primary className={"floated"}>Speichern</Button>
                </Grid.Column>
              </Grid>

            </Form>
          </Segment>
        </Container>
    )
  }
}
