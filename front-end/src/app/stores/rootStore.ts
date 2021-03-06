import UserStore from './userStore'
import { createContext } from 'react';
import {configure} from "mobx";
import CommonStore from './commonStore';
import ModalStore from './modalStore';
import OrganisationStore from './organisationStore'
import GroupStore from './groupStore'
import TagStore from './tagStore'
import CourseStore from './CourseStore'
import AccessGroupStore from './accessGroupStore'



configure({enforceActions: "always"})

export class RootStore {
    userStore : UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
    organiastionStore: OrganisationStore;
    groupStore: GroupStore;
    tagStore: TagStore;
    courseStore: CourseStore;
    accessGroupStore: AccessGroupStore
    
    constructor() {
        this.userStore = new UserStore(this)
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
        this.organiastionStore = new OrganisationStore(this);
        this.groupStore = new GroupStore(this);
        this.tagStore = new TagStore(this);
        this.courseStore = new CourseStore(this);
        this.accessGroupStore = new AccessGroupStore(this);


    }
}

export const RootStoreContext = createContext(new RootStore());