import { IPersonel } from "./personel";

export interface ICourse {
    id: string,
    navn: string,
    beskrivielse: string,
    opprettet: string,
    members: IPersonel [];
}