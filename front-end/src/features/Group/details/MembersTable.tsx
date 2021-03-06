import React, {Fragment, useContext} from 'react';
import { observer } from 'mobx-react-lite';
import {Button, Segment} from "semantic-ui-react";
import ReactTable from "react-table-6";
import {CSVLink} from "react-csv";
import {Link} from "react-router-dom";
import {RootStoreContext} from "../../../app/stores/rootStore";
import DataSearch from '../../../app/common/searchFilter/DataSearch';

interface IProps {
    groupId: string;
}

const MembersTable:React.FC<IProps> = ({groupId}) => {
    const rootStore = useContext(RootStoreContext);
    const {submitting,removeGroupMember, groupMembersRegistry, target, filteredData} = rootStore.groupStore
    
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
                        as={Link}
                        to={`/users/${props.original.id}`}
                        content='View'
                        color='blue'/>
                )
        },
        {
            Header: 'View', Cell: (props: any) =>
                (<Button
                        name={props.original.id}
                        content='Remove'
                        color='red'
                        onClick={(e) => removeGroupMember(e, groupId, props.original.id)}
                        loading={target === props.original.id && submitting}
                        disabled={target === props.original.id && submitting}
                    />
                )
        }
    ];
    return (
        <Fragment>
            <Segment clearing>
                <DataSearch filteredData={filteredData} dataArray={Array.from(groupMembersRegistry.values())}/>
                <ReactTable
                    style={{marginTop: '10px'}}
                    className='center'
                    data={filteredData.size === 0 ? Array.from(groupMembersRegistry.values()): Array.from(filteredData.values())}
                    columns={columns}
                    defaultPageSize={5}
                    pageSizeOptions={[5, 10, 20, 30]}
                />
                <Button
                    style={{marginTop: '10px'}}
                    color='blue'
                    as={CSVLink}
                    data={Array.from(groupMembersRegistry.values())}
                    headers={headers}
                > CSV DownLoad</Button>

            </Segment>
        </Fragment>
    );
}

export default observer(MembersTable);