export interface Category {
    id: number;
    name: string;
}

export interface Komplekt {
    id: number;
    category_id: number;
    name: string;
}

export interface IFurniture {
    id: number;
    category_id: number;
    name: string;

    fullName?: string;
    komplekt_id?: number;
}
