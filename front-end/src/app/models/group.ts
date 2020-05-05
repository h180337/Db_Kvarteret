import { IOrganisation } from "./organisations";

export interface IGroup {
    id: string,
    navn: string,
    beskrivelse: string,
    aktiv: string,
    groupType: string
    opprettet: string
    members: any,
    organisation: IOrganisation | undefined;
    organiastionId: string;
}

export interface IGroupFormValues extends Partial<IGroup> {

}

export class GroupFormValues implements IGroupFormValues {
    id?: string = undefined;
    navn: string = '';
    beskrivelse: string = '';
    opprettet: string = '';
    aktiv: string = '';
    groupType: string = '';
    organiastionId: string = '';
    organisation: IOrganisation | undefined;



    constructor(init?: IGroupFormValues) {
        Object.assign(this, init);
    }
}