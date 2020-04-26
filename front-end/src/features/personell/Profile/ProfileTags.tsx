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
    userId: string;
}

const ProfileTags: React.FC<IProps> = ({tags, userId}) => {

    const rootStore = useContext(RootStoreContext);
    const {openModal} = rootStore.modalStore;
    const {userTagRegistry} = rootStore.userStore
    
    
    return (
        <Fragment>
            <Segment clearing>
                {Array.from(userTagRegistry.values()).map((tag:ITag) => (
                    <Label size='large' key={tag.id} style={{marginTop: '4px'}}>
                        {tag.tagText}
                    </Label>
                ))}
                <Button
                    style={{marginTop:'3px'}}
                    content='Edit tag'
                    onClick={() => openModal(<ProfileTagManager userId={userId}/>)}
                    color='green'
                    floated='right'

                />
            </Segment>
            
        </Fragment>

    );
}

export default observer(ProfileTags);