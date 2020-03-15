import {observable, action} from 'mobx'
import {createContext} from 'react'
import {IPersonel} from '../models/personel'

class UserStore {
    @observable users: IPersonel[] = [];
    @observable loadingInitial = false;
    
    @action loadUsers = () => {
        this.loadingInitial = true
    }
}

export default createContext(new UserStore());