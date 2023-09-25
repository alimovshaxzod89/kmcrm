export interface IMapUnit {
    id: number,
    map_id?: number,
    name: string,
    amount: number,
    tip_id?: number | null,
    parent_id: number,

    _hash?: string,
}

export const emptyMapUnit: IMapUnit = {
    id: null,
    map_id: null,
    name: '',
    amount: 1,
    tip_id: null,
    parent_id: null,
}
