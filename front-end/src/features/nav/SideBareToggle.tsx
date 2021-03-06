// @ts-ignore
import React, {useContext, useEffect} from 'react';
import {Sidebar, Menu, Icon} from 'semantic-ui-react'
import {NavLink, Link} from "react-router-dom";
import {RootStoreContext} from "../../app/stores/rootStore";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { observer } from 'mobx-react-lite';

interface IProps {
    show: any;
    setShow: any;
    LogiedInuser: any;
    logout: any;
}

const SideBareToggle: React.FC<IProps> = ({setShow, show}) => {
    const rootStore = useContext(RootStoreContext);
    const {LogiedInuser, logout, loadingInitial, isLoggedIn, getLogedInUser} = rootStore.userStore
   
    if (loadingInitial) return <LoadingComponent inverted/>

    const UserRole = LogiedInuser!.roles[0].name && LogiedInuser!.roles[0].name;

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
            {UserRole === 'Superuser' &&
            <Menu.Item
                as={NavLink}
                to='/users'
                name='Users'
                onClick={() => setShow(false)}
            >
                <Icon name='users'/>
                Users
            </Menu.Item>}
            {(UserRole === 'Superuser' || UserRole === 'orgAdmin') &&
            <Menu.Item name='Organisations'
                       as={NavLink}
                       to='/organisation'
                       onClick={() => setShow(false)}

            >
                <Icon name='building'/>
                Organiasations
            </Menu.Item>}
            {UserRole === 'Superuser' &&
            <Menu.Item
                as={NavLink}
                to='/createuser'
                onClick={() => setShow(false)}

            >
                <Icon name='add user'/>
                create user
            </Menu.Item>}
            {UserRole === 'Superuser' &&<Menu.Item
                as={NavLink}
                to='/createorganisation'
                onClick={() => setShow(false)}

            >
                <Icon name='building'/>
                create organiasation
            </Menu.Item>}
            {UserRole === ('Superuser' || 'OrgAdmin') &&
            <Menu.Item
                as={NavLink}
                to='/creategroup'
                onClick={() => setShow(false)}

            >
                <Icon name='group'/>
                create group
            </Menu.Item>}
            
            <Menu.Item
                as={Link}
                to={`/users/${LogiedInuser!.id}`}
                onClick={() => setShow(false)}

            >
                <Icon name='user'/>
                My profile
            </Menu.Item>
            <Menu.Item
                onClick={() => logout()}
                >
                <Icon name='power'/>
                Logout
            </Menu.Item>
        </Sidebar>
    )
    
}

export default observer(SideBareToggle);