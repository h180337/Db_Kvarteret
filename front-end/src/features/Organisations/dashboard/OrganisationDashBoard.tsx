import React, {Fragment, useContext, useEffect} from 'react';
import {Grid, Segment} from "semantic-ui-react";
import OrganisationList from "./OrganisationList";
import {RootStoreContext} from "../../../app/stores/rootStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from 'mobx-react-lite';
import Headers from '../../../app/common/header/Headers'

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
                <Grid.Column width={16}>
                    <Segment>
                        <Headers
                            iconName="building"
                            header='Organisation List'
                            subHeader='Pick your organisation'
                            headerSize="medium"/>
                    </Segment>
                    <OrganisationList/>
                </Grid.Column>
            </Grid>

        </Fragment>
    );
}

export default observer(OrganisationDashBoard);