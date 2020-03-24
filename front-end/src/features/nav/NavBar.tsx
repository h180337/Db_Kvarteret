import React, {useContext} from 'react';
import {Button, Container, Dropdown, Image, Menu} from 'semantic-ui-react';
import {observer} from 'mobx-react-lite';
import {Link, NavLink} from 'react-router-dom';
import {RootStoreContext} from "../../app/stores/rootStore";


const NavBar: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const {LogiedInuser, logout} = rootStore.userStore

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

                {LogiedInuser &&
                <Menu.Item position='right'>
                    <Image avatar spaced='right' src={'/assets/UserProfile.jpeg'}/>
                    <Dropdown pointing='top left' text={LogiedInuser.userName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/users/${LogiedInuser.id}`} text='My profile' icon='user'/>
                            <Dropdown.Item onClick={logout} text='Logout' icon='power'/>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>

                }
            </Container>
        </Menu>
    );
}

export default observer(NavBar);