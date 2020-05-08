import React, {useContext} from 'react';
import {Button, Header, Image, Item, Segment, Icon} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import {RootStoreContext} from "../../../app/stores/rootStore";
import AddGroups from "../form/AddGroups";
import { observer } from 'mobx-react-lite';
import ProfilePhotos from "../../personell/Profile/ProfilePhotos";
import PhotoUpload from '../../../app/common/photoUpload/PhotoUpload';

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
        target,
        organiasationsAdminRegistry,
        uploadPhoto,
        uploadingPhoto

    } = rootStore.organiastionStore;
    const {LogiedInuser} = rootStore.userStore
    const {openModal} = rootStore.modalStore
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image  src={organiasation!.organisationPhoto! ? 
                    organiasation!.organisationPhoto!.url: '/assets/OrgDefultimg.png'} fluid style={activityImageStyle}/>
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
                {organiasationsAdminRegistry.has(LogiedInuser!.id) && <Button
                    floated='right'
                    content='Edit'
                    color='orange'
                    as={Link}
                    to={`/manageorganisation/${organiasation!.id}`}
                />}

                <Button
                    basic
                    floated='right'
                    content='Photo'
                    onClick={() => openModal(<PhotoUpload loading={uploadingPhoto} uploadPhoto={uploadPhoto} id={organiasation!.id}/>)}
                />
            </Segment>
        </Segment.Group>

    );
}

export default observer(OrganisationDetailedHeader);