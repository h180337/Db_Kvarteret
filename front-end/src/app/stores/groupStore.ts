import {RootStore} from "./rootStore";
import {action, observable, runInAction} from "mobx";
import { IGroup } from "../models/group";
import agent from "../api/agent";

export default class GroupStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }


    @observable loadingInitial = false;
    @observable groupRegistry = new Map();
    @observable group: IGroup | null = null;
    @observable submitting = false;
    @observable target = '';


    getGroup = (id: string) => {
        return this.groupRegistry.get(id);
    }

    @action loadGroup = async (id: string) => {
        let group = this.getGroup(id);
        if (group){
            this.group = group;
            return group;
        }else {
            this.loadingInitial = true;
            try {
                group = await agent.Groups.details(id);
                runInAction('getting group', () =>{
                    this.group = group;
                    this.groupRegistry.set(group.id, group);
                    this.loadingInitial = false;
                });
                return group;
            }catch (e) {
                runInAction('getting group error', () =>{
                    this.loadingInitial = false;
                })
                console.log(e);
            }
        }
    }
}