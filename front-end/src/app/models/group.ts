
export interface IGroup {
    id: string,
    navn: string,
    beskrivelse: string,
    aktiv: string,
    opprettet: string
    members: any
}

export interface IGroupFormValues extends Partial<IGroup> {

}

export class GroupFormValues implements IGroupFormValues {
    id?: string = undefined;
    navn: string = '';
    beskrivelse: string = '';
    opprettet: string = '';
    aktiv: string = '';

    constructor(init?: IGroupFormValues) {
        Object.assign(this, init);
    }
}