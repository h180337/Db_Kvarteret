import React, {Component, useContext, useState, Fragment} from 'react';
import {Tab, Header, Card, Image, Button, Grid} from 'semantic-ui-react'
import {IPersonel} from '../../../app/models/personel';
import {RootStoreContext} from "../../../app/stores/rootStore";
import { observer } from 'mobx-react-lite';
import PhotoUpload from '../../../app/common/photoUpload/PhotoUpload'

interface IProp {
    profile: IPersonel
    closeModal?: any
}

const ProfilePhotos: React.FC<IProp> = ({profile, closeModal}) => {

    const rootStore = useContext(RootStoreContext);
    const {LogiedInuser, uploadingPhoto, uploadPhoto} = rootStore.userStore;
    
 
    return (
        <Fragment>
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} style={{paddingBottom: '0px'}}>
                    <Header floated='left' icon='images' content='Profile Photo'/>
                </Grid.Column>
                <Grid.Column width={16}>
                    {LogiedInuser!.id === profile!.id ? (
                        <PhotoUpload loading={uploadingPhoto} uploadPhoto={uploadPhoto}/>
                    ) : (
                        <Card.Group>
                            {profile.profilePhoto ?  (
                                    <Card>
                                        <Image size='medium' src={profile!.profilePhoto.url}/>
                                    </Card>
                                )
                                : <Card>
                                    <Image size='medium' src='/assets/UserProfile.jpeg'/>
                                </Card>}
                        </Card.Group>
                    )}
                   
                </Grid.Column>
            </Grid>
        </Tab.Pane>
            <Button
                basic
                color='red'
                floated='right'
                content='Close'
                onClick={() => closeModal()}
                style={{marginBottom: '6px'}}
            />
        </Fragment>
    );
}

export default observer(ProfilePhotos);