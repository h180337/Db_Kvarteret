import { ITag } from "./Tag";
import { IPhoto } from "./Photo";
import { IRole } from "./Roles";
import { IDependent } from "./dependent";

export interface IPersonel {
    id: string,
    fornavn: string,
    etternavn: string,
    userName: string,
    kjonn: string,
    email: string,
    phoneNumber: string,
    streetAddress: string,
    areaCode: string,
    created: string,
    dateOfBirth: Date,
    workstatus: string,
    token: string,
    groups: any[],
    courses: any[],
    tags: ITag [],
    historys: any [];
    profilePhoto: IPhoto | null;
    roles: IRole [];
    organisationAdmin: any [];
    dependent: IDependent;
}

export interface IPersonFormValues extends Partial<IPersonel>{

}


export class PersonFormValues implements IPersonFormValues{
    id?: string = undefined;
    fornavn: string = '';
    etternavn: string= '';
    userName: string= '';
    kjonn: string='';
    email: string ='';
    phoneNumber: string ='';
    workstatus: string= '';
    dateOfBirth?: Date  = undefined;
    streetAddress: string ='';
    areaCode: string = '';
    created: string = '';

    constructor(init?: IPersonFormValues) {
        Object.assign(this, init);
    }
}