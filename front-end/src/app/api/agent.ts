import axios, {AxiosResponse} from 'axios';
import {IPersonel, IPersonFormValues} from '../models/personel'
import {IGroup} from '../models/group'
import {ITag} from '../models/Tag'
import {IOrganisation} from '../models/organisations'
import {history} from '../..';
import { toast } from 'react-toastify';
import { IPhoto } from '../models/Photo';
import { ICourse } from '../models/Course';
import { IAccessGroup } from '../models/AccessGroups';

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
    del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody),
    postForm: (url: string, file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post(url, formData, {
            headers: {'Content-type': 'multipart/form-data'}
        }).then(responseBody)
    }
};

const Users = {
    list: (): Promise<IPersonel[]> => requests.get('/users'),
    currentUser:(): Promise<IPersonel> => requests.get('/users/user'),
    login:(user: IPersonFormValues): Promise<IPersonel> => requests.post('/users/login', user),
    details: (id: string) => requests.get(`/users/${id}`),
    create: (user: IPersonel) => requests.post('/users/createuser', user),
    update: (user: IPersonel) => requests.put(`/users/${user.id}`, user),
    delete: (id: string) => requests.del(`/users/${id}`),
    uploadPhoto: (photo: Blob): Promise<IPhoto> => requests.postForm(`/photo`, photo),
    deletePhoto: (id: string) => requests.del(`/photo/${id}`)
}

const Organisation = {
    list: (): Promise<IOrganisation[]> => requests.get('/organisation'),
    details: (id: string) => requests.get(`/organisation/${id}`),
    create: (organisation: IOrganisation) => requests.post('/organisation', organisation),
    update: (organisation: IOrganisation) => requests.put(`/organisation/${organisation.id}`, organisation),
    delete: (id: string) => requests.del(`/organisation/${id}`),
    addGroup: (organisationId: string, Groupid: string) => requests.post(`/organisation/${organisationId}/addGroupToOrganisation/${Groupid}`, {}),
    removeGroup: (organisationId: string, Groupid: string) => requests.del(`/organisation/${organisationId}/remove/${Groupid}`),
    addAdmin: (organisationId: string, userid: string) => requests.post(`/organisation/${organisationId}/AddAdmin/${userid}`,{}),
    removeAdmin: (organisationId: string, userid: string) => requests.post(`/organisation/${organisationId}/RemoveAdmin/${userid}`, {})


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

const Tags = {
    list: (): Promise<ITag[]> => requests.get('/tag'),
    create: (tag: ITag) => requests.post('/tag', tag),
    delete: (id: string) => requests.del(`/tag/${id}`),
    addTag: (tagId: string, userid: string) => requests.post(`/tag/${tagId}/add/${userid}`, {}),
    removeTag: (tagId: string, userid: string) => requests.del(`/tag/${tagId}/remove/${userid}`),


}

const AccssesRole = {
    list: (): Promise<IAccessGroup[]> => requests.get('/accessgroup'),
    userrole:(id: string) => requests.get(`/accessgroup/getRoles/${id}`),
    addAccessLevel: (accessId: string, userid: string) => requests.post(`/accessgroup/${accessId}/addToUser/${userid}`, {}),
    removeAccessLevel: (accessId: string, userid: string) => requests.post(`/accessgroup/${accessId}/removeFromUser/${userid}`, {}),

}

const Courses = {
    list: (): Promise<ICourse[]> => requests.get('/course'),
    addCourse: (courseId: string, userid: string) => requests.post(`/course/${courseId}/addCourseMember/${userid}`, {}),
    removeCourse: (courseId: string, userid: string) => requests.post(`/course/${courseId}/removeCourseMember/${userid}`, {}),
    create: (course: ICourse) => requests.post('/course', course),



}

export default {
    Users,
    Organisation,
    Groups,
    Tags,
    AccssesRole,
    Courses
}