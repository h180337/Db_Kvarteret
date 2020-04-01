import React, {useContext, useEffect} from 'react';
import {Grid} from "semantic-ui-react";
import GroupDetailedHeader from './GroupDetailedHeader';
import GroupDetailedInfo from './GroupDetailedInfo';
import GroupDetailedSideBar from "./GroupDetailedSideBar";
import {RootStoreContext} from "../../../app/stores/rootStore";
import {RouteComponentProps} from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {observer} from 'mobx-react-lite';
import MembersTable from "./MembersTable";
import PersonellTable from '../../personell/dashboard/PersonellTable';

interface GroupParams {
    id: string;
}

const GroupDetails: React.FC<RouteComponentProps<GroupParams>> = ({match, history}) => {

    const rootStore = useContext(RootStoreContext);
    const {
        loadGroup,
        loadingInitial,
        group,

    } = rootStore.groupStore;

    useEffect(() => {
        loadGroup(match.params.id);
    }, [loadGroup, match.params.id]);

    if (loadingInitial) return <LoadingComponent inverted content='Loading group'/>


    if (!group) return <h2>group not found</h2>
    
    Object.values(group.members).map((mem:any) => console.log(mem.id))
    return (
        <Grid>
            <Grid.Column width={10}>
                <GroupDetailedHeader id={match.params.id}/>
                <GroupDetailedInfo group={group}/>
                <PersonellTable users={group.members}/>
            </Grid.Column>
            <Grid.Column width={6}>
                <GroupDetailedSideBar/>
            </Grid.Column>
        </Grid>
    );
}

export default observer(GroupDetails);