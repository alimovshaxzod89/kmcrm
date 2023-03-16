import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, take} from "rxjs";
import {Category, Furniture, Komplekt} from "../../../furniture/furniture.types";
import {DropDownFilterSettings} from "@progress/kendo-angular-dropdowns";
import {FurnitureService} from "../../../furniture/furniture.service";

@Component({
  selector: 'map-filter-kui',
  templateUrl: './filter-kui.component.html',
  styleUrls: ['./filter-kui.component.scss']
})
export class FilterKuiComponent implements OnInit {

    isLoading: boolean = false;

    //category
    categories$: Observable<Category[]>;
    category_id$: BehaviorSubject<number> = new BehaviorSubject(null);

    //komplekt
    komplekts$: Observable<Komplekt[]>;
    komplekts: Komplekt[];
    komplekt_id$: BehaviorSubject<number> = new BehaviorSubject(null);

    //furniture
    furnitures$: Observable<Furniture[]>;
    furniture_id$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

    public filterSettings: DropDownFilterSettings = {
        caseSensitive: false,
        operator: 'contains'
    };

    constructor(private _furnitureService: FurnitureService) {
    }


    ngOnInit() {
        // this.isLoading = true;

        this.categories$ = this._furnitureService.categories$;
        this.komplekts$ = this._furnitureService.komplekts$;

        //for filteredKomplekts$
        this._furnitureService.komplekts$
            .subscribe(value => {
                this.komplekts = value
            })

        this.category_id$.subscribe((value) => {
            this.komplekts = this.getKomplekts(value)

            this.loadFurnitures()
        })
    }

    getKomplekts(category_id) {
        let komplekts = []

        this.komplekts$.pipe(take(1)).subscribe(value => komplekts = value)

        if (category_id === null) {
            return komplekts
        } else {
            return komplekts.filter(item => item.category_id == category_id)
        }
    }

    loadFurnitures() {
        if (this.category_id$.value || this.komplekt_id$.value) {
            console.log(this.category_id$.value, this.komplekt_id$.value)
            this.furnitures$ = this._furnitureService.getFurnitures(this.category_id$.value, this.komplekt_id$.value);
        } else
            this.furnitures$ = new Observable<Furniture[]>()
    }
}
