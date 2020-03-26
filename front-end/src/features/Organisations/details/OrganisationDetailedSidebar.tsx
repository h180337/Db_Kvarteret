import React, { Fragment } from 'react';
import { Segment, List, Label, Item, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const OrganisationDetailedSidebar = () => {
    return (
        <Fragment>
            <Segment.Group>
                <Segment
                    textAlign='center'
                    style={{ border: 'none' }}
                    attached='top'
                    secondary
                    inverted
                    color='teal'
                >
                    Admins
                </Segment>
                <Segment attached clearing>
                    <List relaxed divided>
                        <Item style={{ position: 'relative' }}>

                            <Image size='tiny' src={'/assets/Profile.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header as='h3'>
                                    <Link to={`#`}>Bob</Link>
                                </Item.Header>
                            </Item.Content>
                            <Button floated='right' color='red' content='Remove' />
                        </Item>
                    </List>
                </Segment>
                <Segment clearing>
                    <Button.Group floated='right'>
                        <Button color='blue' content='Add admin' />
                    </Button.Group>
                </Segment>
            </Segment.Group>
        </Fragment>

    );
}

export default OrganisationDetailedSidebar;