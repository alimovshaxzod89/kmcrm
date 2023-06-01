import {Component, effect, OnInit, signal, WritableSignal} from '@angular/core';
import {FurnitureService} from "../../furniture/furniture.service";
import {Observable} from "rxjs";
import {IUnit} from "./units/unit.type";
import {UnitService} from "./units/unit.service";
import {ISeh} from "../../seh/seh.types";
import {SehService} from "../../seh/seh.service";
import {TipService} from "../services/tip.service";
import {Store} from "@ngrx/store";
import {IStep} from "./steps/step.type";
import {getUnits} from "./store/units.actions";
import {StepService} from "./steps/step.service";
import {calcStepsCost, getSteps, saveStep} from "./store/steps.actions";
import {MapService} from "./map.service";

import {changeCost, saveCost} from "./store/map.actions";
import {MapState} from "./store/map.reducer";
import * as mapSelects from "./store/map.selectors";
import {ActivatedRoute, Data} from "@angular/router";
import {ITip} from "../types/tip.type";

@Component({
    selector: 'app-map',
    styleUrls: ['./map.component.scss'],
    templateUrl: './map.component.html',
})
export class MapComponent implements OnInit {

    map_id: WritableSignal<number | null> = signal<number | null>(null);
    unit_id: number = null;

    sehs: ISeh[];
    tips: ITip[];

    units$: Observable<IUnit[]>;
    steps$: Observable<IStep[]>;

    cost$: Observable<number>;

    data: Data;

    // saved$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    saved$: Observable<boolean>;

    constructor(private _furnitureService: FurnitureService,
                private _unitService: UnitService,
                private _stepService: StepService,
                private _sehService: SehService,
                private _tipService: TipService,
                private _mapService: MapService,
                private store: Store<{ cost: MapState, units: IUnit[], steps: IStep[] }>,
                private route: ActivatedRoute) {
        this.cost$ = store.select(store => store.cost.current);
        this.units$ = store.select('units');
        this.steps$ = store.select('steps');

        this.saved$ = store.select(mapSelects.selectSaved);

        this.tips = this.route.snapshot.data.tips
        this.sehs = this.route.snapshot.data.sehs
        const map_id = +this.route.snapshot.paramMap.get('id')
        if (map_id) {
            this.map_id.set(map_id)
        }

        effect(() => {
            const map_id = this.map_id();
            this.store.dispatch(getUnits({map_id}))
        }, {allowSignalWrites: true})
    }

    ngOnInit() {

        this.loadStepsToStore()

        this.cost$.subscribe(cost => {
            this.store.dispatch(calcStepsCost({cost: cost}))
        })
    }

    private loadStepsToStore() {
        this.units$.subscribe(units => {

            let unit_ids: number[] = []

            if (units.length) {

                //make unit_ids array
                units.forEach(unit => {
                    if (unit.id)
                        unit_ids.push(unit.id)
                })
            }

            this.store.dispatch(getSteps(unit_ids))
        })
    }

    protected changeCost(cost: number) {
        this.store.dispatch(changeCost(cost))
    }

    save() {
        console.info('saving')

        const map_id = this.map_id();

        let cost;
        this.cost$.subscribe(value => cost = value)

        //save cost
        this.store.dispatch(saveCost({map_id, cost}))

        //save steps
        let steps = [];
        this.steps$.subscribe(value => {
            steps = value
        })
        steps.forEach(step => {
            this.store.dispatch(saveStep({step}))
        })

    }
}
