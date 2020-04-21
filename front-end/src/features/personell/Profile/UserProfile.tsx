// @ts-ignore
import React, {Fragment, useContext, useEffect} from 'react';
import {Button, Grid, Segment} from 'semantic-ui-react';
import {Link, RouteComponentProps} from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import {observer} from 'mobx-react-lite';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import {RootStoreContext} from "../../../app/stores/rootStore";

interface MyProfileParamas {
    id: string;
}

const UserProfile: React.FC<RouteComponentProps<MyProfileParamas>> = ({match, history}) => {
    const rootStore = useContext(RootStoreContext);
    const {
        loadUser,
        loadingInitial, 
        user,
        target,
        deleteUser,
        submitting
    } = rootStore.userStore;

    useEffect(() => {
        loadUser(match.params.id);
    }, [loadUser, match.params.id]);
    
    if (loadingInitial) return <LoadingComponent inverted content='Loading user'/>
    
    if (!user) return <h2>User not found</h2>
    
    return (
        <Fragment>
            <Segment clearing>
                    <Button
                            floated='right'
                            content='Delete'
                            color='red'
                            as={Link}
                            loading={target === user.id && submitting}
                            onClick={(event) => deleteUser(event, user.id)}
                            to={'/users'}
                        />
                        <ProfileHeader user={user}/>
            </Segment>
            <ProfileContent user={user}/>

            <Segment clearing>
                <Button.Group floated='right'>
                    <Button
                        content='Go back'
                        onClick={() => history.push('/users')}
                    />
                    <Button
                        content='Edit'
                        color='green'
                        as={Link}
                        to={`/manage/${user.id}`}
                    />
                </Button.Group>
            </Segment>
        </Fragment>
    );
}

export default observer(UserProfile);