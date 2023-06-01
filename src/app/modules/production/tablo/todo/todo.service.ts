//create service
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITodo} from './todo.type';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    constructor(private _httpClient: HttpClient) {
    }

    getAll(seh_id: number): Observable<{ data: ITodo[], message: string, success: boolean }> {
        return this._httpClient.get<{
            data: ITodo[],
            message: string,
            success: boolean
        }>(`/api/production/seh-tablo/list-todo?seh_id=${seh_id}`);
    }

    receive(id: number, seh_id: number): Observable<{ data: ITodo, message: string, success: boolean }> {
        return this._httpClient.put<{
            data: ITodo,
            message: string,
            success: boolean
        }>(`/api/production/seh-tablo/receive/${id}`, {seh_id});
    }

    done(id: number, seh_id: number): Observable<{ data: ITodo, message: string, success: boolean }> {
        return this._httpClient.put<{
            data: ITodo,
            message: string,
            success: boolean
        }>(`/api/production/seh-tablo/done/${id}`, {seh_id});
    }
}
