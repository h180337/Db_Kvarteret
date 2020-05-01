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
                        <ProfileHeader user={user}/>
            </Segment>
            <ProfileContent  user={user}/>
        </Fragment>
    );
}

export default observer(UserProfile);