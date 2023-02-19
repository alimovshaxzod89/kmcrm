import { Route } from '@angular/router';
import { CategoryComponent } from 'app/modules/goods/category/category.component';
import { CategoryListComponent } from 'app/modules/goods/category/list/list.component';
import {CategoriesResolver, UnitsResolver} from 'app/modules/goods/category/category.resolvers';

export const ecommerceRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'category'
    },
    {
        path     : 'category',
        component: CategoryComponent,
        children : [
            {
                path     : '',
                component: CategoryListComponent,
                resolve  : {
                    categories  : CategoriesResolver,
                    units: UnitsResolver
                }
            }
        ]
        /*children : [
            {
                path     : '',
                component: ContactsListComponent,
                resolve  : {
                    tasks    : ContactsResolver,
                    countries: ContactsCountriesResolver
                },
                children : [
                    {
                        path         : ':id',
                        component    : ContactsDetailsComponent,
                        resolve      : {
                            task     : ContactsContactResolver,
                            countries: ContactsCountriesResolver
                        },
                        canDeactivate: [CanDeactivateContactsDetails]
                    }
                ]
            }
        ]*/
    }
];
