import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, ReplaySubject, tap} from 'rxjs';
import {Role, User} from 'app/core/user/user.types';
import {ISeh} from "../../modules/seh/seh.types";
import {SearchField} from "../../api/query.types";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
    private _role: ReplaySubject<Role> = new ReplaySubject<Role>(1);
    private _seh: ReplaySubject<ISeh> = new ReplaySubject<ISeh>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    /**
     * Setter & getter for role
     *
     * @param value
     */
    set role(value: Role) {
        // Store the value
        this._role.next(value);
    }

    get role$(): Observable<Role> {
        return this._role.asObservable();
    }

    /**
     * Setter & getter for role
     *
     * @param value
     */
    set seh(value: ISeh) {
        // Store the value
        this._seh.next(value);
    }

    get seh$(): Observable<ISeh> {
        return this._seh.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user all data
     */
    getAllData(): Observable<{
        user: User,
        role: Role,
        seh?: ISeh
    }> {
        return this._httpClient.get<{
            data: {
                user: User,
                role: Role,
                seh?: ISeh
            },
            message: string,
            code: number,
        }>('/api/auth/all-data').pipe(
            map((response: any) => {
                return response.data;
            }),
            tap((data) => {
                this._user.next(data.user);
                this._role.next(data.role);
                this._seh.next(data.seh);
            })
        );
    }


    /**
     * Get the current logged in user data
     */
    get(): Observable<User> {
        return this.getAllData().pipe(
            map((data) => {
                return data.user;
            }
        ));
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any> {
        return this._httpClient.patch<User>('api/common/user', {user}).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }

    getAllUsers(role = null): Observable<{
        data: User[],
        message: string,
        success: boolean,
    }> {

        let url: string = '/api/production/users'

        const searchArr = [];

        if (role)
            searchArr.push({
                field: 'role',
                value: role
            })

        const search: string = this.makeSearchString(searchArr);
        if (search.length)
            url += `?search=${search}`

        return this._httpClient.get<{
            data: User[],
            message: string,
            success: boolean,
        }>(url);
    }


    private makeSearchString(params: SearchField[]) {
        if (params.length) {
            return params.map(item => `${item.field}:${item.value}`).join(';')
        } else {
            return ''
        }
    }
}
