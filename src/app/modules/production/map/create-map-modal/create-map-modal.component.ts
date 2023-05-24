import {
    Component,
    effect,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    signal,
    SimpleChanges,
    WritableSignal
} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MapService} from "../map.service";
import {IMap} from "../map.types";
import {Store} from "@ngrx/store";
import {addMap, saveMap} from "../store/maps.actions";
import {take} from "rxjs";

export type mapModalState = 'create' | 'update' | 'closed'

@Component({
    selector: 'create-map-modal',
    templateUrl: './create-map-modal.component.html',
    styleUrls: ['./create-map-modal.component.scss']
})
export class CreateMapModalComponent implements OnChanges {

    @Input() state: mapModalState;
    @Output() stateChange = new EventEmitter<mapModalState>();

    @Input() furniture_id?: number | null;
    @Input() map_id?: number | null;

    opened: WritableSignal<boolean> = signal(false);

    form = new FormGroup({
        id: new FormControl(null),
        version: new FormControl(''),
        description: new FormControl(''),
        cost: new FormControl(null),
        actual: new FormControl(false)
    })

    constructor(private _mapService: MapService,
                private store: Store<{ maps: IMap[] }>) {

        effect(() => {
            const opened = this.opened()

            if (opened === false)
                this.close()
        })
    }

    ngOnChanges(changed: SimpleChanges): void {

        if (changed.state) {
            const state = changed.state.currentValue

            if (state !== 'closed') {
                this.opened.set(true)
            } else {
                this.opened.set(false)
            }

            if (state === 'update') {
                this.setFromMap(this.map_id)
            }
        }

    }

    setFromMap(id: number) {
        this.store.select('maps').pipe(
            take(1)
        ).subscribe(maps => {
            console.log('setFromMap', maps)
            const map = maps.find(map => map.id === id)
            this.form.patchValue(map)
        })
    }

    close(): void {
        this.stateChange.emit('closed')
        this.form.reset()
    }

    submit() {

        if (this.state === 'create') {

            const map: IMap = JSON.parse(JSON.stringify(this.form.value)) as IMap
            map.furniture_id = this.furniture_id

            this.store.dispatch(addMap(map))

        } else if (this.state === 'update') {

            const map: IMap = JSON.parse(JSON.stringify(this.form.value)) as IMap
            this.store.dispatch(saveMap(map))
        }

        this.close()
    }
}
