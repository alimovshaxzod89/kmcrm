import {createAction, props} from "@ngrx/store";
import {IUnit} from "../units/unit.type";

export const setUnits = createAction("[Units] Set Units", props<{ units: IUnit[] }>());


export const addUnit = createAction("[Units] Add Unit", props<{ unit_id: number, rowIndex: number }>());
export const saveUnit = createAction("[Units] Save Unit", props<{ unit: IUnit }>());
export const savedUnit = createAction("[Units] Saved Unit", props<{ unit: IUnit, unit_id: number }>());
export const deleteUnit = createAction("[Units] Delete Unit", props<{ unit: IUnit }>());
export const removeUnit = createAction("[Units] Remove Unit", props<{ unit: IUnit }>());
