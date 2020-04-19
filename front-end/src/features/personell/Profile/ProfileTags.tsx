// @ts-ignore
import React, {Fragment, useContext, useEffect} from 'react';
import {Button, Label, Segment} from "semantic-ui-react";
import {RootStoreContext} from "../../../app/stores/rootStore";
import ProfileTagManager from "./ProfileTagManager";
import {observer} from "mobx-react-lite";
import { ITag } from '../../../app/models/Tag';
import LoadingComponent from "../../../app/layout/LoadingComponent";

interface IProps {
    tags: ITag [];
}

const ProfileTags: React.FC<IProps> = ({tags}) => {

    const rootStore = useContext(RootStoreContext);
    const {openModal} = rootStore.modalStore;

    return (
        <Fragment>
            <Segment>
                {tags.map((tag:ITag) => (
                    <Label size='large' key={tag.id} style={{marginTop: '4px'}}>
                        {tag.tagText}
                    </Label>
                ))}

            </Segment>
            <Button
                content='Edit tag'
                onClick={() => openModal(<ProfileTagManager/>)}
                color='green'
                floated='right'

            />
        </Fragment>

    );
}

export default observer(ProfileTags);