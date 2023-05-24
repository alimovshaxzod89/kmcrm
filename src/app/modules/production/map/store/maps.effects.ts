import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, EMPTY, exhaustMap, map, mergeMap, of} from "rxjs";
import {Injectable} from "@angular/core";
import {MapService} from "../map.service";
import {addMap, deleteMap, getMaps, removeMap, savedMap, saveMap, setMaps} from "./maps.actions";

@Injectable()
export class MapsEffects {

    getMaps = createEffect(() => this.actions$.pipe(
        ofType(getMaps),
        exhaustMap(props => {
            if (props.furniture_id) {
                return this.mapsService.getMaps(props.furniture_id)
                    .pipe(
                        map(response => {
                            const maps = response.data
                            return setMaps({maps})
                        }),
                        catchError(err => {
                            console.log({err})
                            const errMsg = err?.error?.message
                            alert('Ошибка: ' + errMsg)
                            return EMPTY
                        })
                    )
            } else {
                return of(setMaps({maps: []}))
            }
        })
    ));

    addMap = createEffect(() => this.actions$.pipe(
        ofType(addMap),
        mergeMap(props => {
                return this.mapsService.addMap(props.map)
                    .pipe(
                        map(response => {
                            if (response.success) {
                                return getMaps(props.map.furniture_id)
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

    saveMap = createEffect(() => this.actions$.pipe(
        ofType(saveMap),
        mergeMap(props => {
                return this.mapsService.saveMap(props.map)
                    .pipe(
                        map(response => {
                            if (response.success) {
                                return savedMap({map: response.data, map_id: props.map.id})
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

    deleteMap = createEffect(() => this.actions$.pipe(
        ofType(deleteMap),
        mergeMap(props => {
                return this.mapsService.deleteMap(props.map_id)
                    .pipe(
                        map(response => {
                            if (response.success) {
                                return removeMap({map_id: props.map_id})
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
                private mapsService: MapService) {
    }
}
