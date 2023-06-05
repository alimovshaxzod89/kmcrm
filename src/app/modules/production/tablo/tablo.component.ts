import {Component, OnInit} from '@angular/core';
import {formatDate} from "@angular/common";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {loadEarning} from "./store/earning.actions";

@Component({
    selector: 'app-tablo',
    templateUrl: './tablo.component.html',
    styleUrls: ['./tablo.component.scss']
})
export class TabloComponent implements OnInit {

    seh_id: number = 28;

    date: string;

    //todo
    earning$: Observable<number>;

    constructor(private store: Store<{ earning: number }>) {
        //current date
        this.date = formatDate(new Date(), 'yyyy-MM-dd', 'uz-Cyrl');

        this.earning$ = store.select('earning');
    }

    ngOnInit(): void {
        this.store.dispatch(loadEarning({seh_id: this.seh_id, date: this.date}));
    }

}
