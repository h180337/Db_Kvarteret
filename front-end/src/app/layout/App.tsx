import React, {Fragment, useEffect, useContext} from 'react';
import {Container} from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import './styles.css'
import PesonellDashBoard from "../../features/personell/dashboard/PesonellDashBoard";
import LoadingComponent from "./LoadingComponent";
import usersStore from '../stores/userStore';
import {observer} from 'mobx-react-lite'


const App = () => {

    const userStore = useContext(usersStore);
    
    useEffect(() => {
        userStore.loadUsers();
    }, [userStore]);
        
        if (userStore.loadingInitial) return <LoadingComponent content='Loading Users...' inverted={true}/>

    return (
        <Fragment>
           <NavBar/>
           <Container style={{marginTop: '7em'}}>
             <PesonellDashBoard/>
           </Container>
        </Fragment>
    )
}

export default observer(App);
