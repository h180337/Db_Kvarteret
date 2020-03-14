// @ts-ignore
import React, {Fragment, SyntheticEvent} from 'react';
import {Grid} from 'semantic-ui-react'
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
    deletePersonHandler: (e:SyntheticEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean;
    target: string;
}

const PesonellDashBoard: React.FC<IProps> = (
    {pesonell, 
        selectUser, 
        selectedUser,
        setEditMode,
        editMode,
        setSelectedUser,
        createUserHandler,
        editUserHandler,
        deletePersonHandler,
        submitting,
        target}) => {
    return (
        <Fragment>
            <Grid>
                <Grid.Column width={12}>
                    <PersonellTable 
                        pesonell={pesonell}
                        selectUser={selectUser}
                        deletePersonHandler={deletePersonHandler}
                        submitting={submitting}
                        target={target}
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
                        submitting={submitting}
                    />}
                </Grid.Column>
            </Grid>
            
        </Fragment>
    );
}

export default PesonellDashBoard;