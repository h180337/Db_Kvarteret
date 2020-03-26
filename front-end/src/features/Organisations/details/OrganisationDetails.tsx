import React, {useContext, useEffect} from 'react';
import {Grid} from 'semantic-ui-react'
import OrganisationDetailedHeader from "./OrganisationDetailedHeader";
import OrganisationDetailedInfo from "./OrganisationDetailedInfo";
import {RootStoreContext} from "../../../app/stores/rootStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {RouteComponentProps} from "react-router-dom";
import { observer } from 'mobx-react-lite';
import OrganisationDetailedSidebar from './OrganisationDetailedSidebar';
import GroupsTable from './GroupsTable'

interface OranisationParamas {
    id: string;
}
const OrganisationDetails : React.FC<RouteComponentProps<OranisationParamas>> = ({match, history}) => {
    const rootStore = useContext(RootStoreContext);
    const {
        loadOrg,
        loadingInitial,
        organiasation
    } = rootStore.organiastionStore;

    useEffect(() => {
        loadOrg(match.params.id);
    }, [loadOrg, match.params.id]);

    if (loadingInitial) return <LoadingComponent inverted content='Loading user'/>

    if (!organiasation) return <h2>User not found</h2>
    return (
       <Grid>
           <Grid.Column width={10}>
               <OrganisationDetailedHeader organiasation={organiasation}/>
               <OrganisationDetailedInfo organiasation={organiasation}/>
           </Grid.Column>
           <Grid.Column width={6}>
                <OrganisationDetailedSidebar/>
           </Grid.Column>
           <GroupsTable/>
       </Grid>
    );
}

export default observer(OrganisationDetails);