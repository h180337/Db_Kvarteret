import axios, {AxiosResponse} from 'axios';
import {IPersonel, IPersonFormValues} from '../models/personel'
import {IGroup} from '../models/group'
import {IOrganisation} from '../models/organisations'
import {history} from '../..';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use((config) =>{
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, error => {
    return Promise.reject(error);
})

axios.interceptors.response.use(undefined, error => {
    if (error.message === 'Network Error' && !error.response){
        toast.error('Network error - make sure api is running!');
    }
    const {status, data, config} = error.response;
    if (status === 404){
        history.push('/notfound');
    }
    if (status === 400 && config.method ==='get' && data.errors.hasOwnProperty('id')){
        history.push('/notfound');
    }
    if (status === 500){
        toast.error('Server error - check the terminal for more info!');
    }
    throw error;
});

const responseBody = (response: AxiosResponse) => response.data;

//TODO Remove when developenent are finsih 
const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));


const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody)
};

const Users = {
    list: (): Promise<IPersonel[]> => requests.get('/users'),
    currentUser:(): Promise<IPersonel> => requests.get('/users/user'),
    login:(user: IPersonFormValues): Promise<IPersonel> => requests.post('/users/login', user),
    details: (id: string) => requests.get(`/users/${id}`),
    create: (user: IPersonel) => requests.post('/users/createuser', user),
    update: (user: IPersonel) => requests.put(`/users/${user.id}`, user),
    delete: (id: string) => requests.del(`/users/${id}`)
}

const Organisation = {
    list: (): Promise<IOrganisation[]> => requests.get('/organisation'),
    details: (id: string) => requests.get(`/organisation/${id}`),
    create: (organisation: IOrganisation) => requests.post('/organisation', organisation),
    update: (organisation: IOrganisation) => requests.put(`/organisation/${organisation.id}`, organisation),
    delete: (id: string) => requests.del(`/organisation/${id}`),
    addGroup: (organisationId: string, Groupid: string) => requests.post(`/organisation/${organisationId}/addGroupToOrganisation/${Groupid}`, {}),
}

const Groups = {
    list: (): Promise<IGroup[]> => requests.get('/group'),
    details: (id: string) => requests.get(`/group/${id}`),
    create: (group: IGroup) => requests.post('/group', group),
    update: (group: IGroup) => requests.put(`/group/${group.id}`, group),
    delete: (id: string) => requests.del(`/group/${id}`),
    addUser: (groupid: string, userid: string) => requests.post(`/group/${groupid}/addgroupmember/${userid}`, {}),
    removeUser: (groupid: string, userid: string) => requests.del(`/group/${groupid}/remove/${userid}`),
    editAdmin: (groupid: string, userid: string) => requests.put(`/group/${groupid}/editadmin/${userid}`,{})
}

export default {
    Users,
    Organisation,
    Groups
}