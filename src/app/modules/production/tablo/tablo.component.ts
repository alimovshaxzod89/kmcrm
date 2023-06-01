import {Component} from '@angular/core';
import {formatDate} from "@angular/common";

@Component({
    selector: 'app-tablo',
    templateUrl: './tablo.component.html',
    styleUrls: ['./tablo.component.scss']
})
export class TabloComponent {

    seh_id: number = 28;

    date: string;

    //todo
    earningForToday: number;

    constructor() {
        //current date
        this.date = formatDate(new Date(), 'yyyy-MM-dd', 'uz-Cyrl');
    }
}
