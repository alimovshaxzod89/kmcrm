import {IMap} from "../map/map.types";

export interface IDemandFurniture {
    id: number,
    furniture: string,
    description: string,
    color: string,
    amount: number,

    map?: IMap,
}

export interface IProduction {
    id?: number | null,
    amount: number,
    map_id: number,
    demand_furniture_id: number | null,
    start_at: string,
    finish_at: string,
    started_at?: string | null,
    finished_at?: string | null,
    description: string | null
}
