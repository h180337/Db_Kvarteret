import React from 'react';
import { Tab, List } from 'semantic-ui-react';
import {IPersonel} from "../../../app/models/personel";
import ProfileCourses from "./ProfileCourses";
import ProfileGroups from "./ProfileGroups";
import ProfileTags from "./ProfileTags";
import { observer } from 'mobx-react-lite';
import ProfileHistory from './ProfileHistory';
import ProfilePhotos from "./ProfilePhotos";

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
        {menuItem: 'Photo', render: () => <Tab.Pane><ProfilePhotos profile={user}/></Tab.Pane>},
        {menuItem: 'History', render: () => <Tab.Pane><ProfileHistory user={user}/></Tab.Pane>},
        {menuItem: 'Courses', render: () => <Tab.Pane><ProfileCourses courses={user.courses}/></Tab.Pane>},
        {menuItem: 'Tags', render: () => <Tab.Pane><ProfileTags tags={user.tags} userId={user.id}/></Tab.Pane>},
        {menuItem: 'My Groups', render: () => <Tab.Pane><ProfileGroups groups={user.groups}/></Tab.Pane>}


    ]
    
    return (
        <Tab
            menu={{pointing: true}}
            menuPosition='right'
            panes={panes}
        />
            
    );
}

export default observer(ProfileContent);