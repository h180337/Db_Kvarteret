// @ts-ignore
import React, {Fragment, useContext, useEffect,} from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import {Button, Segment} from 'semantic-ui-react';
import {observer} from 'mobx-react-lite'
import {RootStoreContext} from "../../../app/stores/rootStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {IPersonel} from "../../../app/models/personel";
import DataSearch from '../../../app/common/searchFilter/DataSearch';

interface IProps {
    orgId: string,
    admins: IPersonel [];
}

const EditOrgAdmin: React.FC<IProps> = ({orgId, admins}) => {

    const rootStore = useContext(RootStoreContext);
    const {submitting, target, organiasationsAdminRegistry, addAdminToOrganisation, removeAdmin} = rootStore.organiastionStore
    const {usersAsArray, loadUsers, loadingInitial, filteredData} = rootStore.userStore
    
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
           ( organiasationsAdminRegistry.has(props.original.id)?
                <Button
                    name={props.original.id}
                    loading={target === props.original.id && submitting}
                    content='remove'
                    color='red'
                    disabled={target === props.original.id && submitting}
                    onClick={(e) => removeAdmin(e, orgId, props.original.id)}
                />:
                <Button
                    name={props.original.id}
                    loading={target === props.original.id && submitting}
                    content='add'
                    color='green'
                    disabled={target === props.original.id && submitting}
                    onClick={(e) => addAdminToOrganisation(e, orgId, props.original.id)}
                />)
            
                    
                    
                
        }
    ];

    return (
        <Fragment>
            Work in progress
            <DataSearch filteredData={filteredData} dataArray={usersAsArray}/>
            <Segment clearing>
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

export default observer(EditOrgAdmin);