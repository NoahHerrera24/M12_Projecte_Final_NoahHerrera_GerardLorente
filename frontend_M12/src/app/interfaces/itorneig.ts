
import { IEquip } from "./iequip";
import { IUser } from "./iuser";

export interface ITorneig {

    id: number;
    nom: string;
    regles: string;
    premis: string;
    categoria: string;
    format: string;
    data_inici:string;
    data_fi: string;
    equips: IEquip[];
    jugadors: IUser[];




}


