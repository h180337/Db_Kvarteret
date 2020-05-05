import React, {useContext} from 'react';
import {Button, Header, Image, Item, Segment} from "semantic-ui-react";
import {Link, NavLink} from "react-router-dom";
import {RootStoreContext} from "../../../app/stores/rootStore";
import {observer} from 'mobx-react-lite';
import AddGroupMemberForm from "../form/AddGroupMemberForm";


interface IProps {
    id: string;
}

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

const GroupDetailedHeader: React.FC<IProps> = ({id}) => {
    const rootStore = useContext(RootStoreContext);
    const {
        group,
        submitting,
        target,
        deleteGroup

    } = rootStore.groupStore;
    const {openModal} = rootStore.modalStore
    const {LogiedInuser} = rootStore.userStore
    const UserRole = LogiedInuser!.roles[0].name && LogiedInuser!.roles[0].name;

    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/GroupImage.png`} fluid style={activityImageStyle}/>
                <Segment basic style={activityImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={group!.navn}
                                    style={{color: 'white'}}
                                />
                                <br/>
                                <Header
                                size='tiny'
                                content={group!.organisation!.name}
                                style={{color: 'white'}}
                                as={Link}
                                to={`organisation/${group!.organisation!.id}`}
                                />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {(UserRole === 'Superuser' || UserRole === 'Gruppeadministrator' || UserRole === 'OrgAdmin') &&
                <Button.Group widths={3}>
                    <Button
                        floated='left'
                        content='Add new members'
                        color='green'
                        onClick={() => openModal(<AddGroupMemberForm groupid={id}/>)}
                    />
                    
                    <Button
                        floated='right'
                        content='Edit'
                        color='orange'
                        as={NavLink}
                        to={`/managegroup/${group!.id}`}
                    />
                    <Button
                        floated='right'
                        content='Delete'
                        color='red'
                        as={Link}
                        loading={target === group!.id && submitting}
                        onClick={(event => {
                            deleteGroup(event, id)
                        })}
                        to={'/organisation'}
                    />
                </Button.Group>
                }


            </Segment>
        </Segment.Group>
    )
}

export default observer(GroupDetailedHeader);