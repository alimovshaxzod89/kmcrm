import {createReducer, on} from "@ngrx/store";
import {calcStepsCost, resetStep, savedStep, savedSteps, setStep, setSteps} from "./steps.actions";

export const initialState = []

export const stepsReducer = createReducer(
    initialState,
    on(setSteps, (state, {steps}) => {

        state = steps.map(step => {
            return {...step, _hash: JSON.stringify(step)}
        })

        return state
    }),

    on(setStep, (state, {step_id, step}) => {

        console.log('setStep', {step_id}, {step})
        const index = state.findIndex(step => step.id === step_id)

        if (index > -1) {
            state = state.map((row, rowIndex) => {
                return rowIndex === index ? {...step} : row
            })
        } else {
            console.log('step not found', {step_id}, {step})
        }
        return state
    }),

    on(resetStep, (state, {step}) => {

            console.log('resetStep', {step})
            const index = state.findIndex(item => item.id === step.id)

            if (index > -1) {
                state = state.map((row, rowIndex) => {
                    const item = JSON.parse(row._hash)
                    item._hash = row._hash
                    return rowIndex === index ? item : row
                })
            } else {
                console.log('step not found', {step})
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
    }),

    // on(savedSteps, (state, {unit_id, steps}) => {
    //
    //     state = steps
    //
    //     return state
    // }),

    on(savedStep, (state, {step}) => {
        console.log('savedStep', step)

        const rows = [];

        state.forEach(row => {
            if (row.id === step.id) {

                let item = {...step}
                delete item._hash

                rows.push({...step, _hash: JSON.stringify(item)})
            } else {
                rows.push(row)
            }
        })

        state = rows

        return state
    })
);
