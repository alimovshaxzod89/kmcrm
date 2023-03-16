export interface IMap {
    id: number,
    furniture_id?: number;
    version: string,
    cost: number | null,
    actual: boolean,
    description?: string,
    parent_id?: number,
    is_custom?: boolean,
}
