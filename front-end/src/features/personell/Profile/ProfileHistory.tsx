import React, {Fragment, useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {IPersonel} from '../../../app/models/personel';
import {Button, Table} from "semantic-ui-react";
import ProfileTagManager from "./ProfileTagManager";
import {RootStoreContext} from "../../../app/stores/rootStore";
import ProfileHistoryManagerForm from '../form/ProfileHistoryManagerForm';

interface IProps {
    user: IPersonel
}

const history: any[] = [
    {
        semester: 'h17',
        name: 'test',
        position: 'master in comand',
        id: '1',
        groupType: 'prosject'
    },
    {
        semester: 'h18',
        name: 'tetes',
        position: 'master',
        id: '3',
        groupType: 'kommite'
    },
    {
        semester: 'h19',
        name: '123',
        position: 'master in comand',
        id: '2',
        groupType: 'group'
    },
]

const ProfileHistory: React.FC<IProps> = ({user}) => {

    const rootStore = useContext(RootStoreContext);
    const {openModal, closeModal} = rootStore.modalStore;
    return (
        <Fragment>
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
                    {history.map((group: any) => (
                        <Table.Row key={group.id}>
                            <Table.Cell>{group.semester}</Table.Cell>
                            <Table.Cell>{group.groupType}</Table.Cell>
                            <Table.Cell>{group.name}</Table.Cell>
                            <Table.Cell>{group.position}</Table.Cell>

                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            {user.workstatus === 'inactive' ? <Button
                content='Edit history'
                onClick={() => openModal(<ProfileHistoryManagerForm close={closeModal}/>)}
                color='green'
                floated='right'
            /> : null}
            
        </Fragment>
    );
}

export default observer(ProfileHistory);