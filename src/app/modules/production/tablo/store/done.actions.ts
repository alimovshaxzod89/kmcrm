//ngrx actions
import {createAction, props} from "@ngrx/store";
import {IDone} from "../done/done.type";

export const getAllDone = createAction('[Done] Get All', props<{ seh_id: number, date: string }>());

export const getAllDoneSuccess = createAction('[Done] Get All Success', (data: IDone[]) => ({data}));

export const unDone = createAction('[Done] UnDone', props<{ id: number, seh_id: number, date: string }>());


