import { IOrganisation } from "./organisations";
import { IPhoto } from "./Photo";

export interface IGroup {
    id: string,
    navn: string,
    beskrivelse: string,
    aktiv: string,
    groupType: string
    opprettet: string
    aktiv_til_og_med: string,
    members: any,
    organisation: IOrganisation | undefined,
    organiastionId: string,
    groupPhoto : IPhoto
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