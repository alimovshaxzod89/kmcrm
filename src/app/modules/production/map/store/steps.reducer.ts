import {createReducer, on} from "@ngrx/store";
import {
    addStep,
    calcStepsCost,
    upStep,
    downStep,
    removeStep,
    resetStep,
    savedStep,
    setStep,
    setSteps
} from "./steps.actions";
import {emptyStep, IStep} from "../steps/step.type";

export const initialState = []

export const stepsReducer = createReducer(
    initialState,
    on(setSteps, (state, {steps}) => {

        state = steps.map(step => {
            return {...step, _hash: JSON.stringify(step)}
        })

        return state
    }),

    on(addStep, (state, {unit_id, rowIndex}) => {

        //check if not exists id=null already
        const index = state.findIndex(step => step.id === null)
        if (index > -1) {
            alert('Oldiniga bundan oldingi yangi qatorni saqlang');
            return state
        }

        const step: IStep = JSON.parse(JSON.stringify(emptyStep))
        step.unit_id = unit_id
        step.sorder = rowIndex + 1
        step._hash = JSON.stringify({})

        return [...state, step]
    }),

    on(setStep, (state, {step_id, step}) => {

        const index = state.findIndex(step => step.id === step_id)

        if (index > -1) {
            state = state.map((row, rowIndex) => {
                return rowIndex === index ? {...step} : row
            })
        } else {
            console.error('step not found', {step_id}, {step})
        }
        return state
    }),

    on(upStep, (state, {step}) => {

        const index = state.findIndex(item => item.id === step.id)
        const prevSorder = step.sorder - 1

        if (index > -1) {
            state = state.map((row, rowIndex) => {
                const item = JSON.parse(JSON.stringify(row))
                if (rowIndex === index) {
                    item.sorder = prevSorder
                } else if (row.sorder === prevSorder && row.unit_id == step.unit_id) {
                    item.sorder = step.sorder
                }
                return item
            })
        } else {
            console.error('step not found', {step})
        }
        return state
    }),

    on(downStep, (state, {step}) => {

        const index = state.findIndex(item => item.id === step.id)
        const nextSorder = step.sorder + 1

        if (index > -1) {
            state = state.map((row, rowIndex) => {
                const item = JSON.parse(JSON.stringify(row))
                if (rowIndex === index) {
                    item.sorder = nextSorder
                } else if (row.sorder === nextSorder && row.unit_id == step.unit_id) {
                    item.sorder = step.sorder
                }
                return item
            })
        } else {
            console.error('step not found', {step})
        }
        return state
    }),

    on(resetStep, (state, {step}) => {

        const index = state.findIndex(item => item.id === step.id)

        if (index > -1) {
            state = state.map((row, rowIndex) => {
                const item = JSON.parse(row._hash)
                item._hash = row._hash
                return rowIndex === index ? item : row
            })
        } else {
            console.error('step not found', {step})
        }
        return state
    }),

    on(savedStep, (state, {step, step_id}) => {

        const rows = [];

        state.forEach(row => {
            if (row.id === step_id) {

                let item = {...step}
                delete item._hash

                rows.push({...step, _hash: JSON.stringify(item)})
            } else {
                rows.push(row)
            }
        })

        state = rows

        return state
    }),

    on(removeStep, (state, {step}) => {

        if (step.id === null) {
            state = state.filter((row, index) => row.id !== step.id)
        } else {

            const index = state.findIndex(item => item.id === step.id)

            if (index > -1) {
                state = state.filter((row) => row.id !== step.id)
            } else {
                console.error('step not found', {step})
            }
        }

        return state
    }),

    on(calcStepsCost, (state, {cost}) => {
        //change steps cost through percent

        state = state.map(row => {
            const item = JSON.parse(JSON.stringify(row))
            item.cost = Math.round(cost * item.percent / 100)
            return item
        })

        return state
    }),
);
