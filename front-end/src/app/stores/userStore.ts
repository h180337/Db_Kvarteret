import {action, computed, observable, runInAction} from 'mobx'
import {SyntheticEvent} from 'react'
import {IPersonel, IPersonFormValues} from '../models/personel'
import agent from "../api/agent";
import {history} from '../..'
import {toast} from 'react-toastify';
import {RootStore} from './rootStore'
import {ITag} from '../models/Tag';
import { IPhoto } from '../models/Photo';


export default class UserStore {
    
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }
    
    @observable userRegistry = new Map();
    @observable loading = false;
    @observable loadingInitial = false;
    @observable uploadingPhoto = false;
    @observable filteredData = new Map();
    @observable userTagRegistry = new Map();
    @observable user: IPersonel | null = null;
    @observable LogiedInuser: IPersonel | null = null;
    @observable submitting = false;
    @observable target = '';
    
    @computed get isLoggedIn() {return !this.user}
    
    @action login = async (values:IPersonFormValues) => {
        try {
            
            const user = await agent.Users.login(values);
            runInAction(() =>{
                this.LogiedInuser = user;
            })
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
            history.push(`/users/${this.LogiedInuser!.id}`)
            
        }catch (e) {
            throw e.response;
        }
}

    @action getLogedInUser = async () =>{
        try {
            const user = await agent.Users.currentUser();
            runInAction(() =>{
                this.LogiedInuser = user;
            })
        } catch (e) {
            console.log(e);
        }
    }
    
    @action logout = () =>{
        this.rootStore.commonStore.setToken(null);
        this.LogiedInuser = null;
        history.push('/')
    }

    //convert the userRegistry into a Array
    @computed get usersAsArray() {
        return Array.from(this.userRegistry.values());
    }

    @computed get filteredUsersAsArray() {
        return Array.from(this.filteredData.values());
    }

    //Loads all the users into the userRegistry map and reformat the date props
    @action loadUsers = async () => {
            this.loadingInitial = true;
            this.userRegistry.clear();
            this.filteredData.clear();
            try {
                const users = await agent.Users.list();
                runInAction('loading users', () => {
                    users.forEach(user => {
                        user.created = user.created.split('T')[0];
                        user.dateOfBirth = new Date(user.dateOfBirth!);
                        this.userRegistry.set(user.id, user);
                    });
                    this.loadingInitial = false
                });
            } catch (e) {
                runInAction('loading users error', () => {
                    this.loadingInitial = false;
                });
                console.log(e)}
    }
    
    //gets the user from the Registry if allready loaded, else goes to the api and gets the user
    @action loadUser = async (id: string) => {
        this.loadingInitial = true;
        this.userTagRegistry.clear()
            try {
                let user = await agent.Users.details(id);
                runInAction('getting User', () => {
                    user.dateOfBirth = new Date(user.dateOfBirth!.split('T')[0]);
                    this.user = user;
                    this.userRegistry.set(user.id, user);
                   [...this.user!.tags].forEach((tag: ITag) => {
                        this.userTagRegistry.set(tag.id, tag);
                    })
                    this.loadingInitial = false;
                });
                return user;
            }catch (e) {
                runInAction('getting user error', () =>{
                    this.loadingInitial = false;
                })
                console.log(e);
            }
    }
    //helper for loadUser
    getUser = (id: string) =>{
        return this.userRegistry.get(id);
    }
    
    @action clearUser =() =>{
        this.user = null;
    }

    //submits a new user to the Db by calling the API
    @action createUser = async (user: IPersonel) => {
        this.submitting = true;
        this.user = user;
        try {
            await agent.Users.create(user);
            runInAction('createUser', () => {
                this.userRegistry.set(user.id, user)
                this.submitting = false;
            });
            history.push(`/users`)
        } catch (e) {
            runInAction('create user error', () => {
                this.submitting = false;
            });
            toast.error('Problem submitting data')
            console.log(e)
        }
    }

    //submits changes to a user by calling the API
    @action editUser = async (user: IPersonel) => {
        this.submitting = true;
        try {
            await agent.Users.update(user);
            runInAction('editUser', () => {
                this.userRegistry.set(user.id, user);
                this.user = user;
                this.submitting = false;
            });
            history.push(`/users/${user.id}`)
        } catch (e) {
            runInAction('editUser error', () => {
                this.submitting = false;
            })
            toast.error('Problem submitting data')
            console.log(e);
        }
    }
    
    // call to the API for Removing a User
    @action deleteUser = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Users.delete(id);
            runInAction('Delete user', () => {
                this.userRegistry.delete(id);
                this.submitting = false;
                this.target = '';
            });
        } catch (e) {
            runInAction('delete user error', () => {
                this.submitting = false;
                this.target = '';
            });
            console.log(e)
        }
    }

    @action addTagToUser = async (event: SyntheticEvent<HTMLButtonElement>, tagId: string,
                                  userId: string, tag: ITag) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Tags.addTag(tagId, userId);
            runInAction('add Tag to user', () => {
                this.userTagRegistry.set(tagId, tag);
                this.submitting = false;
                this.target = '';
            })
        } catch (e) {
            runInAction('error adding tag', () => {
                this.submitting = false;
                this.target = '';
            })
        }
    }

    @action removeTag = async (event: SyntheticEvent<HTMLButtonElement>, tagId: string, userId: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Tags.removeTag(tagId, userId);
            runInAction('remove Tag', () => {
                this.userTagRegistry.delete(tagId);
                this.submitting = false;
                this.target = '';
            })
        } catch (e) {
            runInAction('error removing tag', () => {
                this.submitting = false;
                this.target = '';
            });
            toast.error('error removing the tag')
        }
    }
    
    @action uploadPhoto = async (file: Blob) =>{
        this.uploadingPhoto = true;
      
        try {
            await agent.Users.deletePhoto(this.user!.profilePhoto!.id)
            const photo = await agent.Users.uploadPhoto(file);
            runInAction(()=>{
                if (this.user){
                    this.user.profilePhoto = photo;
                }
                this.userRegistry.set(this.user!.id, this.user);
                this.uploadingPhoto = false;
            })
        }catch (e) {
            console.log(e)
            toast.error('Problem uploading photo')
            runInAction(() =>{
                this.uploadingPhoto = false;
            })
        }
    }
    
    @action deletePhoto = async (photo: IPhoto) => {
        this.loading = true;
        try {
            await agent.Users.deletePhoto(photo.id);
            runInAction(() => {
                this.user!.profilePhoto = null;
                this.loading = false;
            })
            
        }catch (e) {
            console.log(e);
            runInAction(() =>{
                this.loading = false;
            })
        }
    }
}


    

