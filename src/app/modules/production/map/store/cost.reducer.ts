import { createReducer, on } from '@ngrx/store';

import { setCost } from './cost.actions';

export const initialState = 156700;

export const costReducer = createReducer(
    initialState,
    on(setCost, (state, {cost}) => state = cost)
);
