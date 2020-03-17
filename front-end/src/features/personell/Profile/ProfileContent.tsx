import React from 'react';
import { Tab } from 'semantic-ui-react';

const ProfileContent = () => {
    
    const panes = [
        {menuItem: 'About', render: () => <Tab.Pane>About</Tab.Pane>},
        {menuItem: 'History', render: () => <Tab.Pane>History</Tab.Pane>},
        {menuItem: 'Courses', render: () => <Tab.Pane>Courses</Tab.Pane>},
        {menuItem: 'Skills', render: () => <Tab.Pane>Skills</Tab.Pane>}
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