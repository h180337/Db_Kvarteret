import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {Redirect, Route, RouteComponentProps, RouteProps} from 'react-router-dom';
import {RootStoreContext} from '../stores/rootStore';

interface IProps extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>>
}

const MyProfilePrivateRoute: React.FC<IProps> = ({component: Component, ...rest}) => {
    const rootStore = useContext(RootStoreContext);
    const {isLoggedIn, user, LogiedInuser} = rootStore.userStore;
    const ProfileAccess = LogiedInuser!.roles[0].name === 'Bruker' ? <Route
        {...rest}
        render={((props:any) => (!isLoggedIn && user!.id === LogiedInuser!.id) ? <Component {...props}/> :
            <Redirect to={'/unauth'}/>)}
    /> : <Route
        {...rest}
        render={((props:any) => (!isLoggedIn ? <Component {...props}/> : <Redirect to={'/unauth'}/>))}
    />
    return (
        ProfileAccess
    );
}

export default observer(MyProfilePrivateRoute);