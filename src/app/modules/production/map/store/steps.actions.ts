import {createAction, props} from "@ngrx/store";
import {IMapUnitStep} from "../steps/step.type";

export const getSteps = createAction("[Steps] Get Steps", (map_unit_ids: number[]) => ({map_unit_ids}));

export const setSteps = createAction("[Steps] Set Steps", props<{ steps: IMapUnitStep[] }>());
export const setStep = createAction("[Steps] Set Step", props<{ step_id: number, step: IMapUnitStep }>());
export const calcStepsCost = createAction("[Steps] Calc Steps Cost", props<{ cost: number }>());

export const upStep = createAction("[Steps] Up Step", props<{ step: IMapUnitStep }>());
export const downStep = createAction("[Steps] Down Step", props<{ step: IMapUnitStep }>());

export const addStep = createAction("[Steps] Add Step", props<{ map_unit_id: number, rowIndex: number }>());
export const saveStep = createAction("[Steps] Save Step", props<{ step: IMapUnitStep }>());
export const savedStep = createAction("[Steps] Saved Step", props<{ step: IMapUnitStep, step_id: number }>());
export const resetStep = createAction("[Steps] Reset Step", props<{ step: IMapUnitStep }>());
export const deleteStep = createAction("[Steps] Delete Step", props<{ step: IMapUnitStep }>());
export const removeStep = createAction("[Steps] Remove Step", props<{ step: IMapUnitStep }>());

export const saveSteps = createAction("[Steps] Save Steps", props<{ map_unit_id: number, steps: IMapUnitStep[] }>());
export const savedSteps = createAction("[Steps] Saved Steps", props<{ map_unit_id: number, steps: IMapUnitStep[] }>());
