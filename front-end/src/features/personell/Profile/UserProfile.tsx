// @ts-ignore
import React, {Fragment, useContext, useEffect} from 'react';
import {Grid, Image, List, Segment, Button} from 'semantic-ui-react';
import {RouteComponentProps} from 'react-router-dom';
import usersStore from "../../../app/stores/userStore";
import LoadingComponent from '../../../app/layout/LoadingComponent';
import {Link} from 'react-router-dom'
import { observer } from 'mobx-react-lite';

interface MyProfileParamas {
    id: string;
}

const UserProfile: React.FC<RouteComponentProps<MyProfileParamas>> = ({match, history}) => {
    const userStore = useContext(usersStore);
    const {
        loadUser, 
        loadingInitial, 
        user
    } = userStore;

    useEffect(() => {
        loadUser(match.params.id);
    }, [loadUser, match.params.id]);
    
    if (loadingInitial|| !user) return <LoadingComponent inverted content='Loading user'/>
    
    return (
        <Fragment>
            <Segment clearing>
                <Button content='Delete' floated='right' color='red'/>
                <Grid>
                    <Grid.Column width={4} style={{marginTop: '20px'}}>
                        <Image src='/assets/UserProfile.jpeg' size='medium' alt='Prifile image'/>

                        <List>
                            <List.Item>
                                <List.Header>{user.fornavn} {user.etternavn}</List.Header>A lovely city
                            </List.Item>
                            <List.Item>
                                <List.Header>Chicago</List.Header>
                                Also quite a lovely city
                            </List.Item>
                            <List.Item>
                                <List.Header>Los Angeles</List.Header>
                                Sometimes can be a lovely city
                            </List.Item>
                            <List.Item>
                                <List.Header>San Francisco</List.Header>
                                What a lovely city
                            </List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={8}>

                    </Grid.Column>
                </Grid>
                <Button 
                    content='Go back' 
                    floated='right'
                    onClick={() => history.push('/users')}
                />
                <Button 
                    content='Edit' 
                    color='green' 
                    floated='right'
                    as={Link}
                    to={`/manage/${user.id}`}
                />
            </Segment>
        </Fragment>
    );
}

export default observer(UserProfile);