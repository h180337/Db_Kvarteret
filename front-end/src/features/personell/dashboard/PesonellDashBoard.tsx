import React, {Fragment, useContext, useEffect} from 'react';
import {Grid, Segment} from 'semantic-ui-react'
import PersonellTable from "./PersonellTable";
import {observer} from 'mobx-react-lite'
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {RootStoreContext} from "../../../app/stores/rootStore";
import CsvLink from '../../../app/common/csvLink/CsvLink';

const PesonellDashBoard: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const {loadUsers, loadingInitial, usersAsArray , filteredData, filteredUsersAsArray} = rootStore.userStore

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);
    
    if (loadingInitial) return <LoadingComponent content='Loading Users...' inverted={true}/>
    
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