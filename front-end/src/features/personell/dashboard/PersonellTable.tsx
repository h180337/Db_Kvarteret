// @ts-ignore
import React, {Fragment, useState, useRef, useEffect} from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import {IPersonel} from "../../../app/models/personel";
import {Button, Segment} from 'semantic-ui-react';
import {CSVLink} from "react-csv";

interface IProps {
    pesonell: IPersonel[];
    
}

const columns = [
    {Header: 'FirstName', accessor: 'fornavn'},
    {Header: 'LastName', accessor: 'etternavn'},
    {Header: 'Email', accessor: 'epost'},
    {Header: 'Phone', accessor: 'telefon'},
    {Header: 'Address', accessor: 'gateadresse'},
    {Header: 'Status', accessor: 'arb_status'},
    {
        Header: 'View', Cell: () => (
            <Button content='View' color='blue'/>
        )
    }
];
const headers = [
    { label: "First Name", key: "fornavn" },
    { label: "Last Name", key: "etternavn" },
    { label: "Email", key: "epost" },
    { label: "Phone", key: "telefon" },
    { label: "Address", key: "gateadresse" },
    { label: "Status", key: "arb_status" }
];

const PersonellTable: React.FC<IProps> = ({pesonell}) => {
    const [csvData, setCsvData] = useState()
    useEffect(() =>{
        if (pesonell.length !== 0){
            setCsvData(pesonell);
        }
    }, [pesonell])
    return (
        <Fragment>
            <Segment clearing>
                <ReactTable
                    className='center'
                    data={pesonell}
                    columns={columns}
                    defaultPageSize={5}
                    pageSizeOptions={[10, 20, 30]}
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