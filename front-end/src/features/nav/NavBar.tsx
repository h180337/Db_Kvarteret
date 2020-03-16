import React from 'react';
import {Button, Container, Menu} from 'semantic-ui-react';
import {observer} from 'mobx-react-lite';
import {NavLink} from 'react-router-dom';


const NavBar: React.FC = () => {
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header as={NavLink} to='/' exact>
                    <img src='/assets/LogoKvarteret.png' alt='Logo' style={{marginRight: '10px'}}/>
                    Db Kvarteret
                </Menu.Item>
                <Menu.Item
                    as={NavLink}
                    to='/users'
                    name='Users'
                />
            <Menu.Item
                name='Organisations'
            />
                <Menu.Item>
                    <Button
                        positive content='Create user'
                        as={NavLink}
                        to='/createUser'
                    />
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

export default observer(NavBar);