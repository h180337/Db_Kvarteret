import React, {useContext} from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import usersStore from "../../../app/stores/userStore";
import {observer} from "mobx-react-lite";

const Profile: React.FC = () => {
    const userStore = useContext(usersStore);
    const {selectedUser: user, openEditFrom, cancelSelectedUser} = userStore;
    return (
        <Card fluid>
            <Image src='assets/Profile.png' wrapped ui={false} />
            <Card.Content>
                <Card.Header>{`${user!.fornavn} ${user!.etternavn}`}</Card.Header>
                <Card.Meta>
                    <span className='date'>Joined: {user!.opprettet}</span>
                </Card.Meta>
                <Card.Description>
                    something something
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={3}>
                    <Button basic color='blue' content='Profile'/>
                    <Button onClick={() => openEditFrom(user!.id)} basic color='grey' content='Edit'/>
                    <Button basic color='red'  content='Cancel' onClick={cancelSelectedUser}/>
                </Button.Group>
            </Card.Content>
        </Card>
    );
}

export default observer(Profile);