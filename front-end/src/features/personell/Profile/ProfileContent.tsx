import React from 'react';
import { Tab, List } from 'semantic-ui-react';
import {IPersonel} from "../../../app/models/personel";

interface IProps {
    user: IPersonel;
}

const ProfileContent: React.FC<IProps> = ({user}) => {
    
    const about = (
        <div>
            <List>
                <List.Item>
                    <List.Icon name='marker' />
                    <List.Content>{`${user.streetAddress}, ${user.areaCode}`}</List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='mail' />
                    <List.Content>
                        {user.email}
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='phone' />
                    <List.Content>
                        {user.phoneNumber}
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='non binary transgender' />
                    <List.Content>
                        {user.kjonn}
                    </List.Content>
                </List.Item>
            </List>
        </div>
    )
    
 
    const panes = [
        {menuItem: 'Info', render: () => <Tab.Pane>{about}</Tab.Pane>},
        {menuItem: 'History', render: () => <Tab.Pane>History</Tab.Pane>},
        {menuItem: 'Courses', render: () => <Tab.Pane>Courses</Tab.Pane>},
        {menuItem: 'Skills', render: () => <Tab.Pane>Skills</Tab.Pane>},

    ]
    
    return (
        <Tab
            menu={{fluid: true, vertical: true}}
            menuPosition='right'
            panes={panes}
        />
            
    );
}

export default ProfileContent;