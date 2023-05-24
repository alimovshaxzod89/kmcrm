import {createAction, props} from "@ngrx/store";
import {IMap} from "../map.types";


export const getMaps = createAction("[Maps] Get Maps", (furniture_id: number) => ({furniture_id}));

export const selectMap = createAction("[Maps] Select Map", (map?: IMap) => ({map}))

export const setMaps = createAction("[Maps] Set Maps", props<{ maps: IMap[] }>());
export const setMap = createAction("[Maps] Set Map", props<{ map_id: number, map: IMap }>());
export const calcMapsCost = createAction("[Maps] Calc Maps Cost", props<{ cost: number }>());

export const addMap = createAction("[Maps] Add Map", (map: IMap) => ({map}));
export const saveMap = createAction("[Maps] Save Map", (map: IMap) => ({map}));
export const savedMap = createAction("[Maps] Saved Map", props<{ map: IMap, map_id: number }>());
export const resetMap = createAction("[Maps] Reset Map", props<{ map: IMap }>());
export const deleteMap = createAction("[Maps] Delete Map", props<{ map: IMap }>());
export const removeMap = createAction("[Maps] Remove Map", props<{ map: IMap }>());

export const saveMaps = createAction("[Maps] Save Maps", props<{ furniture_id: number, maps: IMap[] }>());
export const savedMaps = createAction("[Maps] Saved Maps", props<{ furniture_id: number, maps: IMap[] }>());
