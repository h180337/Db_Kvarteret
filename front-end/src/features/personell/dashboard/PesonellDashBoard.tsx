import React, {Fragment, useContext, useEffect} from 'react';
import {Grid} from 'semantic-ui-react'
import PersonellTable from "./PersonellTable";
import {observer} from 'mobx-react-lite'
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {RootStoreContext} from "../../../app/stores/rootStore";
import DataSearch from '../../../app/common/searchFilter/DataSearch';
import CsvLink from '../../../app/common/csvLink/CsvLink';

const PesonellDashBoard: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const {loadUsers, loadingInitial, usersAsArray , filteredData, filteredUsersAsArray} = rootStore.userStore

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);
    
    if (loadingInitial) return <LoadingComponent content='Loading Users...' inverted={true}/>

    const headers = [
        {label: "First Name", key: "fornavn"},
        {label: "Last Name", key: "etternavn"},
        {label: "Email", key: "email"},
        {label: "Phone", key: "phoneNumber"},
        {label: "Address", key: "streetAddress"},
        {label: "Status", key: "workstatus"}
    ];
    
    return (
        <Fragment>
            <Grid>
                <Grid.Column width={12}>
                    <PersonellTable filteredData={filteredData} users={usersAsArray}/>
                    <CsvLink dataArray={usersAsArray} filterData={ filteredUsersAsArray}/>
                </Grid.Column>
                <Grid.Column width={4}>
                    <DataSearch dataArray={usersAsArray} filteredData={filteredData}/>
                </Grid.Column>
            </Grid>
        </Fragment>
    );
}

export default observer(PesonellDashBoard);