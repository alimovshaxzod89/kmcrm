import {createReducer, on} from "@ngrx/store";
import {setUnits} from "./units.actions";

export const initialState = []

export const unitsReducer = createReducer(
    initialState,
    on(setUnits, (state, {units}) => state = units),
);
