// @ts-ignore
import React, {Fragment, SyntheticEvent} from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import {IPersonel} from "../../../app/models/personel";
import {Button, Segment} from 'semantic-ui-react';
import {CSVLink} from "react-csv";

interface IProps {
    pesonell: IPersonel[];
    selectUser: (id: string) => void;
    deletePersonHandler: (e:SyntheticEvent<HTMLButtonElement>,id: string) => void;
    submitting: boolean;
    target: string;
    

}


const headers = [
    { label: "First Name", key: "fornavn" },
    { label: "Last Name", key: "etternavn" },
    { label: "Email", key: "epost" },
    { label: "Phone", key: "telefon" },
    { label: "Address", key: "gateadresse" },
    { label: "Status", key: "arb_status" }
];

const PersonellTable: React.FC<IProps> = ({pesonell, selectUser, deletePersonHandler, submitting,target}) => {

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
                    onClick={(event)=>deletePersonHandler(event, props.original.id)}
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
                    data={pesonell}
                    columns={columns}
                    defaultPageSize={5}
                    pageSizeOptions={[5, 10, 20, 30]}
                    filterable
                /> 
                <Button 
                    style={{marginTop: '10px'}}
                    color='blue'
                    as={CSVLink}
                    data={pesonell}
                    headers={headers}
                > CSV DownLoad</Button>
                
            </Segment>
        </Fragment>
    );
}

export default PersonellTable;