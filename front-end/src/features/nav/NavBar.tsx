import React from 'react';
import {Menu, Container, Button} from 'semantic-ui-react';

const NavBar = () => {
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header>
                    <img src='/assets/LogoKvarteret.png' alt='Logo' style={{marginRight:'10px'}}/>
                    Db Kvarteret
                </Menu.Item>
            <Menu.Item
                name='Users'
            />
            <Menu.Item
                name='Organisations'
            />
                <Menu.Item>
                    <Button positive content='Create user'/>
                </Menu.Item>
                <Menu.Item>
                    <Button positive content='Create Orgranisation'/>
                </Menu.Item>
                <Menu.Item>
                    <Button positive content='Create Groupe'/>
                </Menu.Item>
            </Container>
        </Menu>
    );
}

export default NavBar;