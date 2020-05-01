import React from 'react';
import {Button, List} from "semantic-ui-react";
import { IPersonel } from '../../../app/models/personel';
import {Link} from "react-router-dom";
interface IProps {
    user: IPersonel;
}

const ProfileInfo: React.FC<IProps> = ({user}) => {

    return (
        <List divided relaxed>
            <List.Item>
                <List.Icon name='marker' size='large' verticalAlign='middle' />
                <List.Content>
                    {`${user.streetAddress}, ${user.areaCode}`}
                </List.Content>
            </List.Item>
            <List.Item>
                <List.Icon name='phone' size='large' verticalAlign='middle' />
                <List.Content>
                   {user.phoneNumber}
                </List.Content>
            </List.Item>
            <List.Item>
                <List.Icon name='mail' size='large' verticalAlign='middle' />
                <List.Content>
                    {user.email}
                </List.Content>
            </List.Item>
            <List.Item>
                <List.Icon name='non binary transgender' size='large' verticalAlign='middle' />
                <List.Content>
                    {user.kjonn}
                </List.Content>
                <Button
                    floated='right'
                    content='Edit'
                    color='green'
                    as={Link}
                    to={`/manage/${user.id}`}
                />
            </List.Item>
        </List>
    )
}


export default ProfileInfo;