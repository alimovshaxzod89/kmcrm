import {Component, OnInit} from '@angular/core';
import {FurnitureService} from "../../furniture/furniture.service";

@Component({
    selector: 'app-map',
    styleUrls: ['./map.component.scss'],
    templateUrl: './map.component.html',
})
export class MapComponent implements OnInit {

    isLoading: boolean = false;
    map_id: number = null;

    constructor(private _furnitureService: FurnitureService) {
    }

    ngOnInit() {
        // this.isLoading = true;
    }

}
