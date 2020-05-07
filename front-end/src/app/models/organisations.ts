import { IPersonel } from "./personel";

export interface IOrganisation {
    id: string,
    name: string,
    description: string
    groups: any,
    admins: IPersonel []
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