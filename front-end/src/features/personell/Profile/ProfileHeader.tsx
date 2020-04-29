import React from 'react';
import {Grid, Header, Item} from "semantic-ui-react";
import {IPersonel} from '../../../app/models/personel'
import { observer } from 'mobx-react-lite';
 
interface IProps {
    user: IPersonel;
}

const ProfileHeader: React.FC<IProps> = ({user}) => {
    
    console.log(user.profilePhoto)
    let image:string = user.profilePhoto === null ? '/assets/UserProfile.jpeg': user.profilePhoto.url;
    return (
        <Grid>
            <Grid.Column mobile={16} computer={12} tablet={8} style={{marginTop: '20px'}}>
                <Item.Group>
                    <Item>
                        <Item.Image avatar src={image} size='small' alt='Profile image'/>
                        <Item.Content verticalAlign='middle'>
                            <Header as='h1'> {`${user.fornavn} ${user.etternavn}`}</Header>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Grid.Column>
        </Grid>
    );
}

export default observer(ProfileHeader);