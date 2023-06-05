//ngrx effects

import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, EMPTY, exhaustMap, map, mergeMap, switchMap} from "rxjs";
import {doneTodo, getAllTodo, getAllTodoSuccess, receiveTodo} from "./todo.actions";
import {TodoService} from "../todo/todo.service";
import {getAllDone} from "./done.actions";

@Injectable()
export class TodoEffects {
    getTodos = createEffect(() => this.actions$.pipe(
        ofType(getAllTodo),
        exhaustMap(props => {
                return this.todoService.getAll(props.seh_id).pipe(
                    map(response => {
                            const todos = response.data
                            return getAllTodoSuccess(todos)
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

    receiveTodo = createEffect(() => this.actions$.pipe(
        ofType(receiveTodo),
        mergeMap(props => {
            return this.todoService.receive(props.id, props.seh_id).pipe(
                map(response => {
                        if (response.success) {
                            return getAllTodo({seh_id: props.seh_id})
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

    doneTodo = createEffect(() => this.actions$.pipe(
        ofType(doneTodo),
        mergeMap(props => {
            console.log('doneTodo', props)
            return this.todoService.done(props.id, props.seh_id).pipe(
                switchMap(response => {
                        if (response.success) {
                            return [
                                getAllTodo({seh_id: props.seh_id}),
                                getAllDone({seh_id: props.seh_id, date: props.date}),
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

    constructor(private actions$: Actions, private todoService: TodoService) {

    }
}
