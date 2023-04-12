import {createAction, props} from "@ngrx/store";
import {IUnit} from "../units/unit.type";

export const setUnits = createAction("[Units] Set Units", props<{ units: IUnit[] }>());
