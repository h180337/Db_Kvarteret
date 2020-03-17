import React from 'react';
import {Grid, Header, Item} from "semantic-ui-react";

const ProfileHeader = () => {
    return (
        <Grid>
            <Grid.Column width={12} style={{marginTop: '20px'}}>
                <Item.Group>
                    <Item>
                        <Item.Image avatar src='/assets/UserProfile.jpeg' size='small' alt='Prifile image'/>
                        <Item.Content verticalAlign='middle'>
                            <Header as='h1'> User Name</Header>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Grid.Column>
        </Grid>
    );
}

export default ProfileHeader;