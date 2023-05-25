import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Category, Furniture, Komplekt} from "../../../furniture/furniture.types";
import {FurnitureService} from "../../../furniture/furniture.service";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'map-filter-mui',
    templateUrl: './filter-mui.component.html',
    styleUrls: ['./filter-mui.component.scss']
})
export class FilterMuiComponent implements OnInit {

    //category
    category_id$: BehaviorSubject<number> = new BehaviorSubject(null);
    categories$: Observable<Category[]>;

    //komplekt
    komplekts$: Observable<Komplekt[]>;
    komplekt_id$: BehaviorSubject<number> = new BehaviorSubject(null);

    //furniture
    furnitures$: Observable<Furniture[]>;
    furniture_search = new FormControl<string | Furniture>('');
    furnitureCtrl = new FormControl<Furniture>(null);
    _filteredFurnitures: BehaviorSubject<Furniture[]> = new BehaviorSubject(null);

    get filteredKomplekts$(): Observable<Komplekt[]> {
        return this._filteredKomplekts.asObservable()
    }

    get filteredFurnitures$(): Observable<Furniture[]> {
        return this._filteredFurnitures.asObservable()
    }

    formFieldHelpers: string[] = [''];

    constructor(private _furnitureService: FurnitureService) {
    }

    ngOnInit(): void {
        // this.isLoading = true;

        this.categories$ = this._furnitureService.categories$;
        this.komplekts$ = this._furnitureService.komplekts$;

        //for filteredKomplekts$
        this._furnitureService.komplekts$.pipe(
            tap(value => {
                this.filterKomplekts()
            })
        )

        this.category_id$.subscribe((value) => {

            this.filterKomplekts()
        })

        this.komplekt_search.valueChanges.subscribe(
            value => {
                this.filterKomplekts()
            }
        )

        this.watchingForFurniture()

        this.watchingForFurnitureSearch()
    }


    displayFn(item: Komplekt | Category): string {
        return item?.name;
    }

    private watchingForFurniture() {

        //category_id changes
        this.category_id$.subscribe(() => {
            this.loadFurnitures()
        })

        // komplekt_search to kompekt_id
        this.komplekt_search.valueChanges.subscribe(komplekt => {
            if (typeof komplekt !== 'string' && komplekt?.id)
                this.komplekt_id$.next(komplekt?.id)
            else
                this.komplekt_id$.next(null)
        })

        //komplekt_id changes
        this.komplekt_id$.subscribe(() => this.loadFurnitures())
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

    loadFurnitures() {
        if (this.category_id$.value || this.komplekt_id$.value) {
            this.furnitures$ = this._furnitureService.getFurnitures(this.category_id$.value, this.komplekt_id$.value);
        } else
            this.furnitures$ = new Observable<Furniture[]>()
    }

    komplekt_search = new FormControl<string | Komplekt>('');
    _filteredKomplekts: BehaviorSubject<Komplekt[]> = new BehaviorSubject(null);

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

}
