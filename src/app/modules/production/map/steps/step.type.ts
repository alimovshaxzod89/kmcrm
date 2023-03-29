export interface IStep {
    unit_id: number,
    category_seh_id: number,

    seh_id: number,
    name: string,
    description: string,
    duration: number
    cost: number
    sorder: number
    percent: number
}
