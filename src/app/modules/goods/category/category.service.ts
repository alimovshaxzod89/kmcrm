import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { InventoryPagination, Category, Unit } from 'app/modules/goods/category/category.types';

@Injectable({
    providedIn: 'root'
})
export class CategoryService
{
    // Private
    private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    private _category: BehaviorSubject<Category | null> = new BehaviorSubject(null);
    private _categories: BehaviorSubject<Category[] | null> = new BehaviorSubject(null);

    private _units: BehaviorSubject<Unit[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    /**
     * Getter for brands
     */
    get units$(): Observable<Unit[]>
    {
        return this._units.asObservable();
    }

    /**
     * Getter for pagination
     */
    get pagination$(): Observable<InventoryPagination>
    {
        return this._pagination.asObservable();
    }

    /**
     * Getter for category
     */
    get category$(): Observable<Category>
    {
        return this._category.asObservable();
    }

    /**
     * Getter for categories
     */
    get categories$(): Observable<Category[]>
    {
        return this._categories.asObservable();
    }

    /**
     * Get categories
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getCategories(page: number = 0, size: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
        Observable<{ pagination: InventoryPagination; data: Category[] }>
    {
        return this._httpClient.get<{ pagination: InventoryPagination; data: Category[] }>('http://localhost:8091/api/good-categories', {
            params: {
                page: '' + (page+1),
                size: '' + size,
                orderBy: sort,
                sortedBy: order,
                search
            }
        }).pipe(
            tap((response) => {
                this._pagination.next(response.pagination);
                this._categories.next(response.data);
            })
        );
    }
    /**
     * Get category by id
     */
    getCategoryById(id: number): Observable<Category>
    {
        return this._categories.pipe(
            take(1),
            map((categories) => {

                // Find the category
                const category = categories.find(item => item.id === id) || null;

                // Update the category
                this._category.next(category);

                // Return the category
                return category;
            }),
            switchMap((category) => {

                if ( !category )
                {
                    return throwError('Could not found category with id of ' + id + '!');
                }

                return of(category);
            })
        );
    }


    /**
     * Get brands
     */
    getUnits(): Observable<Unit[]>
    {
        return this._httpClient.get<Unit[]>('http://localhost:8091/api/units-all').pipe(
            tap((units) => {
                this._units.next(units);
            })
        );
    }

    /**
     * Create category
     */
    createCategory(): Observable<Category>
    {
        return this.categories$.pipe(
            take(1),
            switchMap(categories => this._httpClient.post<Category>('api/apps/ecommerce/inventory/category', {}).pipe(
                map((newCategory) => {

                    // Update the categories with the new category
                    this._categories.next([newCategory, ...categories]);

                    // Return the new category
                    return newCategory;
                })
            ))
        );
    }

    /**
     * Update category
     *
     * @param id
     * @param category
     */
    updateCategory(id: number, category: Category): Observable<Category>
    {
        return this.categories$.pipe(
            take(1),
            switchMap(categories => this._httpClient.patch<Category>('api/apps/ecommerce/inventory/category', {
                id,
                category
            }).pipe(
                map((updatedCategory) => {

                    // Find the index of the updated category
                    const index = categories.findIndex(item => item.id === id);

                    // Update the category
                    categories[index] = updatedCategory;

                    // Update the categories
                    this._categories.next(categories);

                    // Return the updated category
                    return updatedCategory;
                }),
                switchMap(updatedCategory => this.category$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() => {

                        // Update the category if it's selected
                        this._category.next(updatedCategory);

                        // Return the updated category
                        return updatedCategory;
                    })
                ))
            ))
        );
    }

    /**
     * Delete the category
     *
     * @param id
     */
    deleteCategory(id: number): Observable<boolean>
    {
        return this.categories$.pipe(
            take(1),
            switchMap(categories => this._httpClient.delete('api/apps/ecommerce/inventory/category', {params: {id}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted category
                    const index = categories.findIndex(item => item.id === id);

                    // Delete the category
                    categories.splice(index, 1);

                    // Update the categories
                    this._categories.next(categories);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }
}
