import React, {Fragment, useContext, useEffect} from 'react';
import {Grid} from "semantic-ui-react";
import OrganisationList from "./OrganisationList";
import {RootStoreContext} from "../../../app/stores/rootStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from 'mobx-react-lite';

const OrganisationDashBoard = () => {

    const rootStore = useContext(RootStoreContext);
    const {loadOrganisations, loadingInitial } = rootStore.organiastionStore


    useEffect(() => {
        loadOrganisations();
    }, [loadOrganisations]);

    if (loadingInitial) return <LoadingComponent content='Loading Organisations...' inverted={true}/>

    return (
        <Fragment>
            <Grid>
                <Grid.Column width={12}>
                    <OrganisationList/>
                </Grid.Column>
                <Grid.Column width={4}>
                    <h2>Filters</h2>
                </Grid.Column>
            </Grid>

        </Fragment>
    );
}

export default observer(OrganisationDashBoard);