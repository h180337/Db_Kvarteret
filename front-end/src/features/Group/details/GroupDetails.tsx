import React, {useContext, useEffect} from 'react';
import {Grid, Segment} from "semantic-ui-react";
import GroupDetailedHeader from './GroupDetailedHeader';
import GroupDetailedInfo from './GroupDetailedInfo';
import GroupDetailedSideBar from "./GroupDetailedSideBar";
import {RootStoreContext} from "../../../app/stores/rootStore";
import {RouteComponentProps} from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {observer} from 'mobx-react-lite';
import MembersTable from "./MembersTable";

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
            if (!group || group!.id !== match.params.id){
                loadGroup(match.params.id);
            }
    }, [loadGroup, match.params.id,group]);

    if (loadingInitial) return <LoadingComponent inverted content='Loading group'/>
    
    if (!group) return <h2>group not found</h2>
    
    return (
        <Grid>
            <Grid.Column width={12}>
                <GroupDetailedHeader id={match.params.id}/>
                <GroupDetailedInfo group={group}/>
                <Segment><h2>Group Members</h2></Segment>
                <MembersTable groupId={match.params.id}/>
            </Grid.Column>
            <Grid.Column width={3}>
                <GroupDetailedSideBar users={group.members} groupId={match.params.id}/>
            </Grid.Column>
        </Grid>
    );
}

export default observer(GroupDetails);