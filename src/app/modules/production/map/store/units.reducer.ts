import {createReducer, on} from "@ngrx/store";
import {setUnits} from "./units.actions";
import {removeUnit, savedUnit} from "./units.actions";

export const initialState = []

export const unitsReducer = createReducer(
    initialState,
    on(setUnits, (state, {units}) => state = units),

    on(savedUnit, (state, {unit, unit_id}) => {

        const rows = [];

        state.forEach(row => {
            if (row.id === unit_id) {

                let item = {...unit}

                rows.push({...unit})
            } else {
                rows.push(row)
            }
        })

        state = rows

        return state
    }),

    on(removeUnit, (state, {unit}) => {
        console.log('removeUnit', {unit})

        if (unit.id === null) {
            state = state.filter((row, index) => row.id !== unit.id)
        } else {

            const index = state.findIndex(item => item.id === unit.id)

            if (index > -1) {
                state = state.filter((row) => row.id !== unit.id)
            } else {
                console.log('unit not found', {unit})
            }
        }

        return state
    }),
);
