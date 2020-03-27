// @ts-ignore
import React, {Fragment, useContext} from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import {Button, Segment} from 'semantic-ui-react';
import {CSVLink} from "react-csv";
import {observer} from 'mobx-react-lite'
import {Link} from "react-router-dom";
import {RootStoreContext} from "../../../app/stores/rootStore";

const PersonellTable: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const {usersAsArray, target, submitting, deleteUser} = rootStore.userStore;
    
    

    const headers = [
        { label: "First Name", key: "fornavn" },
        { label: "Last Name", key: "etternavn" },
        { label: "Email", key: "email" },
        { label: "Phone", key: "phoneNumber" },
        { label: "Address", key: "streetAddress" },
        { label: "Status", key: "workstatus" }
    ];
   
    const columns = [
        {Header: 'FirstName', accessor: 'fornavn'},
        {Header: 'LastName', accessor: 'etternavn'},
        {Header: 'Email', accessor: 'email'},
        {Header: 'Phone', accessor: 'phoneNumber'},
        {Header: 'Address', accessor: 'streetAddress'},
        {Header: 'Status', accessor: 'workstatus'},
        {
            Header: 'View', Cell: (props: any) => (
                <Button
                    as={Link}
                    to={`/users/${props.original.id}`}
                    content='View'
                    color='blue'/>
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
                <Button 
                    style={{marginTop: '10px'}}
                    color='blue'
                    as={CSVLink}
                    data={usersAsArray}
                    headers={headers}
                > CSV DownLoad</Button>
                
            </Segment>
        </Fragment>
    );
}

export default observer(PersonellTable);