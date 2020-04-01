import UserStore from './userStore'
import { createContext } from 'react';
import {configure} from "mobx";
import CommonStore from './commonStore';
import ModalStore from './modalStore';
import OrganisationStore from './organisationStore'
import GroupStore from './groupStore'


configure({enforceActions: "always"})

export class RootStore {
    userStore : UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
    organiastionStore: OrganisationStore;
    groupStore: GroupStore
    
    constructor() {
        this.userStore = new UserStore(this)
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
        this.organiastionStore = new OrganisationStore(this);
        this.groupStore = new GroupStore(this);
        
    }
}

export const RootStoreContext = createContext(new RootStore());