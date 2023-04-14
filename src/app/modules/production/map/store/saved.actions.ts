import { createAction, props } from '@ngrx/store';


export const setSaved = createAction('[Saved Component] SetSaved', props<{ saved: boolean }>());
