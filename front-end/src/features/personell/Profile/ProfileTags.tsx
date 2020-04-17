// @ts-ignore
import React, {Fragment, useContext, useEffect} from 'react';
import {Button, Label, Segment} from "semantic-ui-react";
import {RootStoreContext} from "../../../app/stores/rootStore";
import ProfileTagManager from "./ProfileTagManager";
import {observer} from "mobx-react-lite";
import { ITag } from '../../../app/models/Tag';
import LoadingComponent from "../../../app/layout/LoadingComponent";

const ProfileTags = () => {

    const rootStore = useContext(RootStoreContext);
    const {tagsAsArray, loadTags, loadingInitial} = rootStore.tagStore
    const {openModal} = rootStore.modalStore;

    useEffect(() =>{
        loadTags();
    }, [loadTags])

    if (loadingInitial) return <LoadingComponent inverted content='Loading tags'/>

    return (
        <Fragment>
            <Segment>
                {tagsAsArray.map((tag:ITag) => (
                    <Label size='large' key={tag.id} style={{marginTop: '4px'}}>
                        {tag.tagText}
                    </Label>
                ))}

            </Segment>
            <Button
                content='Edit tag'
                onClick={() => openModal(<ProfileTagManager usersTag={tagsAsArray}/>)}
                color='green'
                floated='right'

            />
        </Fragment>

    );
}

export default observer(ProfileTags);