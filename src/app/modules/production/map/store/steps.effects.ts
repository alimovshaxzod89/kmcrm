import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, EMPTY, exhaustMap, map, mergeMap, of} from "rxjs";
import {Injectable} from "@angular/core";
import {StepService} from "../steps/step.service";
import {deleteStep, getSteps, removeStep, savedStep, saveStep, setSteps} from "./steps.actions";

@Injectable()
export class StepsEffects {

    getSteps = createEffect(() => this.actions$.pipe(
        ofType(getSteps),
        exhaustMap(props => {
            if (props.unit_ids.length) {
                return this.stepsService.getSteps(props.unit_ids).pipe(
                    map(response => {
                            const steps = response.data
                            return setSteps({steps})
                        }
                    ),
                    catchError(err => {
                        console.log({err})
                        const errMsg = err?.error?.message
                        alert('Ошибка: ' + errMsg)
                        return EMPTY
                    })
                )
            } else {
                return of(setSteps({steps: []}))
            }
        })
    ));

    saveStep = createEffect(() => this.actions$.pipe(
        ofType(saveStep),
        mergeMap(props => {
            return this.stepsService.saveStep(props.step)
                .pipe(
                    map(response => {
                        if (response.success) {
                            return savedStep({step: response.data, step_id: props.step.id})
                        } else {
                            alert(response.message)
                            console.log(response.message)
                        }
                    }),
                    catchError(err => {
                        console.log({err})
                        const errMsg = err?.error?.message
                        alert('Ошибка сохранения: ' + errMsg)
                        return EMPTY
                    })
                )
        })
    ));

    deleteStep = createEffect(() => this.actions$.pipe(
        ofType(deleteStep),
        mergeMap(props => {
                return this.stepsService.deleteStep(props.step)
                    .pipe(
                        map(response => {
                            if (response.success) {
                                return removeStep({step: props.step})
                            } else {
                                alert(response.message)
                                console.log(response.message)
                            }
                        }),
                        catchError(err => {
                            console.log({err})
                            const errMsg = err?.error?.message
                            alert('Ошибка сохранения: ' + errMsg)
                            return EMPTY
                        })
                    )
            }
        )
    ));

    constructor(private actions$: Actions,
                private stepsService: StepService) {
    }
}
