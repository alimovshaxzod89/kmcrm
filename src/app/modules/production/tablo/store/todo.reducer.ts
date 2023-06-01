//ngrx reducer

import {createReducer, on} from "@ngrx/store";
import {getAllTodoSuccess} from "./todo.actions";
import {ITodo} from "../todo/todo.type";

export interface TodoState {
    todos: ITodo[]
}

export const initialState: ITodo[] = []

export const todoReducer = createReducer(
    initialState,

    on(getAllTodoSuccess, (state, {data: todos}) => todos),
);
