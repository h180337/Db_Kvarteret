import React from 'react';
import { Table } from 'semantic-ui-react';

interface IProps {
    courses: any [];
}

const ProfileCourses: React.FC<IProps> = ({courses}) => {
    return (
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Course name</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Date of completion</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                
                <Table.Body>
                    {courses.map( course =>(
                        <Table.Row key={course.id}>
                            <Table.Cell>{course.navn}</Table.Cell>
                            <Table.Cell>{course.beskrivelse}</Table.Cell>
                            <Table.Cell>{course.opprettet}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
    );
}

export default ProfileCourses;