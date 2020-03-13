import React from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import {IPersonel} from '../../../app/models/personel'


interface IProps {
    selectedUser: IPersonel
    setEditMode: (editMode: boolean) => void;
    setSelectedUser:(person: IPersonel | null) => void

}

const Profile: React.FC<IProps> = ({selectedUser,setEditMode, setSelectedUser}) => {
    return (
        <Card fluid>
            <Image src='assets/Profile.png' wrapped ui={false} />
            <Card.Content>
                <Card.Header>{`${selectedUser.fornavn} ${selectedUser.etternavn}`}</Card.Header>
                <Card.Meta>
                    <span className='date'>{selectedUser.opprettet}</span>
                </Card.Meta>
                <Card.Description>
                    something something
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={3}>
                    <Button basic color='blue' content='Profile'/>
                    <Button onClick={() => setEditMode(true)} basic color='grey' content='Edit'/>
                    <Button basic color='red'  content='Cancel' onClick={() => setSelectedUser(null)}/>
                </Button.Group>
            </Card.Content>
        </Card>
    );
}

export default Profile;