import React, {Fragment, useContext, useEffect} from 'react';
import {RootStoreContext} from "../../app/stores/rootStore";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {Button, Segment} from "semantic-ui-react";
import ReactTable from "react-table-6";
import { IPersonel } from '../../app/models/personel';
interface IProps {
    courseId: string
    members: IPersonel [] | undefined
}
let data:IPersonel[];
const AddCourseMembers:React.FC<IProps> = ({courseId, members}) => {
    const rootStore = useContext(RootStoreContext);
    const {loadingInitial, loadUsers, userRegistry, usersAsArray} = rootStore.userStore;
    useEffect(() => {
        loadUsers()
    }, [loadUsers]);
    
    
  
    
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
                    />
                )
        }
    ];
    if (loadingInitial) return <LoadingComponent content='Loading Users...' inverted={true}/>

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
            </Segment>
        </Fragment>
    );
}

export default AddCourseMembers;