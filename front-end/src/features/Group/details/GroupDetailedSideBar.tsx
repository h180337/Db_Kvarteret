import React, {Fragment, useContext} from 'react';
import {Button, Item, List, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import { observer } from 'mobx-react-lite';
import {RootStoreContext} from "../../../app/stores/rootStore";
import AddAdmin from '../form/AddAdmin'

interface IProps {
    users: any[];
    groupId : string
}

const GroupDetailedSideBar: React.FC<IProps> = ({users, groupId}) => {
    const rootStore = useContext(RootStoreContext);
    const {groupMembersRegistry} = rootStore.groupStore

    const {openModal} = rootStore.modalStore
    
    const admins:any []= [];
    if (!users) return <h2>Not able to load admin</h2>

    groupMembersRegistry.forEach(user => {
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
                                <Item.Content verticalAlign='middle'>
                                    <Item.Header as='h3'>
                                        <Link to={`/users/${admin.id}`}>{`${admin.fornavn} ${admin.etternavn}`}</Link>
                                    </Item.Header>
                                </Item.Content>
                            </Item>
                        ))}
                    </List>
                </Segment>
                <Segment clearing>
                    <Button.Group floated='right'>
                        <Button 
                            color='blue' 
                            content='Manage admins'
                            onClick={() =>openModal(<AddAdmin groupid={groupId}/>)}
                            
                        />
                    </Button.Group>
                </Segment>
            </Segment.Group>
        </Fragment>
    );
}

export default observer(GroupDetailedSideBar);