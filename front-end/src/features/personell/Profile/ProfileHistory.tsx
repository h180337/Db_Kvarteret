import React, {Fragment, useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {IPersonel} from '../../../app/models/personel';
import {Button, Table, Segment} from "semantic-ui-react";
import {RootStoreContext} from "../../../app/stores/rootStore";
import ProfileHistoryManagerForm from '../form/ProfileHistoryManagerForm';

interface IProps {
    user: IPersonel
}

const ProfileHistory: React.FC<IProps> = ({user}) => {

    const rootStore = useContext(RootStoreContext);
    const {openModal, closeModal} = rootStore.modalStore;
    return (
        <Fragment>
            <Segment clearing>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Semester</Table.HeaderCell>
                        <Table.HeaderCell>Group type</Table.HeaderCell>
                        <Table.HeaderCell>Group name</Table.HeaderCell>
                        <Table.HeaderCell>Position</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {user.historys && user.historys.map((group: any) => (
                        <Table.Row key={group.id}>
                            <Table.Cell>{`${group.semester} - ${group.year}`}</Table.Cell>
                            <Table.Cell>{group.groupType}</Table.Cell>
                            <Table.Cell>{group.groupName}</Table.Cell>
                            <Table.Cell>{group.position}</Table.Cell>

                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            {user.workstatus === 'inactive' ? <Button
                content='Add history'
                onClick={() => openModal(<ProfileHistoryManagerForm close={closeModal}/>)}
                color='green'
                floated='right'
            /> : null}
            </Segment>
        </Fragment>
    );
}

export default observer(ProfileHistory);