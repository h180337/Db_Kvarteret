import React, {Fragment} from 'react';
import {Button, Image, Item, List, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import { observer } from 'mobx-react-lite';

interface IProps {
    users: any[];
}

const GroupDetailedSideBar: React.FC<IProps> = ({users}) => {
    
    const admins:any []= [];
    
    if (!users) return <h2>Not able to load admin</h2>

    users.forEach(user => {
        if (user.isAdmin){
            admins.push(user)
        }
    })
    
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
                        {admins.map(admin => (
                            <Item key={admin.id} style={{ position: 'relative' }}>
                                <Image size='tiny' src={'/assets/Profile.png'} />
                                <Item.Content verticalAlign='middle'>
                                    <Item.Header as='h3'>
                                        <Link to={`/users/${admin.id}`}>{`${admin.fornavn} ${admin.etternavn}`}</Link>
                                    </Item.Header>
                                </Item.Content>
                                <Button floated='right' color='red' content='Remove' />
                            </Item>
                        ))}
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

export default observer(GroupDetailedSideBar);