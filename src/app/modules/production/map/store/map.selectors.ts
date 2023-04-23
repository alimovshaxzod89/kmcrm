import {createSelector} from '@ngrx/store';
import {MapState} from "./map.reducer";
import {IStep} from "../steps/step.type";

export interface AppState {
    cost: MapState;
    steps: IStep[];
}

//map self
export const selectCost = (state: AppState) => state.cost;

export const selectMapCostSaved = createSelector(
    selectCost,
    ({current, saved}) => current === saved
);

//steps
export const selectSteps = (state: AppState) => state.steps;

export const selectStepsChanged = createSelector(
    selectSteps,
    steps => {
        let changed = false;

        for (const step of steps) {

            const step_i = {...step}
            delete step_i._hash;

            if (step._hash !== JSON.stringify(step_i)) {
                changed = true;
                break;
            }
        }

        return changed;
    }
);

//combined
export const selectSaved = createSelector(
    selectMapCostSaved,
    selectStepsChanged,
    (costSaved, stepsChanged) => costSaved && !stepsChanged
);

