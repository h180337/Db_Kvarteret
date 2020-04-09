import React, {Fragment} from 'react';
import {Button, Segment} from "semantic-ui-react";
import ReactTable from "react-table-6";
import {CSVLink} from "react-csv";
import {Link} from "react-router-dom";
import { IOrganisation } from '../../../app/models/organisations';

interface IProp {
    organisation: IOrganisation
}

const GroupTable: React.FC<IProp> = ({organisation}) => {
    let data = organisation.groups ? organisation.groups: null;
    console.log(data)
    if (data == null){
        return <h1>No groups </h1>
    }
    const headers = [
        {label: "Name", key: "navn"},
        {label: "Description", key: "beskrivelse"},
        {label: "Active", key: "aktiv"},
        {label: "Active until", key: "aktive_til_og_med"},
        {label: "Created", key: "opprettet"}
    ];
    
    const columns = [
        {Header: 'Name', accessor: 'navn'},
        {Header: 'Description', accessor: 'beskrivelse'},
        {Header: 'Active', accessor: 'aktiv'},
        {Header: 'Active until', accessor: 'aktiv_til_og_med'},
        {Header: 'Created', accessor: 'ipprettet'},
        {
            Header: 'View', Cell: (props: any) =>
                (<Button
                        as={Link}
                        to={`/group/${props.original.id}`}
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
                    data={data}
                    columns={columns}
                    defaultPageSize={5}
                    pageSizeOptions={[5, 10, 20, 30]}
                    filterable
                />
                <Button
                    style={{marginTop: '10px'}}
                    color='blue'
                    as={CSVLink}
                    data={data}
                    headers={headers}
                > CSV DownLoad</Button>

            </Segment>
        </Fragment>
    );
}

export default GroupTable;