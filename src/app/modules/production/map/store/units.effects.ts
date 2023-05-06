import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, EMPTY, map, mergeMap} from "rxjs";
import {Injectable} from "@angular/core";
import {savedUnit, saveUnit, deleteUnit, removeUnit} from "./units.actions";
import {UnitService} from "../units/unit.service";

@Injectable()
export class UnitsEffects {

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
