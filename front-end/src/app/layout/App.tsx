import React, {Fragment} from 'react';
import {Container} from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import './styles.css'
import {observer} from 'mobx-react-lite'
import {Route, RouteComponentProps, withRouter} from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import PesonellDashBoard from '../../features/personell/dashboard/PesonellDashBoard';
import PersonelForm from '../../features/personell/form/PersonelForm';
import UserProfile from "../../features/personell/Profile/UserProfile";


const App: React.FC<RouteComponentProps> = ({location}) => {
    
    return (
        <Fragment>
            <Route path='/' exact component={HomePage}/>
            <Route path={'/(.+)'} render={() => (
                <Fragment>
                    <NavBar/>
                    <Container style={{marginTop: '7em'}}>
                        <Route path='/users' exact component={PesonellDashBoard}/>
                        <Route path='/users/:id' exact component={UserProfile}/>
                        <Route key={location.key} path={['/createUser', '/manage/:id']} exact component={PersonelForm}/>
                    </Container>
                </Fragment>
            )}/>
        </Fragment>
    )
}

export default withRouter(observer(App));
