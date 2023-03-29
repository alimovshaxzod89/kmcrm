import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IUnit} from "../units/unit.type";
import {BehaviorSubject} from "rxjs";
import {IStep} from "./step.type";
import {StepService} from "./step.service";
import {ISeh} from "../../../seh/seh.types";

@Component({
    selector: 'map-steps',
    templateUrl: './steps.component.html',
    styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit, OnChanges {

    @Input() units: IUnit[];
    @Input() sehs: ISeh[];

    steps$: BehaviorSubject<IStep[]> = new BehaviorSubject<IStep[]>([])

    stepsByUnitId: Object

    constructor(private _stepService: StepService) {
    }

    ngOnInit(): void {

        this.steps$.subscribe(steps => {
            this.stepsByUnitId = []
            this.units.forEach(unit => {
                this.stepsByUnitId[unit.id] = []

                steps.forEach(step => {
                    if (step.unit_id == unit.id) {
                        this.stepsByUnitId[unit.id].push(step)
                    }
                })
            })
        })
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.units) {
            this.getSteps()
        }

    }

    getSteps() {

        let unit_ids = []
        this.units.forEach(item => {
            unit_ids.push(item.id)
        })

        if (unit_ids.length) {
            this._stepService.getSteps(unit_ids).subscribe(value => {
                this.steps$.next(value)
            })
        } else {
            this.steps$.next([])
        }

    }

}
