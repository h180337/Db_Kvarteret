import React from 'react';
import { IOrganisation } from '../../../app/models/organisations';
import { Segment, Item, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface IProps {
    organisation: IOrganisation
}

const OrganisationListItem: React.FC<IProps> = ({organisation}) => {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item.Content>
                        <Item.Header as='h2'>{organisation.name}</Item.Header>
                    </Item.Content>
                    <Item.Description>
                        {organisation.description}
                    </Item.Description>
                </Item.Group>
            </Segment>
            <Segment clearing>
                <Button
                    as={Link}
                    to={`/organisation/${organisation.id}`}
                    floated='right'
                    content='View'
                    color='blue'
                />
            </Segment>
        </Segment.Group>
    );
}

export default OrganisationListItem;