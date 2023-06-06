import {Component, effect, EventEmitter, Input, OnChanges, Output, signal, WritableSignal} from '@angular/core';
import {BehaviorSubject, map, Observable, take} from "rxjs";
import {Category, IFurniture, Komplekt} from "../../../furniture/furniture.types";
import {IMap} from "../map.types";

import {FurnitureService} from "../../../furniture/furniture.service";
import {MapService} from "../map.service";

import {Store} from "@ngrx/store";
import {setMap} from "../store/map.actions";
import {MapState} from "../store/map.reducer";
import {environment} from "../../../../../environments/environment";
import {deleteMap, getMaps} from "../store/maps.actions";
import {mapModalState} from "../map-modal/map-modal.component";
import * as mapsSelect from '../store/maps.selectors';

@Component({
    selector: 'map-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnChanges {

    @Input() mapId: number;
    @Output() mapIdChange = new EventEmitter<number>();

    //category
    categories$: Observable<Category[]>;
    category_id$: BehaviorSubject<number> = new BehaviorSubject(null);

    //komplekt
    komplekts$: Observable<Komplekt[]>;
    komplekts: Komplekt[];
    komplekt_id$: BehaviorSubject<number> = new BehaviorSubject(null);

    //furniture
    furnitures$: Observable<IFurniture[]>;
    furniture_id$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

    //map is version
    maps$: Observable<IMap[]>;
    mapOptions$: Observable<{ id: number, version: string }[]>;

    map_id: WritableSignal<number> = signal(null);
    map: WritableSignal<IMap> = signal(null);

    constructor(private _furnitureService: FurnitureService,
                private _mapService: MapService,
                private store: Store<{ cost: MapState, maps: IMap[] }>) {


        this.maps$ = store.select('maps')
        this.mapOptions$ = store.select(mapsSelect.selectMapOptions)

        //map_id o'zgarsa store ni ham o'zgartirish
        effect(() => {
            const map_id = this.map_id()

            if (map_id) {
                this.maps$.subscribe(maps => {
                    const map = maps.find(map => map.id === map_id)
                    this.store.dispatch(setMap(map))
                })
            } else {
                this.store.dispatch(setMap(null))
            }

            if (map_id !== this.mapId)
                this.mapIdChange.emit(map_id)

        }, {allowSignalWrites: true})
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
            this.map_id.set(null);

            this.store.dispatch(getMaps(furniture_id))
        })

        this.maps$.subscribe(maps => {
            if (maps.length === 1) {

                this.map_id.set(maps[0].id)

            } else if (maps.length > 1) {

                const map = maps.find(map => map.actual === true)

                if (map) {
                    this.map_id.set(map.id)
                } else {
                    this.map_id.set(maps[0].id)
                }

            } else {
                this.map_id.set(null)
            }
        })

        this.filterByDefault()
    }

    ngOnChanges() {

        if (this.mapId !== this.map_id())
            this.map_id.set(this.mapId)
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
            this.furnitures$ = new Observable<IFurniture[]>()
    }

    mapModalState: mapModalState = 'closed';

    openCreateMapModal() {
        this.mapModalState = 'create';
    }

    openEditMapModal() {
        this.mapModalState = 'update';
    }

    deleteMap() {
        const map_id = this.map_id()

        this.map_id.set(null)
        this.store.dispatch(deleteMap(map_id))
    }

    filterByDefault() {
        if (this.mapId) {
            console.log('this.mapId', this.mapId)

            this._mapService.getMap(this.mapId).pipe(
                take(1),
                map(response => response.data),
            ).subscribe((map: IMap) => {
                console.log('map', map)

                this.simulateFilter(map.furniture.category_id, map.furniture.komplekt_id, map.furniture_id, map.id);
            })

        } else {

            //temporary
            if (!environment.production) {
                this.simulateFilter(1, 3, 12);
            }
        }
    }

    simulateFilter(category_id: number, komplekt_id: number, furniture_id: number, map_id?: number) {

        this.category_id$.next(category_id);

        setTimeout(() => {
            this.komplekt_id$.next(komplekt_id);
        }, 1000)

        setTimeout(() => {
            this.furniture_id$.next(furniture_id);
        }, 2000)

        if (map_id)
            setTimeout(() => {
                this.map_id.set(map_id)
            }, 3000)
    }
}
