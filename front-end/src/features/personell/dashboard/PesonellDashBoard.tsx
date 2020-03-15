// @ts-ignore
import React, {Fragment, useContext} from 'react';
import {Grid} from 'semantic-ui-react'
import PersonellTable from "./PersonellTable";
import Profile from '../Profile/Profile';
import PersonelForm from "../form/PersonelForm";
import {observer} from 'mobx-react-lite'
import usersStore from '../../../app/stores/userStore';

const PesonellDashBoard: React.FC = () => {
    
    const userStore = useContext(usersStore);
    const {editMode, selectedUser} = userStore;
    return (
        <Fragment>
            <Grid>
                <Grid.Column width={12}>
                    <PersonellTable/>
                </Grid.Column>
                <Grid.Column width={4}>
                    {selectedUser && !editMode && 
                    <Profile/>}
                    {editMode && <PersonelForm/>}
                </Grid.Column>
            </Grid>
            
        </Fragment>
    );
}

export default observer(PesonellDashBoard);