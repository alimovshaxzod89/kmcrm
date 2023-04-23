import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, EMPTY, exhaustMap, map} from "rxjs";
import {Injectable} from "@angular/core";
import {MapService} from "../map.service";
import {saveCost, savedMapCost} from "./map.actions";

@Injectable()
export class MapEffects {

    saveCost = createEffect(() => this.actions$.pipe(
        ofType(saveCost),
        exhaustMap(props => this.mapService.saveMapCost(props.map_id, props.cost)
            .pipe(
                map(response => {
                    if (response.success) {
                        return savedMapCost({cost: props.cost})
                    } else {
                        alert(response.message)
                        console.log(response.message)
                    }
                }),
                catchError(() => {
                    alert('Ошибка сохранения')
                    return EMPTY
                })
            )
        ),
    ));

    // setNotSaved$ = createEffect(() => this.actions$.pipe(
    //     ofType(setCost),
    //     exhaustMap(props => [setSaved({saved: false})])
    // ));

    constructor(private actions$: Actions,
                private mapService: MapService) {
    }
}
