import {RootStore} from "./rootStore";
import {action, computed, observable, runInAction} from "mobx";
import agent from "../api/agent";
import {IOrganisation} from "../models/organisations";
import {history} from "../../index";
import {toast} from "react-toastify";
import {SyntheticEvent} from "react";
import {IGroup} from "../models/group";

export default class OrganisationStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }
    @observable loadingInitial = false;
    @observable organisationLoaded = false;
    @observable organiasationsRegistry = new Map();
    @observable organiasationsGroupRegistry = new Map();
    @observable organiasation: IOrganisation | null = null;
    @observable submitting = false;
    @observable target = '';


    //convert the userRegistry into a Array
    @computed get organisationsAsArray() {
        return Array.from(this.organiasationsRegistry.values());
    }
    @action loadOrganisations = async () => {
        if (this.organisationLoaded) {
            return this.organiasationsRegistry;
        } else {
            this.loadingInitial = true;
            this.organiasationsRegistry.clear();
            try {
                const organiasations = await agent.Organisation.list();
                runInAction('loading organisation', () => {
                    organiasations.forEach(organiasation => {
                        this.organiasationsRegistry.set(organiasation.id, organiasation);
                    });
                    this.loadingInitial = false
                    this.organisationLoaded = true;
                });
            } catch (e) {
                runInAction('loading organisation error', () => {
                    this.loadingInitial = false;
                });
                console.log(e)
            }
        }
    }
    //helper for loadUser
    getOrganisation = (id: string) => {
        return this.organiasationsRegistry.get(id);
    }
    
    @action loadOrg = async (id: string) => {
       
            this.loadingInitial = true;
            try {
                const organiasation = await agent.Organisation.details(id);
                runInAction('getting User', () => {
                    this.organiasation = organiasation;
                    this.organiasationsRegistry.set(organiasation.id, organiasation);
                    organiasation!.groups && this.organiasationsGroupRegistry.clear();
                    organiasation!.groups && organiasation.groups.forEach((group: IGroup) => {
                        this.organiasationsGroupRegistry.set(group.id, group);
                    })
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

    @action deleteOrganisation = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Organisation.delete(id);
            runInAction('Delete Org', () => {
                this.organiasationsRegistry.delete(id);
                this.submitting = false;
                this.target = '';
            });
        } catch (e) {
            runInAction('delete Org error', () => {
                this.submitting = false;
                this.target = '';
            });
            console.log(e)
        }
    }
    

    @action addGroupToOrganisation = async (event: SyntheticEvent<HTMLButtonElement>, 
                                            organisastonId: string, groupId: string, group: IGroup) => {
        
        this.submitting = true;
        this.target = event.currentTarget.name;
        let organisation = this.getOrganisation(organisastonId);
        try {
            await agent.Organisation.addGroup(organisastonId,groupId);
            runInAction('add group to organisation', () =>{
                this.organiasationsRegistry.set(organisastonId, organisation);
                this.organiasation = organisation;
                this.organiasationsGroupRegistry.set(group.id, group);
                this.submitting = false;
                this.target = '';
            })

        } catch (e) {
            runInAction('error adding Group', () => {
                this.submitting = false;
                this.target = '';
            });
            toast.error('error adding the Group')
        }
    }

    @action removeGroupFromOrganisation = async (event: SyntheticEvent<HTMLButtonElement>,
                                                 organisastonId: string, groupId: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name
        try {
            await agent.Organisation.removeGroup(organisastonId, groupId);
            runInAction('error removing group', () =>{
                this.organiasationsGroupRegistry.delete(groupId);
                this.submitting = false;
                this.target = '';
            })
            
        }catch (e) {
            runInAction('remove group error', () => {
                this.submitting = false;
                this.target = '';
            })
        }
    }
}