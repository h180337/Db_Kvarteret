// @ts-ignore
import React, {Component, useContext, useState} from 'react';
import {Tab, Header, Card, Image, Button, Grid} from 'semantic-ui-react'
import {IPersonel} from '../../../app/models/personel';
import {RootStoreContext} from "../../../app/stores/rootStore";
import { observer } from 'mobx-react-lite';
import PhotoUpload from '../../../app/common/photoUpload/PhotoUpload'

interface IProp {
    profile: IPersonel
}

const ProfilePhotos: React.FC<IProp> = ({profile}) => {

    const rootStore = useContext(RootStoreContext);
    const {LogiedInuser, user} = rootStore.userStore;
    const [addPhotoMode, setAddPhotoMode] = useState(false)

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} style={{paddingBottom: '0px'}}>
                    <Header floated='left' icon='images' content='Profile Photo'/>
                    {LogiedInuser!.id === user!.id &&
                    <Button 
                        floated='right' 
                        basic 
                        content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                        onClick={() => setAddPhotoMode(!addPhotoMode)}
                    />
                    }
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <PhotoUpload/>
                    ) : (
                        <Card.Group>
                            {profile.photo ? profile.photo.map((photo: any) => (
                                    <Card>
                                        <Image size='medium' src={profile.photo}/>
                                    </Card>
                                ))
                                : <Card>
                                    <Image size='medium' src='/assets/UserProfile.jpeg'/>
                                    {LogiedInuser!.id === user!.id && 
                                    <Button.Group fluid widths={2}>
                                        <Button basic positive content='Main'/>
                                        <Button basic negative icon='trash'/>
                                    </Button.Group>}
                                </Card>}
                        </Card.Group>
                    )}
                   
                </Grid.Column>
            </Grid>


        </Tab.Pane>
    );
}

export default observer(ProfilePhotos);