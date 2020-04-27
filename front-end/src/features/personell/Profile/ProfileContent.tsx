import React from 'react';
import { Tab, List , Grid} from 'semantic-ui-react';
import {IPersonel} from "../../../app/models/personel";
import ProfileCourses from "./ProfileCourses";
import ProfileGroups from "./ProfileGroups";
import ProfileTags from "./ProfileTags";
import { observer } from 'mobx-react-lite';
import ProfileHistory from './ProfileHistory';
import ProfilePhotos from "./ProfilePhotos";
import ProfileInfo from "./ProfileInfo";

interface IProps {
    user: IPersonel;
}

const ProfileContent: React.FC<IProps> = ({user}) => {
    
 
    const panes = [
        {menuItem: 'Info', render: () => <Tab.Pane><ProfileInfo user={user}/></Tab.Pane>},
        {menuItem: 'Photo', render: () => <Tab.Pane><ProfilePhotos profile={user}/></Tab.Pane>},
        {menuItem: 'History', render: () => <Tab.Pane><ProfileHistory user={user}/></Tab.Pane>},
        {menuItem: 'Courses', render: () => <Tab.Pane><ProfileCourses courses={user.courses}/></Tab.Pane>},
        {menuItem: 'Tags', render: () => <Tab.Pane><ProfileTags tags={user.tags} userId={user.id}/></Tab.Pane>},
        {menuItem: 'My Groups', render: () => <Tab.Pane><ProfileGroups groups={user.groups}/></Tab.Pane>}


    ]
    
    return (
        <Grid>
            <Grid.Column width={16}>
                <Tab
                    menu={{pointing: true}}
                    menuPosition='right'
                    panes={panes}
                />
            </Grid.Column>
        </Grid>
      
            
    );
}

export default observer(ProfileContent);