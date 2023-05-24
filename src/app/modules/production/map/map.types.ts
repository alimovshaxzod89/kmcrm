export interface IMap {
    id: number,
    furniture_id?: number,
    version: string,
    cost: number | null,
    actual: boolean,
    description?: string,
    parent_id?: number,
    is_custom?: boolean,

    _hash?: string
}


export const emptyMap: IMap = {
    id: null,
    furniture_id: null,
    version: null,
    cost: null,
    actual: false,
    description: null,
    parent_id: null,
    is_custom: false,
}
