import React from 'react';
import {observer} from 'mobx-react-lite';
import MembersToAdd from './MembersToAdd'

interface IProps {
    groupid: string
}

const AddGroupMemberForm: React.FC<IProps> = ({groupid}) => {
   
    return (
        <MembersToAdd groupid = {groupid}/>
    );
}

export default observer(AddGroupMemberForm);