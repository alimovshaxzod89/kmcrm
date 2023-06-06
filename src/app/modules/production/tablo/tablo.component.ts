import {Component, effect, OnInit, signal, WritableSignal} from '@angular/core';
import {formatDate} from "@angular/common";
import {Store} from "@ngrx/store";
import {map, Observable, Subject} from "rxjs";
import {loadEarning} from "./store/earning.actions";
import {UserService} from "../../../core/user/user.service";
import {ISeh} from "../../seh/seh.types";

@Component({
    selector: 'app-tablo',
    templateUrl: './tablo.component.html',
    styleUrls: ['./tablo.component.scss']
})
export class TabloComponent implements OnInit {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    seh: WritableSignal<ISeh> = signal({} as ISeh);
    seh_id: number;
    seh_name: string;

    date: string;

    //todo
    earning$: Observable<number>;

    constructor(private store: Store<{ earning: number }>,
                private _userService: UserService) {
        //current date
        this.date = formatDate(new Date(), 'yyyy-MM-dd', 'uz-Cyrl');

        this.earning$ = store.select('earning');

        effect(() => {
            this.seh_id = this.seh().id;
            this.seh_name = this.seh().name;

            if (this.seh_id)
                this.loadEarning();

        }, {allowSignalWrites: true})

    }

    ngOnInit(): void {
        this._userService.seh$.subscribe(seh => {
            this.seh.set(seh);
        })
    }

    loadEarning() {
        const seh_id = this.seh().id;
        console.log({seh_id})
        this.store.dispatch(loadEarning({seh_id, date: this.date}));
    }
}
