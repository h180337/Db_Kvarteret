import React, {useContext, useEffect} from 'react';
import {Grid} from 'semantic-ui-react'
import OrganisationDetailedHeader from "./OrganisationDetailedHeader";
import OrganisationDetailedInfo from "./OrganisationDetailedInfo";
import {RootStoreContext} from "../../../app/stores/rootStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {RouteComponentProps} from "react-router-dom";
import { observer } from 'mobx-react-lite';
import OrganisationDetailedSidebar from './OrganisationDetailedSidebar';
import GroupTable from './GroupTable';

interface OranisationParamas {
    id: string;
}
const OrganisationDetails : React.FC<RouteComponentProps<OranisationParamas>> = ({match, history}) => {
    const rootStore = useContext(RootStoreContext);
    const {
        loadOrg,
        loadingInitial,
        organiasation,
        organiasationsGroupRegistry
        
    } = rootStore.organiastionStore;

    useEffect(() => {
        loadOrg(match.params.id);
    }, [loadOrg, match.params.id]);

    if (loadingInitial) return <LoadingComponent inverted content='Loading organisation'/>

    if (!organiasation) return <h2>organisation not found</h2>
    return (
       <Grid>
           <Grid.Column width={11}>
               <OrganisationDetailedHeader id={match.params.id}/>
               <OrganisationDetailedInfo organiasation={organiasation}/>
               <GroupTable/>
           </Grid.Column>
           <Grid.Column width={3}>
                <OrganisationDetailedSidebar/>
           </Grid.Column>
       </Grid>
    );
}

export default observer(OrganisationDetails);