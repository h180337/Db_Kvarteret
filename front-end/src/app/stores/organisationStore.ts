import {RootStore} from "./rootStore";
import {action, computed, observable, runInAction} from "mobx";
import agent from "../api/agent";
import {IOrganisation} from "../models/organisations";
import {history} from "../../index";
import {toast} from "react-toastify";
import {SyntheticEvent} from "react";
import {IGroup} from "../models/group";
import { IPersonel } from "../models/personel";

export default class OrganisationStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }
    @observable loadingInitial = false;
    @observable organisationLoaded = false;
    @observable uploadingPhoto = false;
    @observable organiasationsRegistry = new Map();
    @observable organiasationsAdminRegistry = new Map();
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
                const organiasation:IOrganisation = await agent.Organisation.details(id);
                runInAction('getting User', () => {
                    this.organiasation = organiasation;
                    this.organiasationsRegistry.set(organiasation.id, organiasation);
                    organiasation!.groups && this.organiasationsGroupRegistry.clear();
                    organiasation!.groups && organiasation.groups.forEach((group: IGroup) => {
                        group.aktiv_til_og_med= group.aktiv_til_og_med.split('T')[0];
                        this.organiasationsGroupRegistry.set(group.id, group);
                    })
                    this.organiasationsAdminRegistry && this.organiasationsAdminRegistry.clear();
                    organiasation!.admins && organiasation.admins.forEach((admin: IPersonel) => {
                        this.organiasationsAdminRegistry.set(admin.id, admin);
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
    @action addAdminToOrganisation = async (event: SyntheticEvent<HTMLButtonElement>,
                                            organisastonId: string, userId: string) => {

        this.submitting = true;
        this.target = event.currentTarget.name;
        let organisation:IOrganisation = this.getOrganisation(organisastonId);
        let user:IPersonel = this.rootStore.userStore.getUser(userId);
        try {
            await agent.Organisation.addAdmin(organisastonId,userId);
            runInAction('add Admin to organisation', () =>{
                user.organisationAdmin.push(organisation);
                this.rootStore.userStore.userRegistry.set(userId, user);
                organisation.admins.push(this.rootStore.userStore.getUser(userId));
                this.organiasationsAdminRegistry.set(userId, user);
                this.organiasation = organisation;
                this.submitting = false;
                this.target = '';
            })

        } catch (e) {
            runInAction('error adding user', () => {
                this.submitting = false;
                this.target = '';
            });
            toast.error('error adding the user')
        }
    }

    @action removeAdmin = async (event: SyntheticEvent<HTMLButtonElement>, orgId: string, userId: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Organisation.removeAdmin(orgId, userId);
            runInAction('remove admin', () => {
                this.organiasationsAdminRegistry.delete(userId)
                this.submitting = false;
                this.target = '';
            });
        } catch (e) {
            runInAction('remove admin error', () => {
                this.submitting = false;
                this.target = '';
            });
            console.log(e)
        }
    }
    @action uploadPhoto = async (orgId: string, file: Blob) =>{
        this.uploadingPhoto = true;
        try {
            const photo = await agent.Organisation.uploadOrgPhoto(orgId, file);
            runInAction(() => {
                if (this.organiasation) {
                    this.organiasation.organisationPhoto = photo
                }
                this.organiasationsRegistry.set(this.organiasation!.id, this.organiasation);
                this.uploadingPhoto = false;
            })
        }catch (e) {
            toast.error('Problem uploading photo')
            runInAction(() =>{
                this.uploadingPhoto = false;
            })
        }
    }
}