import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Observable, take} from "rxjs";
import {Category, Furniture, Komplekt} from "../../../furniture/furniture.types";
import {DropDownFilterSettings} from "@progress/kendo-angular-dropdowns";
import {FurnitureService} from "../../../furniture/furniture.service";
import {IMap} from "../map.types";
import {MapService} from "../map.service";
import {Store} from "@ngrx/store";
import {setCost} from "../store/cost.actions";

@Component({
    selector: 'map-filter-kui',
    templateUrl: './filter-kui.component.html',
    styleUrls: ['./filter-kui.component.scss']
})
export class FilterKuiComponent implements OnInit {

    @Output() mapIdChange = new EventEmitter<number>();

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
    furniture_work_cost$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

    //map is version
    maps$: Observable<IMap[]>;
    map$: BehaviorSubject<IMap> = new BehaviorSubject<IMap>(null)

    cost$: Observable<number>;

    public filterSettings: DropDownFilterSettings = {
        caseSensitive: false,
        operator: 'contains'
    };

    constructor(private _furnitureService: FurnitureService,
                private _mapService: MapService,
                private store: Store<{ cost: number }>) {

        this.cost$ = store.select('cost');
    }


    ngOnInit() {

        this.categories$ = this._furnitureService.categories$;
        this.komplekts$ = this._furnitureService.komplekts$;
        this.maps$ = this._mapService.getMaps(this.furniture_id$.value);

        //for filteredKomplekts$
        this._furnitureService.komplekts$
            .subscribe(value => {
                this.komplekts = value
            })

        this.category_id$.subscribe((value) => {
            this.komplekt_id$.next(null);
            this.komplekts = this.getKomplekts(value)

            this.loadFurnitures()
        })

        this.komplekt_id$.subscribe(() => {
            this.furniture_id$.next(null);
            this.loadFurnitures()
        })

        this.furniture_id$.subscribe(() => {
            this.map$.next(null);
            this.loadMaps();
            this.loadFurnitures()
        })

        this.map$.subscribe(value => {
            console.log({map: value}, value?.furniture_id, value?.cost)
            this.furniture_work_cost$.next(value?.cost)

            this.store.dispatch(setCost({cost: value?.cost}))

            this.mapIdChange.emit(value?.id)
        })


        //temporary
        {
            setTimeout(() => {
                this.category_id$.next(1);
            }, 500)

            setTimeout(() => {
                this.komplekt_id$.next(3);
            }, 1500)

            setTimeout(() => {
                this.furniture_id$.next(12);
            }, 2000)
        }
    }

    getKomplekts(category_id): Komplekt[] {
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
            this.furnitures$ = this._furnitureService.getFurnitures(this.category_id$.value, this.komplekt_id$.value);
        } else
            this.furnitures$ = new Observable<Furniture[]>()
    }

    loadMaps(): void {
        if (this.furniture_id$.value) {
            this.maps$ = this._mapService.getMaps(this.furniture_id$.value);

            this.maps$.subscribe((value: IMap[]) => {
                if (value.length === 1) {
                    this.map$.next(value[0])
                }
            })

        } else
            this.maps$ = new Observable<IMap[]>()
    }
}
