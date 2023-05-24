import {createReducer, on} from "@ngrx/store";
import {removeMap, resetMap, savedMap, setMap, setMaps} from "./maps.actions";
import {IMap} from "../map.types";

export const initialState: IMap[] = []

export const mapsReducer = createReducer(
    initialState,
    on(setMaps, (state, {maps}) => {

        state = maps.map(map => {
            return {...map, _hash: JSON.stringify(map)}
        })

        return state
    }),

    on(setMap, (state, {map_id, map}) => {

        const index = state.findIndex(map => map.id === map_id)

        if (index > -1) {
            state = state.map((row, rowIndex) => {
                return rowIndex === index ? {...map} : row
            })
        } else {
            console.error('map not found', {map_id}, {map})
        }
        return state
    }),

    on(resetMap, (state, {map}) => {

        const index = state.findIndex(item => item.id === map.id)

        if (index > -1) {
            state = state.map((row, rowIndex) => {
                const item = JSON.parse(row._hash)
                item._hash = row._hash
                return rowIndex === index ? item : row
            })
        } else {
            console.error('map not found', {map})
        }
        return state
    }),

    on(savedMap, (state, {map, map_id}) => {

        const rows = [];

        state.forEach(row => {
            if (row.id === map_id) {

                let item = {...map}
                delete item._hash

                rows.push({...map, _hash: JSON.stringify(item)})
            } else {
                rows.push(row)
            }
        })

        state = rows

        return state
    }),

    on(removeMap, (state, {map_id}) => {

        state = state.filter((row, index) => row.id !== map_id)

        return state
    }),
);
