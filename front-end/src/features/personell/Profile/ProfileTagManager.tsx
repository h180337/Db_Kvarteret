// @ts-ignore
import React, {useContext, useEffect, useState} from 'react';
import {RootStoreContext} from "../../../app/stores/rootStore";
import {observer} from 'mobx-react-lite';
import {Button, Input, Table, Label, Icon} from "semantic-ui-react";
import {ITag} from '../../../app/models/Tag';
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {v4 as uuid} from 'uuid';
import TagSearch from '../../../app/common/searchFilter/TagSearch';

interface IProps {
    userId: string
}

const ProfileTagManager: React.FC<IProps> = ({userId}) => {

    const rootStore = useContext(RootStoreContext);
    const {loadTags, tagsAsArray, loadingInitial, tagRegistry, createTag, filteredData} = rootStore.tagStore;
    const {userTagRegistry, addTagToUser, removeTag, submitting, target} = rootStore.userStore
    const [input, setInput] = useState('')

    useEffect(() => {
        loadTags();
    }, [loadTags])

    if (loadingInitial) return <LoadingComponent inverted content='Loading tags'/>

    const getInputValue = (e: any) => {
        setInput(e.target.value); 
    }
    
    const onclickHandler = () =>{
        createTag({id: uuid(), tagText: input});
        setInput('');
    }

    let data: Map<any,any> = filteredData.size === 0 ? tagRegistry : filteredData;

    return (
        <div>
            <h1>Tag Manager</h1>
            <TagSearch tags={tagsAsArray} filteredData={filteredData} />
            <br/>
                {Array.from(userTagRegistry.values()).map((tag:ITag) =>(
                    <Label  onClick={(e) =>
                        removeTag(tag.id, userId)} 
                            key={tag.id}
                            loading={submitting}
                            color='blue'
                            style={{cursor:'pointer', marginTop: '3px'}}
                            >{tag.tagText}
                            <Icon style={{marginLeft:'3px'}} name='cancel'/></Label>
                ))}
            
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Tag</Table.HeaderCell>
                        <Table.HeaderCell>Edit</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
            
                <Table.Body>
                    {Array.from(filteredData.values()).map((tag: ITag) => 
                        userTagRegistry.has(tag.id) ? null :
                            <Table.Row key={tag.id}>
                                <Table.Cell>{tag.tagText}</Table.Cell>
                                <Table.Cell>
                                    <Button
                                        name={tag.id}
                                        loading={target === tag.id && submitting}
                                        disabled={submitting}
                                        content='Add'
                                        color='green'
                                        onClick={(e) =>
                                            addTagToUser(e, tag.id, userId, tag)}
                                    />
                                </Table.Cell>
                            </Table.Row> 
                        )}
                </Table.Body>
            </Table>
            <div>
                <Input
                    placeholder='New Tag input'
                    onChange={(event) => getInputValue(event)}
                    value={input}
                />
                <Button
                    color='green'
                    content='Add new Tag'
                    onClick={() => onclickHandler()}
                    loading={submitting}
                /></div>

        </div>
    );
}

export default observer(ProfileTagManager);