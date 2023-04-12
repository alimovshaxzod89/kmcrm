import {Component, OnInit} from '@angular/core';
import {FurnitureService} from "../../furniture/furniture.service";
import {BehaviorSubject, Observable} from "rxjs";
import {IUnit} from "./units/unit.type";
import {UnitService} from "./units/unit.service";
import {ISeh} from "../../seh/seh.types";
import {SehService} from "../../seh/seh.service";
import {Store} from "@ngrx/store";
import {IStep} from "./steps/step.type";
import {setUnits} from "./store/units.actions";
import {StepService} from "./steps/step.service";
import {calcStepsCost, setSteps} from "./store/steps.actions";

@Component({
    selector: 'app-map',
    styleUrls: ['./map.component.scss'],
    templateUrl: './map.component.html',
})
export class MapComponent implements OnInit {

    isLoading: boolean = false;
    map_id$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    unit_id: number = null;

    sehs$: Observable<ISeh[]>;

    units$: Observable<IUnit[]>;
    steps$: Observable<IStep[]>;

    cost$: Observable<number>;

    constructor(private _furnitureService: FurnitureService,
                private _unitService: UnitService,
                private _stepService: StepService,
                private _sehService: SehService,
                private store: Store<{ cost: number, units: IUnit[], steps: IStep[] }>) {
        this.cost$ = store.select('cost');
        this.units$ = store.select('units');
        this.steps$ = store.select('steps');
    }

    ngOnInit() {
        // this.isLoading = true;

        this.loadUnitsToStore()

        this.loadStepsToStore()

        this.cost$.subscribe(cost => {
            console.log('cost', cost)
            this.store.dispatch(calcStepsCost({cost: cost}))
        })

        //load sehs
        this._sehService.getSehs().subscribe(() => {
        });
        this.sehs$ = this._sehService.sehs$;
    }

    private loadUnitsToStore() {
        this.map_id$.subscribe(map_id => {
            if (map_id) {
                this._unitService.getUnits(map_id).subscribe(units => {
                    this.store.dispatch(setUnits({units: units}))
                })
            } else {
                this.store.dispatch(setUnits({units: []}))
            }
        })
    }

    private loadStepsToStore() {
        this.units$.subscribe(units => {
            if (units.length) {

                //make unit_ids array
                let unit_ids = []
                units.forEach(unit => {
                    unit_ids.push(unit.id)
                })

                this._stepService.getSteps(unit_ids).subscribe(steps => {
                    this.store.dispatch(setSteps({steps: steps}))
                })
            } else {
                this.store.dispatch(setSteps({steps: []}))
            }
        })
    }

}
