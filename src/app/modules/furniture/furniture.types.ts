export interface Category {
    id: number;
    name: string;
}

export interface Komplekt {
    id: number;
    category_id: number;
    name: string;
}

export interface Furniture {
    id: number;
    category_id: number;
    name: string;
}
