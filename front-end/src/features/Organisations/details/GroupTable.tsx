import React, {Fragment, useContext} from 'react';
import {Button, Segment} from "semantic-ui-react";
import ReactTable from "react-table-6";
import {Link} from "react-router-dom";
import {RootStoreContext} from "../../../app/stores/rootStore";
import { observer } from 'mobx-react-lite';
import DataSearch from '../../../app/common/searchFilter/DataSearch';



const GroupTable: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const {organiasationsGroupRegistry, 
        organiasation, 
        target, 
        submitting, 
        removeGroupFromOrganisation} = rootStore.organiastionStore
    
    const {filteredData} = rootStore.groupStore
    
    const columns = [
        {Header: 'Name', accessor: 'navn'},
        {Header: 'Group Type', accessor: 'groupType'},
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
        },
        {
            Header: 'View', Cell: (props: any) =>
                (<Button
                        name={props.original.id}
                        loading={target === props.original.id && submitting}
                        disabled={target === props.original.id && submitting}
                        onClick={(e) => removeGroupFromOrganisation(e, organiasation!.id,props.original.id )}
                        content='Remove'
                        color='red'/>
                )
        }
    ];
    return (
        <Fragment>
            <Segment clearing>
                <DataSearch filteredData={filteredData} dataArray={Array.from(organiasationsGroupRegistry.values())}/>
                <ReactTable
                    style={{marginTop: '10px'}}
                    className='center'
                    data={filteredData.size=== 0 ? Array.from(organiasationsGroupRegistry.values()) :Array.from(filteredData.values())}
                    columns={columns}
                    defaultPageSize={5}
                    pageSizeOptions={[5, 10, 20, 30]}
                />
            </Segment>
        </Fragment>
    );
}

export default observer(GroupTable);