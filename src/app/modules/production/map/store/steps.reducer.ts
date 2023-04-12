import {createReducer, on} from "@ngrx/store";
import {calcStepsCost, setStep, setSteps} from "./steps.actions";

export const initialState = []

export const stepsReducer = createReducer(
    initialState,
    on(setSteps, (state, {steps}) => state = steps),
    on(setStep, (state, {step_id, step}) => {
        console.log('setStep', {step_id}, {step})
        const index = state.findIndex(step => step.id === step_id)
        if (index > -1) {
            state = state.map((row, rowIndex) => rowIndex === index ? {...step} : row)
        } else {
            console.log('step not found', {step_id}, {step})
        }
        return state
    }),
    on(calcStepsCost, (state, {cost}) => {
        //change steps cost through percent

        state = state.map(row => {
            const item = JSON.parse(JSON.stringify(row))
            item.cost = cost * item.percent / 100
            return item
        })

        return state
    })
);
