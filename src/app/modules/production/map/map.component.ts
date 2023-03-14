import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../goods/category/category.service";
import {BehaviorSubject, Observable} from "rxjs";
import {tap} from 'rxjs/operators';
import {FurnitureService} from "../../furniture/furniture.service";
import {Category, Furniture, Komplekt} from "../../furniture/furniture.types";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
})
export class MapComponent implements OnInit {

    isLoading: boolean = false;

    formFieldHelpers: string[] = [''];

    category_id$: BehaviorSubject<number> = new BehaviorSubject(null);
    categories$: Observable<Category[]>;

    komplekts$: Observable<Komplekt[]>;
    komplekt_search = new FormControl<string | Komplekt>('');
    _filteredKomplekts: BehaviorSubject<Komplekt[]> = new BehaviorSubject(null);

    get filteredKomplekts$(): Observable<Komplekt[]> {
        return this._filteredKomplekts.asObservable()
    }

    komplekt$: BehaviorSubject<Komplekt> = new BehaviorSubject(null);
    komplekt_id$: BehaviorSubject<number> = new BehaviorSubject(null);


    constructor(private _productionService: CategoryService, private _furnitureService: FurnitureService) {
    }

    ngOnInit() {
        // this.isLoading = true;

        this.categories$ = this._furnitureService.categories$;
        this.komplekts$ = this._furnitureService.komplekts$;

        //for filteredKomplekts$
        this._furnitureService.komplekts$.pipe(
            tap(() => {
                this.filterKomplekts()
            })
        )
        this.category_id$.subscribe(() => {
            this.filterKomplekts()
        })
        this.komplekt_search.valueChanges.subscribe(
            value => {
                console.log(value)
                this.filterKomplekts()
            }
        )

        this.watchingForFurniture()

        this.watchingForFurnitureSearch()
    }

    filterKomplekts() {
        let items = []
        this.komplekts$.subscribe(_items => items = _items)

        const komplekt_name: string = typeof this.komplekt_search.value === 'string' ? this.komplekt_search.value : ''

        this._filteredKomplekts.next(items.filter(item => {

            let valid: boolean = true;

            if (this.category_id$.value) {
                if (item.category_id != this.category_id$.value)
                    valid = false
            }
            if (komplekt_name?.length) {
                if (!item.name.toLowerCase().includes(komplekt_name.toLowerCase()))
                    valid = false
            }

            return valid
        }))
    }


    furnitures$: Observable<Furniture[]>;

    loadFurnitures() {
        if (this.category_id$.value || this.komplekt_id$.value){
            console.log(this.category_id$.value)
            this.furnitures$ = this._furnitureService.getFurnitures(this.category_id$.value, this.komplekt_id$.value);
        }
        else
            this.furnitures$ = new Observable<Furniture[]>()
    }

    private watchingForFurniture() {

        //category_id changes
        this.category_id$.subscribe(() => {
            console.log('category_id changes')
            this.loadFurnitures()
        })

        //komplekt_search to kompekt_id
        this.komplekt_search.valueChanges.subscribe(komplekt => {
            if (typeof komplekt !== 'string' && komplekt?.id)
                this.komplekt_id$.next(komplekt?.id)
            else
                this.komplekt_id$.next(null)
        })

        //komplekt_id changes
        this.komplekt_id$.subscribe(() => this.loadFurnitures())
    }

    furniture_search = new FormControl<string | Furniture>('');
    furnitureCtrl = new FormControl<Furniture>(null);
    _filteredFurnitures: BehaviorSubject<Furniture[]> = new BehaviorSubject(null);

    get filteredFurnitures$(): Observable<Furniture[]> {
        return this._filteredFurnitures.asObservable()
    }

    private watchingForFurnitureSearch() {

        this.furniture_search.valueChanges.subscribe(value => {
            if (typeof value === 'string') {
                this.filterFurnitures(value)
            } else {
                this.filterFurnitures('')
            }
        })
    }

    private filterFurnitures(search: string) {
        let items = []
        this.furnitures$.subscribe(_items => items = _items)

        this._filteredFurnitures.next(items.filter(item => {

            let valid: boolean = true;

            if (search.length) {
                if (!item.name.toLowerCase().includes(search.toLowerCase()))
                    valid = false
            }

            return valid
        }))
    }


    displayFn(item: Komplekt | Category): string {
        return item?.name;
    }
}
