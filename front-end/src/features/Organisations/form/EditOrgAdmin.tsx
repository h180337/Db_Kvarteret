// @ts-ignore
import React, {Fragment, useContext, useEffect,} from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import {Button, Segment} from 'semantic-ui-react';
import {observer} from 'mobx-react-lite'
import {RootStoreContext} from "../../../app/stores/rootStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {IPersonel} from "../../../app/models/personel";

interface IProps {
    orgId: string,
    admins: IPersonel [];
}

const EditOrgAdmin: React.FC<IProps> = ({orgId, admins}) => {

    const rootStore = useContext(RootStoreContext);
    const {submitting, target, organiasationsAdminRegistry} = rootStore.organiastionStore
    const {usersAsArray, loadUsers, loadingInitial} = rootStore.userStore
    
    useEffect(() => {
        loadUsers()
    },[loadUsers])
    
    if (loadingInitial) return <LoadingComponent inverted content='Loading organisation'/>

    const columns = [
        {Header: 'FirstName', accessor: 'fornavn'},
        {Header: 'LastName', accessor: 'etternavn'},
        {Header: 'Status', accessor: 'workstatus'},
        {
            Header: 'View', Cell: (props: any) =>
                (<Button
                        name={props.original.id}
                        loading={target === props.original.id && submitting}
                        content={organiasationsAdminRegistry.has(props.original.id) ? 'remove' : 'add'}
                        color={organiasationsAdminRegistry.has(props.original.id) ? 'red' : 'green'}
                        disabled={target === props.original.id && submitting}
                       // onClick={(e) => editAdmin(e, orgId, props.original.id)}
                    />
                )
        }
    ];

    return (
        <Fragment>
            Work in progress
            <Segment clearing>
                <ReactTable
                    style={{marginTop: '10px'}}
                    className='center'
                    data={usersAsArray}
                    columns={columns}
                    defaultPageSize={5}
                    pageSizeOptions={[5, 10, 20, 30]}
                />
            </Segment>
        </Fragment>
    );
}

export default observer(EditOrgAdmin);