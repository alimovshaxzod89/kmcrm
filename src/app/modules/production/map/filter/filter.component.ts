import {Component, effect, EventEmitter, Output, signal, WritableSignal} from '@angular/core';
import {BehaviorSubject, Observable, take} from "rxjs";
import {Category, Furniture, Komplekt} from "../../../furniture/furniture.types";
import {IMap} from "../map.types";

import {FurnitureService} from "../../../furniture/furniture.service";
import {MapService} from "../map.service";

import {Store} from "@ngrx/store";
import {setMap} from "../store/map.actions";
import {MapState} from "../store/map.reducer";
import {environment} from "../../../../../environments/environment";
import {getMaps} from "../store/maps.actions";

@Component({
    selector: 'map-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

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

    //map is version
    maps$: Observable<IMap[]>;

    map: WritableSignal<IMap> = signal(null);

    constructor(private _furnitureService: FurnitureService,
                private _mapService: MapService,
                private store: Store<{ cost: MapState, maps: IMap[] }>) {

        //map o'zgarsa store ni ham o'zgartirish
        effect(() => {
            const map = this.map()

            this.store.dispatch(setMap(map))
            this.mapIdChange.emit(map?.id)
        }, {allowSignalWrites: true})

        this.maps$ = store.select('maps')
    }

    ngOnInit() {

        this.categories$ = this._furnitureService.categories$;
        this.komplekts$ = this._furnitureService.komplekts$;

        this.store.dispatch(getMaps(this.furniture_id$.value))

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

        this.furniture_id$.subscribe(furniture_id => {
            this.map.set(null);

            this.store.dispatch(getMaps(furniture_id))
        })

        this.maps$.subscribe(maps => {
            if (maps.length === 1) {
                this.map.set(maps[0])
            } else if (maps.length > 1) {
                maps.forEach(map => {
                    if (map.actual === true) {
                        this.map.set(map)
                    }
                })
            }
        })

        //temporary
        if (!environment.production) {
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

    log(value) {
        console.log({value})
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

    createMapModalIsOpened: boolean = false;

    openCreateMapModal() {
        this.createMapModalIsOpened = true
    }
}
