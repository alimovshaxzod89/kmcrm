import {Component, effect, signal, WritableSignal} from '@angular/core';
import {UserService} from "../../../core/user/user.service";
import {map, Observable} from "rxjs";
import {ISeh} from "../../../modules/seh/seh.types";
import {User} from "../../../core/user/user.types";
import {AuthService} from "../../../core/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'seh-change',
    templateUrl: './change.component.html',
    styleUrls: ['./change.component.scss']
})
export class ChangeComponent {

    seh$: Observable<ISeh>;

    sehUsers$: WritableSignal<User[]> = signal([]);

    selectedUser$: WritableSignal<User> = signal(null);

    visible: boolean;

    constructor(private _userService: UserService,
                private _authService: AuthService,
                private _router: Router,
                private _activatedRoute: ActivatedRoute,
    ) {
        this.seh$ = this._userService.seh$;

        this._userService.getAllUsers('seh').pipe(
            map(response => response.data)
        ).subscribe(users => {
            this.sehUsers$.set(users);
        });

        effect(() => {
            const user = this.selectedUser$()
            console.log(user)
            if (user)
                this.promptPassword(user);
        }, {allowSignalWrites: true})
    }

    showDialog() {
        this.visible = true;
    }

    promptPassword(user: User, text: string = null): void {

        let password: string;
        do {

            password = prompt(text ? text : 'Parolni kiriting: ' + user.email);

        } while (password === '');

        if (password === null) {
            this.selectedUser$.set(null);
            this.visible = false;
            return;
        }

        this.signIn(user.email, password);
    }

    signIn(email: string, password: string): void {
        this._authService.signIn({email, password}, true)
            .subscribe(
                (response) => {

                    this.selectedUser$.set(null);

                    this.visible = false;

                    const redirectURL = '/';
                    // Navigate to the redirect url
                    this._router.navigateByUrl(redirectURL);


                    // location.href = redirectURL;
                },
                (response) => {

                    console.log({response});

                    if (response.code === 400) {
                        this.promptPassword(this.selectedUser$(), 'Parol xato qaytadan kiriting: ');
                    } else {
                        alert(response.message);
                    }

                    // Set the alert
                    // this.alert = {
                    //     type: 'error',
                    //     message: response?.message || 'Something went wrong, please try again.'
                    // };
                    //
                    // // Show the alert
                    // this.showAlert = true;
                }
            );
    }
}
