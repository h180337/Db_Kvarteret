// @ts-ignore
import React, {Fragment, useState, useRef} from 'react';
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

const PersonellTable: React.FC<IProps> = ({pesonell}) => {
    const [cvsData, setCvsData] = useState([]);
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
                > CSV DownLoad</Button>
                
                
            </Segment>
        </Fragment>
    );
}

export default PersonellTable;