import {RootStore} from "./rootStore";
import {action, computed, observable, runInAction} from "mobx";
import agent from "../api/agent";
import {IOrganisation} from "../models/organisations";
import {IPersonel} from "../models/personel";
import {history} from "../../index";
import {toast} from "react-toastify";

export default class OrganisationStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }
    @observable loadingInitial = false;
    @observable organiasationsRegistry = new Map();
    @observable organiasation: IOrganisation | null = null;
    @observable submitting = false;
    
    //convert the userRegistry into a Array
    @computed get organisationsAsArray() {
        return Array.from(this.organiasationsRegistry.values());
    }
    @action loadOrganisations = async () => {
        this.loadingInitial = true;
        try {
            const organiasations = await agent.Organisation.list();
            runInAction('loading organisation', () => {
                organiasations.forEach(organiasation => {
                    this.organiasationsRegistry.set(organiasation.id, organiasation);
                });
                this.loadingInitial = false
            });
        } catch (e) {
            runInAction('loading organisation error', () => {
                this.loadingInitial = false;
            });
            console.log(e)}
    }

    //helper for loadUser
    getOrganisation = (id: string) => {
        return this.organiasationsRegistry.get(id);
    }
    
    @action loadOrg = async (id: string) => {
        let organiasation = this.getOrganisation(id);
        if (organiasation){
            this.organiasation = organiasation;
            return organiasation;
        }else {
            this.loadingInitial = true;
            try {
                organiasation = await agent.Users.details(id);
                runInAction('getting User', () =>{
                    this.organiasation = organiasation;
                    this.organiasationsRegistry.set(organiasation.id, organiasation);
                    this.loadingInitial = false;
                });
                return organiasation;
            }catch (e) {
                runInAction('getting user error', () =>{
                    this.loadingInitial = false;
                })
                console.log(e);
            }
        }
    }

    @action createOrganisation = async (org: IOrganisation) => {
        this.submitting = true;
        try {
            await agent.Organisation.create(org);
            runInAction('createOrg', () => {
                this.organiasationsRegistry.set(org.id, org)
                this.submitting = false;
            });
            history.push(`/organisation/${org.id}`)
        } catch (e) {
            runInAction('create Org error', () => {
                this.submitting = false;
            });
            toast.error('Problem submitting data')
            console.log(e)
        }
    }


    @action editOrganisation = async (org: IOrganisation) => {
        this.submitting = true;
        try {
            await agent.Organisation.update(org);
            runInAction('editOrg', () => {
                this.organiasationsRegistry.set(org.id, org);
                this.organiasation = org;
                this.submitting = false;
            });
            history.push(`/organisation/${org.id}`)
        } catch (e) {
            runInAction('editorganisation error', () => {
                this.submitting = false;
            })
            toast.error('Problem submitting data')
            console.log(e);
        }
    }
}