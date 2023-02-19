import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { CategoryService } from 'app/modules/goods/category/category.service';
import {InventoryPagination, Category, Unit} from 'app/modules/goods/category/category.types';

@Injectable({
    providedIn: 'root'
})
export class CategoryResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _categoryService: CategoryService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category>
    {
        return this._categoryService.getCategoryById(parseInt(route.paramMap.get('id')))
                   .pipe(
                       // Error here means the requested category is not available
                       catchError((error) => {

                           // Log the error
                           console.error(error);

                           // Get the parent url
                           const parentUrl = state.url.split('/').slice(0, -1).join('/');

                           // Navigate to there
                           this._router.navigateByUrl(parentUrl);

                           // Throw an error
                           return throwError(error);
                       })
                   );
    }
}

@Injectable({
    providedIn: 'root'
})
export class CategoriesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _categoryService: CategoryService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: InventoryPagination; data: Category[] }>
    {
        return this._categoryService.getCategories();
    }
}


@Injectable({
    providedIn: 'root'
})
export class UnitsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _categoryService: CategoryService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Unit[]>
    {
        return this._categoryService.getUnits();
    }
}
