// @ts-ignore
import React, {Fragment, useContext,} from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import {Button, Segment} from 'semantic-ui-react';
import {observer} from 'mobx-react-lite'
import {RootStoreContext} from "../../../app/stores/rootStore";

interface IProps {
    groupid: string
}

const AddAdmin: React.FC<IProps> = ({groupid}) => {

    const rootStore = useContext(RootStoreContext);
    const {editAdmin, submitting,groupMembersAsArray, target} = rootStore.groupStore
    
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
                        loading={target === props.original.id && submitting}
                        content={props.original.isAdmin ? 'remove' : 'add'}
                        color={props.original.isAdmin ? 'red' : 'green'}
                        disabled={target === props.original.id && submitting}
                        onClick={(e) => editAdmin(e, groupid, props.original.id)}
                    />
                )
        }
    ];

    return (
        <Fragment>
            <Segment clearing>
                <ReactTable
                    style={{marginTop: '10px'}}
                    className='center'
                    data={groupMembersAsArray}
                    columns={columns}
                    defaultPageSize={5}
                    pageSizeOptions={[5, 10, 20, 30]}
                    filterable
                />
            </Segment>
        </Fragment>
    );
}

export default observer(AddAdmin);