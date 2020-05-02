// @ts-ignore
import React from 'react';
import {Button, Table} from "semantic-ui-react";
import {Link} from "react-router-dom";

interface IProps {
    groups: any[];
}

const ProfileGroups: React.FC<IProps> = ({groups}) => {
    return (
        <Table singleLine>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Group name</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>View</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {groups && groups.map(group => (
                    <Table.Row key={group.id}>
                        <Table.Cell>{group.navn}</Table.Cell>
                        <Table.Cell>{group.beskrivelse}</Table.Cell>
                        <Table.Cell>
                            <Button
                                content='View'
                                color='blue'
                                as={Link}
                                to={`/group/${group.id}`}
                            />
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}

export default ProfileGroups;