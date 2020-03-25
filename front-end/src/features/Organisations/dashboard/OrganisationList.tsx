import React, {useContext, Fragment} from 'react';
import {observer} from 'mobx-react-lite';
import {Item} from 'semantic-ui-react';
import {RootStoreContext} from "../../../app/stores/rootStore";
import OrganisationListItem from "./OrganisationListItem";

const OrganisationList = () => {

    const rootStore = useContext(RootStoreContext);
    const {organisationsAsArray} = rootStore.organiastionStore;
    
    return (
       <Fragment>
           {organisationsAsArray.map(org =>(
               <Fragment key={org.id}>
                   <Item.Group divided>
                       <OrganisationListItem key={org.id} organisation={org}/>
                   </Item.Group>
               </Fragment>
           ))}
       </Fragment>
    );
}

export default observer(OrganisationList);