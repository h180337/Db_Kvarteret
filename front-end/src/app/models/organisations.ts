import {IPersonel} from "./personel";

export interface IOrganisation {
    id: string,
    name: string,
    description: string
}

export interface IOrganisationFormValues extends Partial<IPersonel>{

}


export class OrganisationFormValues implements IOrganisationFormValues{
    id?: string = undefined;
    name: string = '';
    description: string = '';

    constructor(init?: IOrganisationFormValues) {
        Object.assign(this, init);
    }}