// @ts-ignore
import React, {Fragment, useContext} from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import {Button, Segment} from 'semantic-ui-react';
import {CSVLink} from "react-csv";
import {observer} from 'mobx-react-lite'
import usersStore from "../../../app/stores/userStore";

const PersonellTable: React.FC = () => {

    const userStore = useContext(usersStore);
    const {usersAsArray, selectUser, target, submitting, deleteUser} = userStore;
    
    

    const headers = [
        { label: "First Name", key: "fornavn" },
        { label: "Last Name", key: "etternavn" },
        { label: "Email", key: "epost" },
        { label: "Phone", key: "telefon" },
        { label: "Address", key: "gateadresse" },
        { label: "Status", key: "arb_status" }
    ];
    
    const columns = [
        {Header: 'FirstName', accessor: 'fornavn'},
        {Header: 'LastName', accessor: 'etternavn'},
        {Header: 'Email', accessor: 'epost'},
        {Header: 'Phone', accessor: 'telefon'},
        {Header: 'Address', accessor: 'gateadresse'},
        {Header: 'Status', accessor: 'arb_status'},
        {
            Header: 'View', Cell: (props: any) => (
                <Button
                    onClick={()=>selectUser(props.original.id)}
                    content='View'
                    color='blue'/>
            )
        }
        ,
        {
            Header: 'Delete', Cell: (props: any) => (
                <Button
                    name={props.original.id}
                    loading={target === props.original.id && submitting}
                    onClick={(event)=>deleteUser(event, props.original.id)}
                    content='Delete'
                    color='red'/>
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