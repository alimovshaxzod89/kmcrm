import {Component, Input, OnInit} from '@angular/core';
import {ITodo} from "./todo.type";
import {Observable} from "rxjs";
import {TodoService} from "./todo.service";
import {Store} from "@ngrx/store";
import {doneTodo, getAllTodo, receiveTodo} from "../store/todo.actions";
import {IDone} from "../done/done.type";

@Component({
    selector: 'tablo-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

    @Input() seh_id: number;
    @Input() date: string;

    rows$: Observable<ITodo[]>;

    constructor(private _todoService: TodoService,
                private store: Store<{ todos: ITodo[] }>) {

        this.rows$ = store.select('todos');
    }

    ngOnInit(): void {
        this.store.dispatch(getAllTodo({seh_id: this.seh_id}));
    }

    done(row: ITodo) {
        this.store.dispatch(doneTodo({id: row.id, seh_id: this.seh_id, date: this.date}));
    }

    receive(row: ITodo) {
        this.store.dispatch(receiveTodo(row.id, this.seh_id));
    }

    info(row: IDone) {
        //todo
    }
}
