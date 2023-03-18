import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs";
import {IUnit} from "./unit.type";
import {UnitService} from "./unit.service";

@Component({
    selector: 'map-units',
    templateUrl: './units.component.html',
    styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit, OnChanges {

    @Input() map_id: number;

    units$: Observable<IUnit[]>;

    constructor(private _unitService: UnitService) {
    }

    ngOnInit(): void {

        this.units$ = this._unitService.getUnits(this.map_id)

        this.units$.subscribe(value => {
            console.log(this.map_id, value)
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.map_id) {
            this.units$ = this._unitService.getUnits(changes.map_id.currentValue)
        }
    }

}
