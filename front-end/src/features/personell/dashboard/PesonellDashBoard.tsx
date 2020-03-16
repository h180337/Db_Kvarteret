import React, {Fragment, useContext, useEffect} from 'react';
import {Grid} from 'semantic-ui-react'
import PersonellTable from "./PersonellTable";
import {observer} from 'mobx-react-lite'
import usersStore from "../../../app/stores/userStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const PesonellDashBoard: React.FC = () => {
    const userStore = useContext(usersStore);

    useEffect(() => {
        userStore.loadUsers();
    }, [userStore]);

    if (userStore.loadingInitial) return <LoadingComponent content='Loading Users...' inverted={true}/>
    
    return (
        <Fragment>
            <Grid>
                <Grid.Column width={12}>
                    <PersonellTable/>
                </Grid.Column>
                <Grid.Column width={4}>
                   <h2>Filters</h2>
                </Grid.Column>
            </Grid>
            
        </Fragment>
    );
}

export default observer(PesonellDashBoard);