import React from 'react';
import {Grid, Header, Item} from "semantic-ui-react";
import {IPersonel} from '../../../app/models/personel'
 
interface IProps {
    user: IPersonel;
}

const ProfileHeader: React.FC<IProps> = ({user}) => {
    return (
        <Grid>
            <Grid.Column width={12} style={{marginTop: '20px'}}>
                <Item.Group>
                    <Item>
                        <Item.Image avatar src='/assets/UserProfile.jpeg' size='small' alt='Prifile image'/>
                        <Item.Content verticalAlign='middle'>
                            <Header as='h1'> {`${user.fornavn} ${user.etternavn}`}</Header>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Grid.Column>
        </Grid>
    );
}

export default ProfileHeader;