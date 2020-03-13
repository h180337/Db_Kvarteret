// @ts-ignore
import React, {Fragment} from 'react';
import {Container, Grid, List} from 'semantic-ui-react'
import {IPersonel} from '../../../app/models/personel'
import PersonellTable from "./PersonellTable";
import Profile from '../Profile/Profile';
import PersonelForm from "../form/PersonelForm";

interface IProps {
    pesonell: IPersonel[];
    selectUser: (id: string) => void;
    selectedUser: IPersonel | null;
    setEditMode: (editMode: boolean) => void;
    setSelectedUser:(person: IPersonel | null) => void
    editMode: boolean;
    createUserHandler: (person: IPersonel) => void;
    editUserHandler: (person: IPersonel) => void;
}

const PesonellDashBoard: React.FC<IProps> = (
    {pesonell, 
        selectUser, 
        selectedUser,
        setEditMode,
        editMode,
        setSelectedUser,
        createUserHandler,
        editUserHandler}) => {
    return (
        <Fragment>
            <Grid>
                <Grid.Column width={12}>
                    <PersonellTable 
                        pesonell={pesonell}
                        selectUser={selectUser}
                    />
                </Grid.Column>
                <Grid.Column width={4}>
                    {selectedUser && !editMode && 
                    <Profile 
                        selectedUser={selectedUser}
                        setEditMode={setEditMode}
                        setSelectedUser={setSelectedUser}
                        
                    />}
                    {editMode && <PersonelForm
                        key={selectedUser && selectedUser.id || 0}
                        setEditMode={ setEditMode}
                        selectedUser={selectedUser!}
                        createUserHandler={createUserHandler}
                        editUserHandler={editUserHandler}
                    />}
                </Grid.Column>
            </Grid>
            
        </Fragment>
    );
}

export default PesonellDashBoard;