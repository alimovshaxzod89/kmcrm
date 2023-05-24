import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, EMPTY, exhaustMap, map, mergeMap, of} from "rxjs";
import {Injectable} from "@angular/core";
import {deleteUnit, getUnits, removeUnit, savedUnit, saveUnit, setUnits} from "./units.actions";
import {UnitService} from "../units/unit.service";

@Injectable()
export class UnitsEffects {

    getUnits = createEffect(() => this.actions$.pipe(
        ofType(getUnits),
        exhaustMap(props => {
                if (props.map_id) {
                    return this.unitsService.getUnits(props.map_id).pipe(
                        map(response => {
                                const units = response.data
                                return setUnits({units})
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
                    return of(setUnits({units: []}))
                }
            }
        )
    ))

    saveUnit = createEffect(() => this.actions$.pipe(
        ofType(saveUnit),
        mergeMap(props => {
                return this.unitsService.saveUnit(props.unit)
                    .pipe(
                        map(response => {
                            if (response.success) {
                                return savedUnit({unit: response.data, unit_id: props.unit.id})
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

    deleteUnit = createEffect(() => this.actions$.pipe(
        ofType(deleteUnit),
        mergeMap(props => {
                return this.unitsService.deleteUnit(props.unit)
                    .pipe(
                        map(response => {
                            if (response.success) {
                                return removeUnit({unit: props.unit})
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
                private unitsService: UnitService) {
    }
}
