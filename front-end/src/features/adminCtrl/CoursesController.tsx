import React, {Fragment, useContext, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Button, Dropdown, Header, Table} from 'semantic-ui-react';
import {ICourse} from '../../app/models/Course';
import {RootStoreContext} from "../../app/stores/rootStore";
import AddCourseMembers from './AddCourseMembers';

interface IProps {
    courseRegistry: Map<string, ICourse>
}

const CoursesController: React.FC<IProps> = ({courseRegistry}) => {
    const rootStore = useContext(RootStoreContext);
    const {openModal, closeModal} = rootStore.modalStore
    const [value, setValue] = useState('')
    const options = Array.from(courseRegistry.values()).map((course, index) => ({
        text: course.navn,
        value: course.id,
    }))
    const getValueHandler = (e: any, value: any) => {
        setValue(value)
    }

    let selectedCourse = courseRegistry.get(value)
    return (
        <Fragment>
            <Header size='medium' content='Course Controller'/>
            <Dropdown placeholder='Course' search selection options={options}
                      onChange={(event, options) => getValueHandler(event, options.value)}
            />
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Worksatus</Table.HeaderCell>
                        <Table.HeaderCell>Organisation</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {selectedCourse && selectedCourse.members.map(member =>
                        <Table.Row key={member.id}>
                            <Table.Cell>{`${member.fornavn} ${member.etternavn}`}</Table.Cell>
                            <Table.Cell>{member.workstatus}</Table.Cell>
                            <Table.Cell>Kommer</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
            {value !== '' && <Button
                content='Add Course members'
                color='green'
                onClick={() => openModal(<AddCourseMembers courseId={value}
                                                           members={selectedCourse && selectedCourse!.members}/>)}
            />}
        </Fragment>

    );
}

export default observer(CoursesController);