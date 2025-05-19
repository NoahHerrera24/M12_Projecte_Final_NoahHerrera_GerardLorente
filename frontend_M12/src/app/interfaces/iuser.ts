import { IEquip } from './iequip';
import { ITorneig } from './itorneig';

export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    foto?: string | null;
    equip?: IEquip | null; 
    tornejos?: ITorneig[];
    pivot?: {
        expulsat: boolean;
    };
}