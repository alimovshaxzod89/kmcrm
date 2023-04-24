import {createAction, props} from "@ngrx/store";
import {IStep} from "../steps/step.type";
export const setSteps = createAction("[Steps] Set Steps", props<{ steps: IStep[] }>());
export const setStep = createAction("[Steps] Set Step", props<{ step_id: number, step: IStep }>());
export const calcStepsCost = createAction("[Steps] Calc Steps Cost", props<{ cost: number }>());

export const saveStep = createAction("[Steps] Save Step", props<{ step: IStep }>());
export const savedStep = createAction("[Steps] Saved Step", props<{ step: IStep }>());
export const resetStep = createAction("[Steps] Reset Step", props<{ step: IStep }>());

export const saveSteps = createAction("[Steps] Save Steps", props<{ unit_id: number, steps: IStep[] }>());
export const savedSteps = createAction("[Steps] Saved Steps", props<{ unit_id: number, steps: IStep[] }>());
