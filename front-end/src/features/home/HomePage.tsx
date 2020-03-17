import React from 'react';
import {Container, Segment, Button, Header, Image} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (

        <Segment inverted textAlign='center' vertical className='masthead' >
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/LogoKvarteret.png' alt='logo' style={{marginBottom: 12}}/>
                    Welcome to Kvarteret
                </Header>
                <Header as='h2' inverted content='Member Database System' />
                <Button as={Link} to='/users' size='huge' inverted>
                    Take me to the users page!
                </Button>
            </Container>
        </Segment>

    );
}

export default HomePage;