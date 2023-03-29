import {Component, Input} from '@angular/core';
import {IStep} from "../steps/step.type";
import {ISeh} from "../../../seh/seh.types";

@Component({
    selector: 'map-unit-steps',
    templateUrl: './unit-steps.component.html',
    styleUrls: ['./unit-steps.component.scss']
})
export class UnitStepsComponent {
    // @Input unit_id: number;
    @Input() steps: IStep[];
    @Input() sehs: ISeh[];

    displayedColumns: string[] = [
        '#', 'seh', 'percent', 'cost',
        'duration', 'description', 'actions'
    ];

    getSehName(seh_id: number): string {
        const seh = this.sehs.find(seh => seh.id === seh_id)
        return seh?.name
    }

}
