import {createSelector} from '@ngrx/store';
import {IStep} from "../steps/step.type";

export interface AppState {
    steps: IStep[];
}

export const selectSteps = (state: AppState) => state.steps;

export const selectStepsChanged = createSelector(
    selectSteps,
    steps => {
        let changed = false;

        for (const step of steps) {

            const item = {...step}
            delete item._hash;

            if (step._hash !== JSON.stringify(item)) {
                changed = true;
                break;
            }
        }

        return changed;
    }
);

