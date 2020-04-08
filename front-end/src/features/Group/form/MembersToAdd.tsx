// @ts-ignore
import React, {Fragment, useContext, useEffect} from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import {Button, Segment} from 'semantic-ui-react';
import {CSVLink} from "react-csv";
import {observer} from 'mobx-react-lite'
import {Link} from "react-router-dom";
import {RootStoreContext} from "../../../app/stores/rootStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";

interface IProps {
    groupid: string
}

const MembersToAdd: React.FC<IProps> = ({groupid}) => {

    const rootStore = useContext(RootStoreContext);
    const {addMemberToGroup, submitting, group} = rootStore.groupStore
    const {loadingInitial, loadUsers, userRegistry, usersAsArray} = rootStore.userStore;

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    let filteredData: any[] = [];
    
    if (loadingInitial) return <LoadingComponent content='Loading Users...' inverted={true}/>
    
    const headers = [
        {label: "First Name", key: "fornavn"},
        {label: "Last Name", key: "etternavn"},
        {label: "Email", key: "email"},
        {label: "Phone", key: "phoneNumber"},
        {label: "Address", key: "streetAddress"},
        {label: "Status", key: "workstatus"}
    ];

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
                        onClick={() => addMemberToGroup(groupid, props.original.id)}
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