import axios, {AxiosResponse} from 'axios';
import {IPersonel} from '../models/personel'

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));


const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody)
};

const Users = {
    list: (): Promise<IPersonel[]> => requests.get('/personel'),
    details: (id: string) => requests.get(`/personel/${id}`),
    create: (user: IPersonel) => requests.post('/personel', user),
    update: (user: IPersonel) => requests.put(`/personel/${user.id}`, user),
    delete: (id: string) => requests.del(`/personel/${id}`)
}

export default {
    Users
}