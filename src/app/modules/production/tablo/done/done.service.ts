//create service
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IDone} from './done.type';
import {ITodo} from "../todo/todo.type";

@Injectable({
    providedIn: 'root'
})
export class DoneService {

    constructor(private _httpClient: HttpClient) {
    }

    getAll(seh_id: number, date: string): Observable<{ data: IDone[], message: string, success: boolean }> {
        return this._httpClient.get<{
            data: IDone[],
            message: string,
            success: boolean
        }>(`/api/production/seh-tablo/list-done?seh_id=${seh_id}&date=${date}`);
    }

    undone(id: number, seh_id: number): Observable<{ data: IDone, message: string, success: boolean }> {
        return this._httpClient.put<{
            data: IDone,
            message: string,
            success: boolean
        }>(`/api/production/seh-tablo/undone/${id}`, {seh_id});
    }
}
