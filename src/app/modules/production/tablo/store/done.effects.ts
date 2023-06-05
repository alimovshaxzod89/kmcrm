import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, EMPTY, exhaustMap, map, mergeMap, switchMap} from "rxjs";
import {getAllDone, getAllDoneSuccess, unDone} from "./done.actions";
import {DoneService} from "../done/done.service";
import {getAllTodo} from "./todo.actions";

@Injectable()
export class DoneEffects {
    getDones = createEffect(() => this.actions$.pipe(
        ofType(getAllDone),
        exhaustMap(props => {
                return this._doneService.getAll(props.seh_id, props.date).pipe(
                    map(response => {
                            const todos = response.data
                            return getAllDoneSuccess(todos)
                        }
                    ),
                    catchError(err => {
                        console.error({err})
                        const errMsg = err?.error?.message
                        alert('Ошибка: ' + errMsg)
                        return EMPTY
                    })
                )
            }
        )
    ))

    undone = createEffect(() => this.actions$.pipe(
        ofType(unDone),
        mergeMap(props => {
            console.log('undone', props)
            return this._doneService.undone(props.id, props.seh_id).pipe(
                switchMap(response => {
                        if (response.success) {
                            return [
                                getAllDone({seh_id: props.seh_id, date: props.date}),
                                getAllTodo({seh_id: props.seh_id})
                            ]
                        } else {
                            alert(response.message)
                            console.error(response.message)
                        }
                    }
                ),
                catchError(err => {
                        console.error({err})
                        const errMsg = err?.error?.message
                        alert('Ошибка: ' + errMsg)
                        return EMPTY
                    }
                )
            )
        })
    ))

    constructor(private actions$: Actions, private _doneService: DoneService) {

    }
}
