// @ts-ignore
import React, {Fragment, useContext, useEffect, useState} from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import {Button, Segment} from 'semantic-ui-react';
import {observer} from 'mobx-react-lite'
import {RootStoreContext} from "../../../app/stores/rootStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";

interface IProps {
    groupid: string
}

const MembersToAdd: React.FC<IProps> = ({groupid}) => {

    const rootStore = useContext(RootStoreContext);
    const {addMemberToGroup, submitting, groupMembersRegistry} = rootStore.groupStore
    const {loadingInitial, loadUsers, userRegistry, usersAsArray} = rootStore.userStore;
    const [usertoadd, setUserstoadd] = useState()
    useEffect(() => {
        loadUsers()
    }, [loadUsers]);
    
    if (loadingInitial) return <LoadingComponent content='Loading Users...' inverted={true}/>
    
    Array.from(groupMembersRegistry.values()).forEach(member => userRegistry.delete(member.id))
    
    const columns = [
        {Header: 'FirstName', accessor: 'fornavn'},
        {Header: 'LastName', accessor: 'etternavn'},
        {Header: 'Email', accessor: 'email'},
        {Header: 'Phone', accessor: 'phoneNumber'},
        {Header: 'Address', accessor: 'streetAddress'},
        {Header: 'Status', accessor: 'workstatus'},
        {
            Header: 'View', Cell: (props: any) =>
                (<Button
                        content='Add'
                        color='green'
                        onClick={(e) => addMemberToGroup(e,groupid, props.original.id, 
                            userRegistry.get(props.original.id))}
                        loading={submitting}
                    />
                )
        }
    ];

    return (
        <Fragment>
            <Segment clearing>
                <ReactTable
                    style={{marginTop: '10px'}}
                    className='center'
                    data={usersAsArray}
                    columns={columns}
                    defaultPageSize={5}
                    pageSizeOptions={[5, 10, 20, 30]}
                    filterable
                />
            </Segment>
        </Fragment>
    );
}

export default observer(MembersToAdd);