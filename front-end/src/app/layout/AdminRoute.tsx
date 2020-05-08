import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RouteProps, RouteComponentProps, Route, Redirect } from 'react-router-dom';
import { RootStoreContext } from '../stores/rootStore';
interface IProps extends RouteProps{
    component: React.ComponentType<RouteComponentProps<any>>
}
const AdminRoute: React.FC<IProps> = ({component: Component, ...rest}) => {
    const rootStore = useContext(RootStoreContext);
    const {isLoggedIn, LogiedInuser} = rootStore.userStore
    return (
        <Route
            {...rest}
            render={(props => (!isLoggedIn && LogiedInuser!.roles[0].name ==='Superuser') ? <Component {...props}/> : <Redirect to={'/unauth'}/>)}
        />
    );
}

export default observer(AdminRoute);