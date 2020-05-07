// @ts-ignore
import React, {Fragment, useContext, useEffect} from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import {Button, Segment} from 'semantic-ui-react';
import {observer} from 'mobx-react-lite'
import {RootStoreContext} from "../../../app/stores/rootStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import DataSearch from '../../../app/common/searchFilter/DataSearch';

interface IProps {
    groupid: string
}

const MembersToAdd: React.FC<IProps> = ({groupid}) => {

    const rootStore = useContext(RootStoreContext);
    const {addMemberToGroup, groupMembersRegistry, submitting, target} = rootStore.groupStore
    const {loadingInitial, loadUsers, userRegistry, usersAsArray, filteredData} = rootStore.userStore;
    useEffect(() => {
        loadUsers()
    }, [loadUsers]);
    
    if (loadingInitial) return <LoadingComponent content='Loading Users...' inverted={true}/>
    
    //Array.from(groupMembersRegistry.values()).forEach(member => userRegistry.delete(member.id))
    
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
                        name={props.original.id}
                        content='Add'
                        color='green'
                        loading={target === props.original.id && submitting}
                        disabled={target === props.original.id && submitting}
                        onClick={(e) => addMemberToGroup(e,groupid, props.original.id, 
                            userRegistry.get(props.original.id))}
                        
                    />
                )
        }
    ];

    return (
        <Fragment>
            <DataSearch filteredData={filteredData} dataArray={usersAsArray}/>
            <Segment clearing>
                <ReactTable
                    style={{marginTop: '10px'}}
                    className='center'
                    data={Array.from(filteredData.values())}
                    columns={columns}
                    defaultPageSize={5}
                    pageSizeOptions={[5, 10, 20, 30]}
                    filterable
                />
            </Segment>
        </Fragment>
    );
}

export default observer(MembersToAdd);