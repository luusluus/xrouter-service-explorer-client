import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from './shared/services/account.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private user: AccountService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {    
    if(!this.user.isAuthenticated())
    {
      // not logged in
       this.router.navigate(['/'], {queryParams: {returnUrl: state.url}});
       return false;
    }
    // logged in, so return true
    return true;
  }
}