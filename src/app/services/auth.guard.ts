import {  map } from 'rxjs/operators';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { isAuthenticated, getToken } from '../auth/state/auth.selector';
import {AuthService} from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router,private auth:AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    // return this.auth.getToken().pipe(
    //   map((getToken)=>{
    //     if (getToken==undefined||getToken==''){
    //       return this.router.createUrlTree(['auth']);
    //     }else {
    //       return this.router.createUrlTree(['posts']);
    //     }
    //   })
    // )

    return this.store.select(getToken).pipe(
      map((getToken) => {
        if (getToken == undefined||getToken==''){
          return this.router.createUrlTree(['auth']);
        }
        return true;
      })
    );
  }
}
