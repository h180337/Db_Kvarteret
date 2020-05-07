import React, {useContext} from 'react';
import {Button, Header, Image, Item, Segment} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import {RootStoreContext} from "../../../app/stores/rootStore";
import AddGroups from "../form/AddGroups";
import { observer } from 'mobx-react-lite';

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


const OrganisationDetailedHeader: React.FC<IProps> = ({id}) => {
    const rootStore = useContext(RootStoreContext);
    const {
        organiasation,
        submitting,
        deleteOrganisation,
        target

    } = rootStore.organiastionStore;

    const {openModal} = rootStore.modalStore
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image  src={`/assets/organis.jpg`} fluid style={activityImageStyle}/>
                <Segment basic style={activityImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={organiasation!.name}
                                    style={{color: 'white'}}
                                />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button
                    floated='right'
                    content='Edit'
                    color='orange'
                    as={Link}
                    to={`/manageorganisation/${organiasation!.id}`}
                />
            </Segment>
        </Segment.Group>

    );
}

export default observer(OrganisationDetailedHeader);