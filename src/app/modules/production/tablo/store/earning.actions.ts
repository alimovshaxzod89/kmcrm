import {createAction, props} from "@ngrx/store";

export const loadEarning = createAction('[Earning] Load Earning', props<{ seh_id: number, date: string }>());
export const setEarning = createAction('[Earning] Set', props<{ value: number }>());
