import React, {Fragment, useContext, useEffect} from 'react';
import {RootStoreContext} from "../../app/stores/rootStore";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {Button, Segment, Search} from "semantic-ui-react";
import ReactTable from "react-table-6";
import { IPersonel } from '../../app/models/personel';
import DataSearch from '../../app/common/searchFilter/DataSearch';
import { observer } from 'mobx-react-lite';
interface IProps {
    courseId: string
    members: IPersonel [] | undefined
}
let data:IPersonel[];
const AddCourseMembers:React.FC<IProps> = ({courseId, members}) => {
    const rootStore = useContext(RootStoreContext);
    const {loadingInitial, loadUsers, userRegistry, usersAsArray, filteredData} = rootStore.userStore;
    const {submitting, target, addCourseToUser} = rootStore.courseStore
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
                        onClick={(e) =>addCourseToUser(e, courseId,props.original.id)}
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

export default observer(AddCourseMembers);