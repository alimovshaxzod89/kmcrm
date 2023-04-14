import {createReducer, on} from '@ngrx/store';

import {setCost} from './cost.actions';
import {setSaved} from "./saved.actions";

export const initialState: boolean = true;

export const savedReducer = createReducer(
    initialState,
    on(setSaved, (state, {saved}) => {
        console.log('setSaved', {saved})
        state = saved;

        return state;
    })
);
