//ngrx reducer

import {createReducer, on} from "@ngrx/store";
import {getAllDoneSuccess} from "./done.actions";
import {IDone} from "../done/done.type";

export interface DoneState {
    dones: IDone[]
}

export const initialState: IDone[] = []

export const doneReducer = createReducer(
    initialState,

    on(getAllDoneSuccess, (state, {data: doneList}) => doneList),
);
