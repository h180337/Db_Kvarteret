import React from 'react';
import {Grid, Icon, Segment} from "semantic-ui-react";
import {IGroup} from '../../../app/models/group';
import { observer } from 'mobx-react-lite';

interface IProps {
    group: IGroup
}


const GroupDetailedInfo: React.FC<IProps> = ({group}) => {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{group.beskrivelse}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name={group.aktiv == 'activ' ? 'toggle on' : 'toggle off'} size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        {group.aktiv == 'activ' ? "Active" : "Inactive"}
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='calendar'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>active semester: Spring 2020 </p>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>

    );
}

export default observer(GroupDetailedInfo);