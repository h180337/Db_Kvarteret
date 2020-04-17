import React from 'react';
import { Tab, List } from 'semantic-ui-react';
import {IPersonel} from "../../../app/models/personel";
import ProfileCourses from "./ProfileCourses";
import ProfileGroups from "./ProfileGroups";
import ProfileTags from "./ProfileTags";

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
        {menuItem: 'Courses', render: () => <Tab.Pane><ProfileCourses courses={user.courses}/></Tab.Pane>},
        {menuItem: 'Tags', render: () => <Tab.Pane><ProfileTags/></Tab.Pane>},
        {menuItem: 'My Groups', render: () => <Tab.Pane><ProfileGroups groups={user.groups}/></Tab.Pane>}


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