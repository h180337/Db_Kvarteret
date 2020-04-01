import React, {useContext} from 'react';
import {Button, Header, Image, Item, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {RootStoreContext} from "../../../app/stores/rootStore";
import { observer } from 'mobx-react-lite';


interface IProps {
    id: string;
}

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

const GroupDetailedHeader: React.FC<IProps> = ({id}) => {
    const rootStore = useContext(RootStoreContext);
    const {
        group,
        submitting,
        target,

    } = rootStore.groupStore;
    
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/GroupImage.png`} fluid style={activityImageStyle}/>
                <Segment basic style={activityImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={group!.navn}
                                    style={{color: 'white'}}
                                />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button
                    floated='left'
                    content='Add new members'
                    color='green'
                   
                />
                <Button
                    floated='right'
                    content='Delete'
                    color='red'
                    
                    loading={target === group!.id && submitting}
                    //onClick={(event => {deleteOrganisation(event, id)})}
                    
                />
                <Button
                    floated='right'
                    content='Edit'
                    color='orange'
                   
                />
            </Segment>
        </Segment.Group>
    )
}

export default observer(GroupDetailedHeader);