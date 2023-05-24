import {createAction, props} from '@ngrx/store';
import {IMap} from "../map.types";


export const addMap = createAction('[Map Component] addMap', (map: IMap) => ({map}));

export const savedMap = createAction('[Map Component] savedMap', (map: IMap) => ({map}))

export const setMap = createAction('[Map Component] setMap', (map: IMap | null) => ({map}));

export const setCost = createAction('[Map Component] SetCost', props<{ cost: number }>());
export const changeCost = createAction('[Map Component] ChangeCost', (cost: number) => ({cost}));
export const saveCost = createAction('[Map Component] SaveCost', props<{ map_id: number, cost: number }>());
export const savedMapCost = createAction('[Map Component] SavedMapCost', props<{ cost: number }>());
export const getCost = createAction('[Map Component] GetCost', props<{ map_id: number }>());
