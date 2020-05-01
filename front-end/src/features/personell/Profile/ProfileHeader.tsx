import React, {Fragment, useContext} from 'react';
import {Grid, Header, Item, Button, Icon, Label} from "semantic-ui-react";
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
    return (
        <Fragment>
        <Grid>
            <Grid.Column mobile={16} computer={12} tablet={8} style={{marginTop: '20px'}}>
                <Item.Group>
                    <Item>
                        {!user.profilePhoto ? <Icon name='user' size='huge'/> :
                            <Item.Image avatar src={user.profilePhoto.url} size='tiny' alt='Profile image'/>
                        }
                        <Item.Content verticalAlign='middle'>
                            <Header as='h1'> {`${user.fornavn} ${user.etternavn}`}
                                <Label  color={user.workstatus ==='active' ? 'green' : 'red'}>{user.workstatus}</Label>
                            </Header>
                            <p>{user.userName}</p>
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