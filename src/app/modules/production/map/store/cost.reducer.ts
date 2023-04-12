import {createReducer, on} from '@ngrx/store';

import {setCost} from './cost.actions';

export const initialState = 0;

export const costReducer = createReducer(
    initialState,
    on(setCost, (state, {cost}) => {
        console.log('setCost', {cost})
        state = cost;

        return state;
    })
);
