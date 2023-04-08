import {Component, Input} from '@angular/core';
import {IStep} from "../steps/step.type";
import {ISeh} from "../../../seh/seh.types";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

@Component({
    selector: 'map-unit-steps',
    templateUrl: './unit-steps.component.html',
    styleUrls: ['./unit-steps.component.scss']
})
export class UnitStepsComponent {

    @Input() steps: IStep[];
    @Input() sehs: ISeh[];

    cost$: Observable<number>;

    constructor(private store: Store<{ cost: number }>) {
        this.cost$ = store.select('cost');
    }

    getSehName(seh_id: number): string {
        const seh = this.sehs.find(seh => seh.id === seh_id)
        return seh?.name
    }

    onEditComplete(event) {
        let {
            field, data, index
        } = event

        console.log(field, data, index)

        if (field === 'percent') {

            this.cost$.subscribe(value => {
                // console.log({newCost: this.steps[index].percent * value / 100}, {value}, {percent: this.steps[index].percent})
                this.steps[index].cost = this.steps[index].percent * value / 100
            })
        }
    }
}
