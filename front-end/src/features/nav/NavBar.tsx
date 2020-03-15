import React, {useContext} from 'react';
import {Button, Container, Menu} from 'semantic-ui-react';
import {observer} from 'mobx-react-lite';
import usersStore from "../../app/stores/userStore";


const NavBar: React.FC = () => {
    const userStore = useContext(usersStore);
    const {openCreateFrom} = userStore
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header>
                    <img src='/assets/LogoKvarteret.png' alt='Logo' style={{marginRight: '10px'}}/>
                    Db Kvarteret
                </Menu.Item>
                <Menu.Item
                    name='Users'
                />
            <Menu.Item
                name='Organisations'
            />
                <Menu.Item>
                    <Button
                        positive content='Create user'
                        onClick={openCreateFrom}
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