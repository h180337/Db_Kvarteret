import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {Redirect, Route, RouteComponentProps, RouteProps} from 'react-router-dom';
import {RootStoreContext} from '../stores/rootStore';
import LoadingComponent from "./LoadingComponent";

interface IProps extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>>
}

const MyProfilePrivateRoute: React.FC<IProps> = ({component: Component, ...rest}) => {
    const rootStore = useContext(RootStoreContext);
    const {isLoggedIn, user, LogiedInuser, loadUser, loadingInitial} = rootStore.userStore;
    
    useEffect(()=>{
        loadUser(LogiedInuser!.id)
    }, [loadUser])

    if (loadingInitial) return <LoadingComponent content='Loading user...' inverted/>
    const ProfileAccess = !isLoggedIn && LogiedInuser!.roles && LogiedInuser!.roles[0].name === 'Bruker' ? <Route
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