//ngrx actions
import {createAction, props} from "@ngrx/store";
import {ITodo} from "../todo/todo.type";

export const getAllTodo = createAction('[Todo] Get All', props<{ seh_id: number }>());

export const getAllTodoSuccess = createAction('[Todo] Get All Success', (data: ITodo[]) => ({data}));

export const receiveTodo = createAction('[Todo] Receive', (id: number, seh_id: number) => ({id, seh_id}));

export const doneTodo = createAction('[Todo] Done Todo', props<{ id: number, seh_id: number, date: string }>());


