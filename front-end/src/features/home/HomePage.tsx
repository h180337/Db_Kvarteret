import React, {Fragment, useContext} from 'react';
import {Button, Container, Header, Image, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {RootStoreContext} from '../../app/stores/rootStore';
import LoginForm from '../personell/form/LoginForm';

const HomePage = () => {

    const rootStore = useContext(RootStoreContext);

    const {isLoggedIn, LogiedInuser} = rootStore.userStore
    const {openModal} = rootStore.modalStore


    return (

        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/LogoKvarteret.png' alt='logo' style={{marginBottom: 12}}/>
                    Welcome to Kvarteret
                </Header>
                {isLoggedIn && LogiedInuser ? (
                    <Fragment>
                        <Header as='h2' inverted content={`Welcome back ${LogiedInuser.userName}`}/>
                        <Button as={Link} to='/users' size='huge' inverted>
                            Go to users
                        </Button>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Header as='h2' inverted content='Members database'/>
                        <Button onClick={() =>openModal(<LoginForm/>)} inverted>
                            Login
                        </Button>
                    </Fragment>)}
            </Container>
        </Segment>

    );
}

export default HomePage;