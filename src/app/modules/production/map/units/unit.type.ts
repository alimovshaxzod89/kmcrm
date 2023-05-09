export interface IUnit {
    id: number,
    map_id?: number,
    name: string,
    amount: number,
    tip_id?: number | null,
    parent_id: number,
    undefined?: boolean,

    _hash?: string,
}

export const emptyUnit: IUnit = {
    id: null,
    map_id: null,
    name: '',
    amount: 1,
    tip_id: null,
    parent_id: null,
    undefined: false,
}
