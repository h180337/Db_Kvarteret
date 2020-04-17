import React, {Fragment, useContext, useEffect} from 'react';
import {Grid} from 'semantic-ui-react'
import PersonellTable from "./PersonellTable";
import {observer} from 'mobx-react-lite'
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {RootStoreContext} from "../../../app/stores/rootStore";
import DataSearch from '../../../app/common/searchFilter/DataSearch';

const PesonellDashBoard: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const {loadUsers, loadingInitial, usersAsArray ,filteredUsersAsArray, filteredData} = rootStore.userStore

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    if (loadingInitial) return <LoadingComponent content='Loading Users...' inverted={true}/>
    return (
        <Fragment>
            <Grid>
                <Grid.Column width={12}>
                    <PersonellTable filteredData={filteredUsersAsArray} users={usersAsArray}/>
                </Grid.Column>
                <Grid.Column width={4}>
                    <DataSearch dataArray={usersAsArray} filteredData={filteredData}/>
                </Grid.Column>
            </Grid>
            
        </Fragment>
    );
}

export default observer(PesonellDashBoard);