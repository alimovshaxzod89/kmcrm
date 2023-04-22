import { createAction, props } from '@ngrx/store';
import {IMap} from "../map.types";


export const setMap = createAction('[Map Component] setMap', (map: IMap) => ({map}));

export const setCost = createAction('[Map Component] SetCost', props<{ cost: number }>());
export const changeCost = createAction('[Map Component] ChangeCost', (cost: number) => ({cost}));
export const saveCost = createAction('[Map Component] SaveCost', props<{ map_id: number, cost: number }>());
export const savedMapCost = createAction('[Map Component] SavedMapCost', props<{ cost: number }>());
export const getCost = createAction('[Map Component] GetCost', props<{ map_id: number }>());
