import {createReducer, on} from "@ngrx/store";
import {removeUnit, savedUnit, setUnit, setUnits} from "./units.actions";
import {addUnit} from "./units.actions";
import {emptyUnit, IUnit} from "../units/unit.type";

export const initialState = []

export const unitsReducer = createReducer(
    initialState,
    on(setUnits, (state, {units}) => {

        state = units.map(unit => {
            return {...unit, _hash: JSON.stringify(unit)}
        })

        return state
    }),

    on(addUnit, (state, {map_id}) => {

        //check if not exists id=null already
        const index = state.findIndex(unit => unit.id === null)
        if (index > -1) {
            alert('Oldiniga bundan oldingi yangi qatorni saqlang');
            return state
        }

        const unit: IUnit = JSON.parse(JSON.stringify(emptyUnit))
        unit.map_id = map_id
        unit._hash = JSON.stringify({})

        return [...state, unit]
    }),

    on(setUnit, (state, {unit_id, unit}) => {

        const index = state.findIndex(unit => unit.id === unit_id)

        if (index > -1) {
            state = state.map((row, rowIndex) => {
                return rowIndex === index ? {...unit} : row
            })
        } else {
            console.error('unit not found', {unit_id}, {unit})
        }
        return state
    }),

    on(savedUnit, (state, {unit, unit_id}) => {

        const rows = [];

        state.forEach(row => {
            if (row.id === unit_id) {

                let item = {...unit}

                rows.push({...unit, _hash: JSON.stringify(item)})
            } else {
                rows.push(row)
            }
        })

        state = rows

        return state
    }),

    on(removeUnit, (state, {unit}) => {

        if (unit.id === null) {
            state = state.filter((row, index) => row.id !== unit.id)
        } else {

            const index = state.findIndex(item => item.id === unit.id)

            if (index > -1) {
                state = state.filter((row) => row.id !== unit.id)
            } else {
                console.error('unit not found', {unit})
            }
        }

        return state
    }),
);
