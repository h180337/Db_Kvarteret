import React, {Fragment, useContext} from 'react';
import {Grid, Header, Item, Button} from "semantic-ui-react";
import {IPersonel} from '../../../app/models/personel'
import { observer } from 'mobx-react-lite';
import {RootStoreContext} from "../../../app/stores/rootStore";
import ProfilePhotos from './ProfilePhotos';
 
interface IProps {
    user: IPersonel;
}

const ProfileHeader: React.FC<IProps> = ({user}) => {
    const rootStore = useContext(RootStoreContext);
    const {openModal, closeModal} = rootStore.modalStore;
    let image:string = user.profilePhoto === null ? '/assets/UserProfile.jpeg': user.profilePhoto.url;
    return (
        <Fragment>
        <Grid>
            <Grid.Column mobile={16} computer={12} tablet={8} style={{marginTop: '20px'}}>
                <Item.Group>
                    <Item>
                        <Item.Image avatar src={image} size='tiny' alt='Profile image'/>
                        <Item.Content verticalAlign='middle'>
                            <Header as='h1'> {`${user.fornavn} ${user.etternavn}`}</Header>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Grid.Column>
        </Grid>
    <Button
        basic
        floated='right'
        content='Photo'
        onClick={() => openModal(<ProfilePhotos profile={user} closeModal={closeModal}/>)}

    />
        </Fragment>
    );
}

export default observer(ProfileHeader);