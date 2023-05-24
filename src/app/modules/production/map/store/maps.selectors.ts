import {createSelector} from '@ngrx/store';

import {IMap} from "../map.types";

export interface AppState {
    maps: IMap[];
}

export const selectMaps = (state: AppState) => state.maps;

export const selectMapOptions = createSelector(
    selectMaps,
    maps => {
        return maps.map(map => {
            return {
                id: map.id,
                version: map.version
            }
        })
    }
);
