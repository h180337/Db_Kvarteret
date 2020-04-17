// @ts-ignore
import React, {useContext, useEffect} from 'react';
import {RootStoreContext} from "../../../app/stores/rootStore";
import {observer} from 'mobx-react-lite';
import {Button, Input, Table} from "semantic-ui-react";
import {ITag} from '../../../app/models/Tag';
import LoadingComponent from "../../../app/layout/LoadingComponent";

interface IProps {
    usersTag: ITag [];
}

const ProfileTagManager: React.FC<IProps> = ({usersTag}) => {

    const rootStore = useContext(RootStoreContext);
    const {loadTags, tagsAsArray, loadingInitial, tagRegistry} = rootStore.tagStore;

    useEffect(() => {
        loadTags();
    }, [loadTags])

    if (loadingInitial) return <LoadingComponent inverted content='Loading tags'/>

    return (
        <div>
            <h1>Tag Manager</h1>

            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Tag</Table.HeaderCell>
                        <Table.HeaderCell>Edit</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {tagsAsArray.map((tag: ITag) => (
                        <Table.Row key={tag.id}>
                            <Table.Cell>{tag.tagText}</Table.Cell>
                            <Table.Cell>
                                <Button
                                    content={tagRegistry.has(tag.id) ? 'Remove' : 'Add'}
                                    color={tagRegistry.has(tag.id) ? 'red' : 'green'}
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <div>
                <Input
                    placeholder='New Tag input'
                />
                <Button
                    color='green'
                    content='Add new Tag'
                /></div>

        </div>
    );
}

export default observer(ProfileTagManager);