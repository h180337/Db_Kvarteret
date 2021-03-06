import {RootStore} from "./rootStore";
import {action, computed, observable, runInAction} from "mobx";
import {IGroup} from "../models/group";
import agent from "../api/agent";
import {history} from "../../index";
import {toast} from "react-toastify";
import {SyntheticEvent} from "react";
import {IPersonel} from "../models/personel";

export default class GroupStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }


    @observable loadingInitial = false;
    @observable uploadingPhoto = false;
    @observable groupRegistry = new Map();
    @observable groupMembersRegistry = new Map();
    @observable filteredData = new Map();
    @observable group: IGroup | null = null;
    @observable submitting = false;
    @observable target = '';

    getGroup = (id: string) => {
        return this.groupRegistry.get(id);
    }

    @computed get groupMembersAsArray() {
        return Array.from(this.groupMembersRegistry.values());
    }

    @computed get groupsAsArray() {
        return Array.from(this.groupRegistry.values());
    }
    @action loadgroups = async () => {
        this.loadingInitial = true;
        try {
            const groups = await agent.Groups.list();
            runInAction('loading groups', () => {
                groups.forEach(groups => {
                    this.groupRegistry.set(groups.id, groups);
                });
                this.loadingInitial = false
            });
        } catch (e) {
            runInAction('loading groups error', () => {
                this.loadingInitial = false;
            });
            console.log(e)}
    }

    @action loadGroup = async (id: string) => {
            this.loadingInitial = true;
            try {
                let group = await agent.Groups.details(id);
                runInAction('getting group', () => {
                    this.group = group;
                    this.groupMembersRegistry.clear();
                    this.group!.members && [...this.group!.members].forEach(member => {
                        this.groupMembersRegistry.set(member.id, member);
                    })
                    this.loadingInitial = false;
                });
                return group;
            } catch (e) {
                runInAction('getting group error', () => {
                    this.loadingInitial = false;
                })
                console.log(e);
            }
        
    }

    @action createGroup = async (group: IGroup) => {
        this.submitting = true;
        this.groupMembersRegistry.clear();
        try {
            await agent.Groups.create(group);
            runInAction('create Group', () => {
                this.group = group;
                this.groupRegistry.set(group.id, group)
                this.groupMembersRegistry.set(this.rootStore.userStore.LogiedInuser!.id,this.rootStore.userStore.LogiedInuser)
                this.submitting = false;
            });
            history.push(`/group/${group.id}`)
        } catch (e) {
            runInAction('create group error', () => {
                this.submitting = false;
            });
            toast.error('Problem submitting data')
            console.log(e)
        }
    }


    @action addMemberToGroup = async (event: SyntheticEvent<HTMLButtonElement>, groupId: string, userId: string, user: IPersonel) => {
        this.submitting = true;
        let group = this.getGroup(groupId)
        this.target = event.currentTarget.name;
        try {
            await agent.Groups.addUser(groupId, userId);
            runInAction('add group member', () => {
                this.groupRegistry.set(groupId, group);
                this.group = group;
                this.groupMembersRegistry.set(user.id, user)
                this.submitting = false;
                this.target = '';

            })
        } catch (e) {
            runInAction('add member error', () => {
                this.submitting = false;
                this.target = '';
            })
            toast.error('The user is allready a member of this group')

        }
    }

    @action removeGroupMember = async (event: SyntheticEvent<HTMLButtonElement>, groupId: string, userId: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Groups.removeUser(groupId, userId);
            runInAction('remove member', () => {
                this.groupMembersRegistry.delete(userId);
                this.submitting = false;
                this.target = '';
            })
        } catch (e) {
            runInAction('error removing user', () => {
                this.submitting = false;
                this.target = '';
            });
            toast.error('error removing the user')
        }
    }

    @action editAdmin = async (event: SyntheticEvent<HTMLButtonElement>,groupId: string, userId: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;

        try {
            await agent.Groups.editAdmin(groupId, userId);
            runInAction('edit admin', () => {
                let user: any = this.groupMembersRegistry.get(userId);
                user.isAdmin = !user.isAdmin;
                this.groupMembersRegistry.set(userId, user);
                this.submitting = false;
                this.target = '';

            });
        } catch (e) {
            runInAction('error edit admin', () => {
                this.submitting = false;
                this.target = '';
            });
        }
    }

    @action editGroup = async (group: IGroup) => {
        this.submitting = true;
        try {
            await agent.Groups.update(group);
            runInAction('edit group', () => {
                this.groupRegistry.set(group.id, group);
                this.group = group;
                this.submitting = false;
            });
            history.push(`/group/${group.id}`)
        } catch (e) {
            runInAction('edit group error', () => {
                this.submitting = false;
            })
            toast.error('Problem submitting data')
            console.log(e);
        }
    }
    @action deleteGroup = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        console.log(this.target)
        try {
            await agent.Groups.delete(id);
            runInAction('Delete group', () => {
                this.groupRegistry.delete(id);
                this.submitting = false;
                this.target = '';
            });
        } catch (e) {
            runInAction('delete group error', () => {
                this.submitting = false;
                this.target = '';
            });
            console.log(e)
        }
    }
    @action uploadPhoto = async (groupId: string, file: Blob) =>{
        this.uploadingPhoto = true;
        try {
            const photo = await agent.Groups.uploadGroupPhoto(groupId, file);
            runInAction(() => {
                if (this.group) {
                    this.group.groupPhoto = photo
                }
                this.groupRegistry.set(this.group!.id, this.group);
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