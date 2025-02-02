import {createReducer, on} from '@ngrx/store';

import {changeCost, savedMapCost, setCost, setMap} from './map.actions';

export interface MapState {
    id: number;
    saved: number;
    current: number;
}

export const initialState: MapState = {
    id: null,
    saved: null,
    current: null,
};

export const mapReducer = createReducer(
    initialState,
    on(setMap, (state, {map}) => {
        state = {
            id: map?.id ?? null,
            saved: map?.cost ?? null,
            current: map?.cost ?? null,
        };

        return state
    }),
    on(setCost, (state, {cost}) => {

        state = {
            id: state.id,
            saved: cost,
            current: cost,
        };

        return state
    }),
    on(changeCost, (state, {cost}) => {

        state = {...state, current: cost};

        return state
    }),
    on(savedMapCost, (state, {cost}) => {

        state = {...state, saved: cost, current: cost};

        return state
    })
);
