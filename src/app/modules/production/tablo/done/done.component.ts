import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs";
import {IDone} from "./done.type";
import {DoneService} from "./done.service";
import {Store} from "@ngrx/store";
import {getAllDone, unDone} from "../store/done.actions";

@Component({
    selector: 'tablo-done',
    templateUrl: './done.component.html',
    styleUrls: ['./done.component.scss']
})
export class DoneComponent implements OnInit, OnChanges {

    @Input() seh_id: number;
    @Input() date: string;

    rows$: Observable<IDone[]>

    constructor(private _doneService: DoneService,
                private store: Store<{ dones: IDone[] }>) {

        this.rows$ = this.store.select('dones');
    }

    ngOnInit(): void {
        if (this.seh_id)
            this.store.dispatch(getAllDone({seh_id: this.seh_id, date: this.date}));
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.seh_id) {
            if (this.seh_id)
                this.store.dispatch(getAllDone({seh_id: this.seh_id, date: this.date}));
        }
    }

    cancel(row: IDone) {

        this.store.dispatch(unDone({id: row.id, seh_id: this.seh_id, date: this.date}));
    }

    info(row: IDone) {
        //todo
    }
}
