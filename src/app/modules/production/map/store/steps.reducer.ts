import {createReducer, on} from "@ngrx/store";
import {setStep, setSteps} from "./steps.actions";

export const initialState = []

export const stepsReducer = createReducer(
    initialState,
    on(setSteps, (state, {steps}) => state = steps),
    on(setStep, (state, {step_id, step}) => {
        const index = state.findIndex(step => step.id === step_id)
        if (index > -1) {
            state = state.map((row, rowIndex) => rowIndex === index ? {...step} : row)
        } else {
            console.log('step not found', {step_id}, {step})
        }
        return state
    }),
);
