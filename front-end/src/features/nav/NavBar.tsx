import React, {Fragment, useContext, useState} from 'react';
import {Button, Container, Dropdown, Header, Icon, Image, Menu, Responsive} from 'semantic-ui-react';
import {observer} from 'mobx-react-lite';
import {Link, NavLink} from 'react-router-dom';
import {RootStoreContext} from "../../app/stores/rootStore";
import SideBareToggle from "./SideBareToggle";


const NavBar: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const {LogiedInuser, logout} = rootStore.userStore
    const [show, setShow] = useState(false)

    return (
        <Fragment>
            <Menu fixed='top' inverted>
                <Responsive as={Container} minWidth={1126}>
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
                        as = {NavLink}
                        to = '/organisation'
                    />
                    <Menu.Item>
                        <Button
                            positive content='Create user'
                            as={NavLink}
                            to='/createUser'
                        />
                    </Menu.Item>
                    <Menu.Item>
                        <Button
                            positive
                            content='Create Orgranisation'
                            as={NavLink}
                            to='/createorganisation'
                        />
                    </Menu.Item>
                    <Menu.Item>
                        <Button
                            positive
                            content='Create Group'
                            as={NavLink}
                            to='/creategroup'
                        />
                    </Menu.Item>

                    {LogiedInuser &&
                    <Menu.Item position='right'>
                        <Image avatar spaced='right' src={'/assets/UserProfile.jpeg'}/>
                        <Dropdown pointing='top left' text={LogiedInuser.userName}>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to={`/users/${LogiedInuser.id}`} text='My profile'
                                               icon='user'/>
                                <Dropdown.Item onClick={logout} text='Logout' icon='power'/>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>

                    }
                </Responsive>
                <Responsive as={Container} maxWidth={1125}>
                    <Icon
                        name='bars'
                        size='huge'
                        style={{color: 'white'}}
                        onClick={() => {
                            setShow(!show)
                        }}>

                    </Icon>
                    <Header
                        content='Menu'
                        size='large'
                        style={{color: 'white', marginBottom: '3px'}}
                        onClick={() =>{setShow(!show)}}

                    />
                </Responsive>
            </Menu>
            {show &&  <SideBareToggle setShow={setShow} show={show} logout={logout} LogiedInuser={LogiedInuser}/>}
        </Fragment>
        
    );
}

export default observer(NavBar);