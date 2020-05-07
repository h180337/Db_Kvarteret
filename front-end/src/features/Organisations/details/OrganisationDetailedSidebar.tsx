import React, {Fragment, useContext} from 'react';
import { Segment, List, Item, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IPersonel } from '../../../app/models/personel';
import AddAdmin from "../../Group/form/AddAdmin";
import {RootStoreContext} from "../../../app/stores/rootStore";
import EditOrgAdmin from '../form/EditOrgAdmin';
import { observer } from 'mobx-react-lite';

interface IProps {
    admins: IPersonel [];
    orgId: string
}

const OrganisationDetailedSidebar: React.FC<IProps> = ({admins, orgId}) => {
    const rootStore = useContext(RootStoreContext);
    const {openModal} = rootStore.modalStore
    const {organiasationsAdminRegistry} = rootStore.organiastionStore
    return (
        <Fragment>
            <Segment.Group>
                <Segment
                    textAlign='center'
                    style={{ border: 'none' }}
                    attached='top'
                    secondary
                    inverted
                    color='teal'
                >
                    Admins
                </Segment>
                <Segment attached clearing>
                    <List relaxed divided>
                        {Array.from(organiasationsAdminRegistry.values()).map((admin:IPersonel) => (
                            <Item key={admin.id} style={{ position: 'relative' }}>
                                <Item.Content verticalAlign='middle'>
                                    <Item.Header as='h3'>
                                        <Link to={`/users/${admin.id}`}>{`${admin.fornavn} ${admin.etternavn}`}</Link>
                                    </Item.Header>
                                </Item.Content>
                            </Item>
                        ))}
                    </List>
                </Segment>
                <Segment clearing>
                    <Button.Group floated='right'>
                        <Button
                            color='blue'
                            content='Manage admins'
                            onClick={() =>openModal(<EditOrgAdmin orgId={orgId} admins={admins}/>)}

                        />
                    </Button.Group>
                </Segment>
            </Segment.Group>
        </Fragment>

    );
}

export default observer(OrganisationDetailedSidebar);