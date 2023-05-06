export interface IStep {
    id?: number,
    unit_id: number,
    category_seh_id: number,

    seh_id: number,
    // name: string,
    description: string,
    duration: number
    cost: number
    sorder: number
    percent: number

    _hash?: string
}

export const emptyStep: IStep = {
    id: null,
    unit_id: null,
    category_seh_id: null,
    seh_id: null,
    percent: 0,
    cost: 0,
    description: '',
    duration: null,
    sorder: null,
}
