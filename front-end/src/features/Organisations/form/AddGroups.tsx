// @ts-ignore
import React, {useContext, useEffect} from 'react';
import {Button, Segment} from "semantic-ui-react";
import ReactTable from "react-table-6";
import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../../app/stores/rootStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";

interface IProps {
    organisationId: string
}

const AddGroups: React.FC<IProps> = ({organisationId}) => {

    const rootStore = useContext(RootStoreContext);
    const {loadgroups, loadingInitial, groupsAsArray, groupRegistry} = rootStore.groupStore
    const {addGroupToOrganisation, submitting, target} = rootStore.organiastionStore

    useEffect(() => {
        loadgroups()
    }, [loadgroups])

    if (loadingInitial) return <LoadingComponent content='Loading Users...' inverted={true}/>

    const columns = [
        {Header: 'Name', accessor: 'navn'},
        {Header: 'Description', accessor: 'beskrivelse'},
        {Header: 'Active', accessor: 'aktiv'},
        {Header: 'Active until', accessor: 'aktiv_til_og_med'},
        {Header: 'Created', accessor: 'ipprettet'},
        {
            Header: 'View', Cell: (props: any) =>
                (<Button
                        name={props.original.id}
                        content='add'
                        loading={target === props.original.id && submitting}
                        disabled={target === props.original.id && submitting}
                        color='green'
                        onClick={(e)  => addGroupToOrganisation(e, organisationId, props.original.id
                        , groupRegistry.get(props.original.id))}
                    />
                )
        }
    ];
    return (

        <Segment clearing>
            <ReactTable
                style={{marginTop: '10px'}}
                className='center'
                data={groupsAsArray}
                columns={columns}
                defaultPageSize={5}
                pageSizeOptions={[5, 10, 20, 30]}
                filterable
            />

        </Segment>
    );
}

export default observer(AddGroups);