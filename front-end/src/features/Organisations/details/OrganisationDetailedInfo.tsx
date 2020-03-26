import React from 'react';
import { Segment, Grid, Icon } from 'semantic-ui-react';
import {IOrganisation} from "../../../app/models/organisations";

interface IProps {
    organiasation: IOrganisation;
}

const OrganisationDetailedInfo: React.FC<IProps> = ({organiasation}) => {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{organiasation.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>{'school'}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>

    );
}

export default OrganisationDetailedInfo;