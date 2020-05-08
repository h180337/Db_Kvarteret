import React, {useContext, useEffect} from 'react';
import {Button, Container, Header, Segment} from 'semantic-ui-react';
import {Link, Route} from "react-router-dom";
import {RootStoreContext} from "../../stores/rootStore";
import LoginForm from "../../../features/personell/form/LoginForm";
import PrivateRoute from '../../layout/PrivateRoute';

const UnAuth = () => {
    const rootStore = useContext(RootStoreContext);
    const {isLoggedIn, LogiedInuser, user, UserHelper} = rootStore.userStore

    useEffect(() => {
        UserHelper();
    }, [UserHelper])
   

    return (
        <Segment>
            <Container textAlign='center'>
                <Header color='red' size='huge' textAlign='center'>Unauthorized</Header>
                <br/>
                <Button as={Link} to={`/users/${LogiedInuser!.id}`} size='huge' color='blue' content='My profile'/>
            </Container>
             
            
        </Segment>
       
    );
}

export default UnAuth;