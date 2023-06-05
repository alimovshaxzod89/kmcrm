import {createReducer, on} from "@ngrx/store";
import {setEarning} from "./earning.actions";

export const initialState: number = null;

export const earningReducer = createReducer(
    initialState,
    on(setEarning, (state, {value}) => value),
);
