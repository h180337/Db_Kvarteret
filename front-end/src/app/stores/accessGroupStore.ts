import {RootStore} from "./rootStore";
import {action, observable, runInAction} from "mobx";
import agent from "../api/agent";
import { IAccessGroup } from "../models/AccessGroups";
import {SyntheticEvent} from "react";
import {IPersonel} from "../models/personel";
import {ICourse} from "../models/Course";

export default class AccessGroupStore {

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }
    @observable loadingInitial = false;
    @observable AccessGroupRegistry = new Map();
    @observable submitting = false;
    @observable target = '';

    getAccessGroup = (id: string) =>{
        const accessGroup:IAccessGroup = this.AccessGroupRegistry.get(id);
        accessGroup.members && accessGroup.members.forEach(member => {
            this.AccessGroupRegistry.set(member.id, member)
        })
        return accessGroup
    }


    @action loadAccessGroups = async () => {
        this.loadingInitial = true;
        this.AccessGroupRegistry.clear()
        try {
            const accessGroups = await agent.AccssesRole.list();
            runInAction('loading accessRoles', () => {
                accessGroups.forEach((access:IAccessGroup) => {
                    this.AccessGroupRegistry.set(access.id, access)
                });
                this.loadingInitial = false

            })
        } catch (e) {
            runInAction('loading accessGroup error', () => {
                this.loadingInitial = false;
            })
            console.log(e);
        }
    }

    @action addAccessToUser = async (event: SyntheticEvent<HTMLButtonElement>, accessGroupId: string,
                                     userId: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        let user:IPersonel = this.rootStore.userStore.getUser(userId)
        let accessGroup:IAccessGroup = this.getAccessGroup(accessGroupId)
        try {
            await agent.AccssesRole.addAccessLevel(accessGroupId, userId);
            runInAction('added accesslevel to user', () => {
                accessGroup.members.push(user)
                user.roles.push(accessGroup)
                this.rootStore.userStore.userRegistry.set(userId, user)
                this.AccessGroupRegistry.set(accessGroupId, accessGroup)
                this.submitting = false;
                this.target = '';
            })
        } catch (e) {
            runInAction('error adding accessLevel', () => {
                this.submitting = false;
                this.target = '';
            })
        }
    }
}