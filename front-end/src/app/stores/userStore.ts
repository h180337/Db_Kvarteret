import {action, computed, configure, observable, runInAction} from 'mobx'
import {createContext, SyntheticEvent} from 'react'
import {IPersonel} from '../models/personel'
import agent from "../api/agent";


configure({enforceActions: "always"})

class UserStore {
    @observable userRegistry = new Map();
    @observable loadingInitial = false;
    @observable user: IPersonel | null = null;
    @observable submitting = false;
    @observable target = '';

    //convert the userRegistry into a Array
    @computed get usersAsArray() {
        return Array.from(this.userRegistry.values());
    }

    //Loads all the users into the userRegistry map and reformat the date props
    @action loadUsers = async () => {
        this.loadingInitial = true;
        try {
            const users = await agent.Users.list();
            runInAction('loading users', () => {
                users.forEach(user => {
                    user.opprettet = user.opprettet.split('T')[0];
                    user.fodselsdato = user.fodselsdato.split('T')[0];
                    this.userRegistry.set(user.id, user);
                });
                this.loadingInitial = false
            });
        } catch (e) {
            runInAction('loading users error', () => {
                this.loadingInitial = false;
            });
            console.log(e)
        }
    }
    
    //gets the user from the Registry if allready loaded, else goes to the api and gets the user
    @action loadUser = async (id: string) => {
        let user = this.getUser(id);
        if (user){
            this.user = user;
        }else {
            this.loadingInitial = true;
            try {
                user = await agent.Users.details(id);
                runInAction('getting User', () =>{
                    this.user = user;
                    this.loadingInitial = false;
                });
            }catch (e) {
                runInAction('getting user error', () =>{
                    this.loadingInitial = false;
                })
                console.log(e);
            }
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
        try {
            await agent.Users.create(user);
            runInAction('createUser', () => {
                this.userRegistry.set(user.id, user)
                this.submitting = false;
            });
        } catch (e) {
            runInAction('create user error', () => {
                this.submitting = false;
            });
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
        } catch (e) {
            runInAction('editUser error', () => {
                this.submitting = false;
            })
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
}

export default createContext(new UserStore());

    

