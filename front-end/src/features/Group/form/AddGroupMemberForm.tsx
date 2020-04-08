import React, {Component, useContext, useEffect} from 'react';
import {RootStoreContext} from "../../../app/stores/rootStore";
import {Grid} from 'semantic-ui-react'
import {observer} from 'mobx-react-lite';
import LoadingComponent from "../../../app/layout/LoadingComponent";
import MembersToAdd from './MembersToAdd'
import {RouteComponentProps} from "react-router-dom";

interface IProps {
    groupid: string
}

const AddGroupMemberForm: React.FC<IProps> = ({groupid}) => {
   
    return (
        <MembersToAdd groupid = {groupid}/>
    );
}

export default observer(AddGroupMemberForm);