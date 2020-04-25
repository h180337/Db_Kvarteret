import React, {Fragment, useContext, useEffect} from 'react';
import {Grid, Segment} from 'semantic-ui-react'
import PersonellTable from "./PersonellTable";
import {observer} from 'mobx-react-lite'
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {RootStoreContext} from "../../../app/stores/rootStore";
import DataSearch from '../../../app/common/searchFilter/DataSearch';
import CsvLink from '../../../app/common/csvLink/CsvLink';
import Headers from '../../../app/common/header/Headers'

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
                <Grid.Column>
                    <PersonellTable filteredData={filteredData} users={usersAsArray}/>
                    <Segment>
                        <CsvLink dataArray={usersAsArray} filterData={ filteredUsersAsArray}/>
                    </Segment>
                </Grid.Column>
            </Grid>
        </Fragment>
    );
}

export default observer(PesonellDashBoard);