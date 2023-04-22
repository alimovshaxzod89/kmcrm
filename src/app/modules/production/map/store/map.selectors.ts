import {createSelector} from '@ngrx/store';
import {MapState} from "./map.reducer";

export interface AppState {
    cost: MapState;
}

export const selectCost = (state: AppState) => state.cost;

export const selectSaved = createSelector(
    selectCost,
    ({current, saved}) => current === saved
);

