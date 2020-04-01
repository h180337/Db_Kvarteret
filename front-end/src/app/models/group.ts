import { IPersonel } from "./personel";

export interface IGroup {
    id: string,
    navn: string,
    beskrivelse: string,
    aktiv: boolean,
    members: any
}

export interface IGroupFormValues extends Partial<IGroup> {

}

export class GroupFormValues implements IGroupFormValues {
    id?: string = undefined;
    navn: string = '';
    beskrivelse: string = '';
    aktiv: boolean = false;

    constructor(init?: IGroupFormValues) {
        Object.assign(this, init);
    }
}