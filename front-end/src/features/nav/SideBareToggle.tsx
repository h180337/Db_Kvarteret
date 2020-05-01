// @ts-ignore
import React from 'react';
import {Sidebar, Menu, Icon} from 'semantic-ui-react'
import {NavLink, Link} from "react-router-dom";

interface IProps {
    show: any;
    setShow: any;
    LogiedInuser: any;
    logout: any;
}

const SideBareToggle: React.FC<IProps> = ({setShow, show, LogiedInuser, logout}) => {

    return (
        <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            onHide={() => setShow(false)}
            vertical
            visible={show}
            width='thin'
        >
            <Menu.Item header as={NavLink} to='/' exact
                       onClick={() => setShow(false)}

            >
                <Icon name='home'/>
                Home
            </Menu.Item>
            <Menu.Item
                as={NavLink}
                to='/users'
                name='Users'
                onClick={() => setShow(false)}
            >
                <Icon name='users'/>
                Users
            </Menu.Item>
            <Menu.Item name='Organisations'
                       as={NavLink}
                       to='/organisation'
                       onClick={() => setShow(false)}

            >
                <Icon name='building'/>
                Organiasations
            </Menu.Item>
            <Menu.Item
                as={NavLink}
                to='/createuser'
                onClick={() => setShow(false)}

            >
                <Icon name='add user'/>
                create user
            </Menu.Item>
            <Menu.Item
                as={NavLink}
                to='/createorganisation'
                onClick={() => setShow(false)}

            >
                <Icon name='building'/>
                create organiasation
            </Menu.Item>
            <Menu.Item
                as={NavLink}
                to='/creategroup'
                onClick={() => setShow(false)}

            >
                <Icon name='group'/>
                create group
            </Menu.Item>
            <Menu.Item
                as={Link}
                to={`/users/${LogiedInuser.id}`}
                onClick={() => setShow(false)}

            >
                <Icon name='user'/>
                My profile
            </Menu.Item>
            <Menu.Item
                onClick={() => logout()}
                >
                <Icon name='user'/>
                Logout
            </Menu.Item>
        </Sidebar>
    )
    // @ts-ignore
   // return ReactDOM.createPortal(test, document.getElementById('drawer-hook'));
}

export default SideBareToggle;