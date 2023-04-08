import { createAction, props } from '@ngrx/store';


export const setCost = createAction('[Cost Component] SetCost', props<{ cost: number }>());
