import React, {Fragment, useContext, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Button, Dropdown, Header, Table} from 'semantic-ui-react';
import {ICourse} from '../../app/models/Course';
import {RootStoreContext} from "../../app/stores/rootStore";
import AddCourseMembers from './AddCourseMembers';
import AddNewCourse from "./addNewCourse";
import { IAccessGroup } from '../../app/models/AccessGroups';
import AddAccessLevel from './AddAccessLevel';

interface IProps {
    accessGroupRegistry: Map<string, IAccessGroup>
}

const AccessController: React.FC<IProps> = ({accessGroupRegistry}) => {
    const rootStore = useContext(RootStoreContext);
    const {openModal, closeModal} = rootStore.modalStore
    const [value, setValue] = useState('')
    const options = Array.from(accessGroupRegistry.values()).map((accessGroup, index) => ({
        text: accessGroup.name,
        value: accessGroup.id,
    }))
    const {removeCourse, submitting, createCourse} = rootStore.courseStore
    const getValueHandler = (e: any, value: any) => {
        setValue(value)
    }

    let selectedAccessGroup = accessGroupRegistry.get(value)
    return (
        <Fragment>
            <Header size='medium' content='Access Controller(work in progress)'/>
            <Dropdown placeholder='AccessGroup' search selection options={options}
                      onChange={(event, options) => getValueHandler(event, options.value)}
            />
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Worksatus</Table.HeaderCell>
                        <Table.HeaderCell>Remove</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {(selectedAccessGroup && selectedAccessGroup.members) && selectedAccessGroup.members.map(member =>
                        <Table.Row key={member.id}>
                            <Table.Cell>{`${member.fornavn} ${member.etternavn}`}</Table.Cell>
                            <Table.Cell>{member.workstatus}</Table.Cell>
                            <Table.Cell>
                                <Button
                                    negative
                                    content='Remove'
                                    loading={submitting}
                                    disabled={true}
                                />
                            </Table.Cell>

                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
            {value !== '' && <Button
                content='Add access'
                color='green'
                disabled={true}
                onClick={() => openModal(<AddAccessLevel AccessGroupId={value}/>)}
            />}
        </Fragment>

    );
}

export default observer(AccessController);