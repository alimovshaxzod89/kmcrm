import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MapService} from "../map.service";
import {IMap} from "../map.types";
import {Store} from "@ngrx/store";
import {addMap} from "../store/maps.actions";

@Component({
    selector: 'create-map-modal',
    templateUrl: './create-map-modal.component.html',
    styleUrls: ['./create-map-modal.component.scss']
})
export class CreateMapModalComponent {

    @Input() opened: boolean;
    @Input() furniture_id: number;
    @Output() openedChange = new EventEmitter<boolean>();
    @Output() refreshList = new EventEmitter<void>()

    form = new FormGroup({
        version: new FormControl(''),
        description: new FormControl(''),
        cost: new FormControl(null),
        actual: new FormControl(false)
    })

    constructor(private _mapService: MapService,
                private store: Store) {
    }

    visibleChange(value: boolean) {
        if (value) {

        } else {
            this.openedChange.emit(false)

            //clear form
            // this.form.reset()
        }
    }

    submit() {

        const map: IMap = JSON.parse(JSON.stringify(this.form.value)) as IMap
        map.furniture_id = this.furniture_id

        this.store.dispatch(addMap(map))

        //clear form
        this.form.reset()
    }
}
