import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, EMPTY, exhaustMap, map, of} from "rxjs";
import {unDone} from "./done.actions";
import {doneTodo} from "./todo.actions";
import {TabloService} from "../tablo.service";
import {loadEarning, setEarning} from "./earning.actions";

@Injectable()
export class EarningEffects {
    load = createEffect(() => this.actions$.pipe(
        ofType(loadEarning),
        exhaustMap(props => {
                console.log('loadEarning')
                return this._tabloService.load(props.seh_id, props.date).pipe(
                    map(response => {
                            return setEarning({value: response.data})
                        }
                    ),
                    catchError(err => {
                        const errMsg = err?.error?.message

                        if (err.status !== 401)
                            alert('Ошибка: ' + errMsg)

                        return EMPTY
                    })
                )
            }
        ))
    )

    loading = createEffect(() => this.actions$.pipe(
        ofType(doneTodo, unDone),
        exhaustMap(props => {
            console.log('doneTodo or unDone action fired')
            return of(loadEarning({seh_id: props.seh_id, date: props.date}))
        })
    ))

    constructor(private actions$: Actions, private _tabloService: TabloService) {

    }
}
