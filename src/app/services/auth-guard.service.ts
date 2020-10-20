import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService  {

    // you would usually put this in it's own service and not access it directly!
    // this is just for the sake of the demo.
    isLoggedIn: boolean = false;
    counter: any;
    constructor(
        private router: Router
    ) {
        this.counter = 'Inbox';
    }

    canActivate() {
        // check whether user set in local storage or not
        const user: any = JSON.parse(localStorage.getItem('user')) || {};
        if (!(user.username && user.username.length > 0)) {
            console.log('username is NOT present so redirect to login');
            this.router.navigate(['login']);
        } 
    }

}