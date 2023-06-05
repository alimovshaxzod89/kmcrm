import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TabloService {

    constructor(private _httpClient: HttpClient) {
    }

    load(seh_id: number, date: string): Observable<{ data: number, message: string, success: boolean }> {
        return this._httpClient.get<{
            data: number,
            message: string,
            success: boolean
        }>(`/api/production/seh-tablo/earning/${seh_id}/${date}`);
    }
}
