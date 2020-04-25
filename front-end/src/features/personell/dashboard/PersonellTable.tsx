// @ts-ignore
import React, {Fragment, useState, useEffect, useContext, useRef} from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import {Button, Grid, Segment} from 'semantic-ui-react';
import {observer} from 'mobx-react-lite'
import {Link} from "react-router-dom";
import {RootStoreContext} from "../../../app/stores/rootStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import Headers from "../../../app/common/header/Headers";
import DataSearch from "../../../app/common/searchFilter/DataSearch";

interface IProps {
    users: any[];
    filteredData: Map<any,any>;
}


const PersonellTable: React.FC<IProps> = ({users, filteredData}) => {
    
   
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
        }
    ];
    let data:any = filteredData.size === 0 ? users: Array.from(filteredData.values());
    
    return (
        <Fragment>
            <Segment clearing>
                <Headers
                    iconName={'users'}
                    header={ 'Database members'}
                    subHeader={'Search and exsport data'}
                    headerSize={"medium"}
                />
                <Segment secondary/>
                <DataSearch dataArray={users} filteredData={filteredData}/>
                <ReactTable
                    style={{marginTop: '10px'}}
                    className='center'
                    data={data}
                    columns={columns}
                    defaultPageSize={5}
                    pageSizeOptions={[5, 10, 20, 30]}
                />
                </Segment>
        </Fragment>
    );
}

export default observer(PersonellTable);