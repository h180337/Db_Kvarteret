import { IPersonel } from "./personel";
import {IPhoto} from "./Photo";

export interface IOrganisation {
    id: string,
    name: string,
    description: string
    groups: any,
    admins: IPersonel [],
    organisationPhoto:IPhoto | null
}

export interface IOrganisationFormValues extends Partial<IOrganisation>{

}


export class OrganisationFormValues implements IOrganisationFormValues{
    id?: string = undefined;
    name: string = '';
    description: string = '';

    constructor(init?: IOrganisationFormValues) {
        Object.assign(this, init);
    }}