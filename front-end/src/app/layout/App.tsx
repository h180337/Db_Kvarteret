import React, {Fragment, useContext, useEffect} from 'react';
import {Container} from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import './styles.css'
import {observer} from 'mobx-react-lite'
import {Route, RouteComponentProps, Switch, withRouter} from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import PesonellDashBoard from '../../features/personell/dashboard/PesonellDashBoard';
import PersonelForm from '../../features/personell/form/PersonelForm';
import UserProfile from "../../features/personell/Profile/UserProfile";
import NotFound from './NotFound';
import {ToastContainer} from 'react-toastify';
import LoginForm from '../../features/personell/form/LoginForm';
import {RootStoreContext} from "../stores/rootStore";
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import OrganisationDashBoard from "../../features/Organisations/dashboard/OrganisationDashBoard";
import OrganisationDetails from "../../features/Organisations/details/OrganisationDetails";
import OrganisationForm from '../../features/Organisations/form/OrganisationForm';
import GroupDetails from "../../features/Group/details/GroupDetails";
import GroupForm from '../../features/Group/form/GroupForm';
import AdminCtrl from '../../features/adminCtrl/AdminCtrl';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import MyProfilePrivateRoute from './MyProfilePrivateRoute';
import UnAuth from '../common/Auth/UnAuth';

const App: React.FC<RouteComponentProps> = ({location}) => {

    const rootStore = useContext(RootStoreContext);
    const {setAppLoaded, token, appLoaded} = rootStore.commonStore;
    const {getLogedInUser, LogiedInuser, UserHelper} = rootStore.userStore
    
    useEffect( () =>{
        if (token){
            getLogedInUser().finally(() => setAppLoaded())
        } else {
            setAppLoaded()
        }
    }, [getLogedInUser, setAppLoaded, token])
    
    if (!appLoaded) return <LoadingComponent content='Loading app...' inverted/>
    
    return (
        <Fragment>
            <ModalContainer/>
            <ToastContainer position={"bottom-right"}/>
            <Route path='/' exact component={HomePage}/>
            <Route path={'/(.+)'} render={() => (
                <Fragment>
                    {LogiedInuser && <NavBar/>}
                    <Container style={{marginTop: '7em'}}>
                        <Switch>
                            <AdminRoute path='/admincontroller' exact component={AdminCtrl}/>
                            <AdminRoute path='/users' exact component={PesonellDashBoard}/>
                            <MyProfilePrivateRoute path='/users/:id' exact component={UserProfile}/>
                            <PrivateRoute path='/group/:id' exact component={GroupDetails}/>
                            <AdminRoute path='/organisation' exact component={OrganisationDashBoard}/>
                            <AdminRoute path='/organisation/:id' exact component={OrganisationDetails}/>
                            <AdminRoute key={location.key} path={['/creategroup', '/managegroup/:id']} exact
                                   component={GroupForm}/>
                            <AdminRoute key={location.key} path={['/createorganisation', '/manageorganisation/:id']} exact
                                   component={OrganisationForm}/>
                                   
                             {/*need to fix this route access*/}
                            <PrivateRoute key={location.key} path={['/createUser', '/manage/:id']} exact
                                   component={PersonelForm}/>
                            <Route path='/login' component={LoginForm}/>
                            <PrivateRoute path='/unauth' component={UnAuth}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </Container>
                </Fragment>
            )}/>
        </Fragment>
    )
}

export default withRouter(observer(App));
