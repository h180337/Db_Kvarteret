import { IPersonel } from "./personel";

export interface IAccessGroup {
    id: string,
    name: string,
    members: IPersonel[]
}