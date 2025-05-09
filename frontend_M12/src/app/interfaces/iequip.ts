export interface IEquip {
    id: number;
    nom: string;
    colors_representatius: string;
    idioma_equip: string;
    patrocinadors: string;
    data_fundacio: string;
    entrenador?: string | null;
    logo?: string | null;
    descripcio: string;
    actiu: boolean;
    guanyador?: boolean;
}