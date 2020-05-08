import React, {Fragment, useContext} from 'react';
import { Header, Button, Segment, Grid, Container } from 'semantic-ui-react';
import {Link} from "react-router-dom";
import {RootStoreContext} from "../../stores/rootStore";

const UnAuth = () => {
    const rootStore = useContext(RootStoreContext);
    const {isLoggedIn, LogiedInuser, user, UserHelper} = rootStore.userStore
    
    UserHelper();
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