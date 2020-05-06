import React, {Fragment, useContext, useEffect} from 'react';
import {RootStoreContext} from "../../app/stores/rootStore";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {Button, Segment, Search} from "semantic-ui-react";
import ReactTable from "react-table-6";
import { IPersonel } from '../../app/models/personel';
import DataSearch from '../../app/common/searchFilter/DataSearch';
import { observer } from 'mobx-react-lite';
interface IProps {
    AccessGroupId: string
    
}
let data:IPersonel[];
const AddAccessLevel:React.FC<IProps> = ({AccessGroupId}) => {
    const rootStore = useContext(RootStoreContext);
    const {loadingInitial, loadUsers, userRegistry, usersAsArray, filteredData} = rootStore.userStore;
    const {addAccessToUser, submitting} = rootStore.accessGroupStore
    useEffect(() => {
        loadUsers()
    }, [loadUsers]);

    const columns = [
        {Header: 'FirstName', accessor: 'fornavn'},
        {Header: 'LastName', accessor: 'etternavn'},
        {Header: 'Status', accessor: 'workstatus'},
        {
            Header: 'View', Cell: (props: any) =>
                (<Button
                        name={props.original.id}
                        content='Add'
                        color='green'
                        onClick={(e) =>addAccessToUser(e, AccessGroupId,props.original.id)}
                        loading={submitting}
                    />
                )
        }
    ];
    if (loadingInitial) return <LoadingComponent content='Loading Users...' inverted={true}/>
    return (
        <Fragment>
            <Segment clearing>
                <DataSearch filteredData={filteredData} dataArray={usersAsArray}/>
                <ReactTable
                    style={{marginTop: '10px'}}
                    className='center'
                    data={Array.from(filteredData.values())}
                    columns={columns}
                    defaultPageSize={5}
                    pageSizeOptions={[5, 10, 20, 30]}
                />
            </Segment>
        </Fragment>
    );
}

export default observer(AddAccessLevel);