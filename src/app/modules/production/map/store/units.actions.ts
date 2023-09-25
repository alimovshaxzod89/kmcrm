import {createAction, props} from "@ngrx/store";
import {IMapUnit} from "../units/unit.type";

export const setUnits = createAction("[Units] Set Units", props<{ units: IMapUnit[] }>());
export const setUnit = createAction("[Units] Set Unit", props<{ map_unit_id: number, unit: IMapUnit }>());

export const getUnits = createAction("[Units] Get Units", props<{ map_id: number }>());

export const addUnit = createAction("[Units] Add Unit", props<{ map_id: number }>());
export const saveUnit = createAction("[Units] Save Unit", props<{ unit: IMapUnit }>());
export const savedUnit = createAction("[Units] Saved Unit", props<{ unit: IMapUnit, map_unit_id: number }>());
export const deleteUnit = createAction("[Units] Delete Unit", props<{ unit: IMapUnit }>());
export const removeUnit = createAction("[Units] Remove Unit", props<{ unit: IMapUnit }>());
