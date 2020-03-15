import {action, computed, configure, observable, runInAction} from 'mobx'
import {createContext, SyntheticEvent} from 'react'
import {IPersonel} from '../models/personel'
import agent from "../api/agent";


configure({enforceActions: "always"})

class UserStore {
    @observable userRegistry = new Map();
    @observable users: IPersonel[] = [];
    @observable loadingInitial = false;
    @observable selectedUser: IPersonel | undefined = undefined;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';


    @computed get usersAsArray() {
        return Array.from(this.userRegistry.values());
    }

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

    @action createUser = async (user: IPersonel) => {
        this.submitting = true;
        try {
            await agent.Users.create(user);
            runInAction('createUser', () => {
                this.userRegistry.set(user.id, user)
                this.editMode = false;
                this.submitting = false;
            });
        } catch (e) {
            runInAction('create user error', () => {
                this.submitting = false;
            });
            console.log(e)
        }
    }

    @action editUser = async (user: IPersonel) => {
        this.submitting = true;
        try {
            await agent.Users.update(user);
            runInAction('editUser', () => {
                this.userRegistry.set(user.id, user);
                this.selectedUser = user;
                this.editMode = false;
                this.submitting = false;
            });
        } catch (e) {
            runInAction('editUser error', () => {
                this.submitting = false;
            })
            console.log(e);
        }
    }

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

    @action openEditFrom = (id: string) => {
        this.selectedUser = this.userRegistry.get(id);
        this.editMode = true;
    }

    @action cancelSelectedUser = () => {
        this.selectedUser = undefined;
    }

    @action cancelFormOpen = () => {
        this.editMode = false;
    }

    @action openCreateFrom = () => {
        this.editMode = true;
        this.selectedUser = undefined;
    }

    @action selectUser = (id: string) => {
        this.selectedUser = this.userRegistry.get(id);
        this.editMode = false;
    }
}

export default createContext(new UserStore());

    

