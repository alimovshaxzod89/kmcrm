import {createAction, props} from "@ngrx/store";
import {IStep} from "../steps/step.type";
export const setSteps = createAction("[Steps] Set Steps", props<{ steps: IStep[] }>());
export const setStep = createAction("[Steps] Set Step", props<{ step_id: number, step: IStep }>());
export const calcStepsCost = createAction("[Steps] Calc Steps Cost", props<{ cost: number }>());
