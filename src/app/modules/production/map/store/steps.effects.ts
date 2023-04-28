import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, EMPTY, map, mergeMap} from "rxjs";
import {Injectable} from "@angular/core";
import {StepService} from "../steps/step.service";
import {savedStep, saveStep, deleteStep, removeStep} from "./steps.actions";

@Injectable()
export class StepsEffects {

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
            }
        )
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
