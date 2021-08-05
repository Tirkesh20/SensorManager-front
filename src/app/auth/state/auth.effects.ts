import {
  setLoadingSpinner,
  setErrorMessage,
} from '../../store/Shared/shared.actions';
import { AuthService } from '../../services/auth.service';
import { exhaustMap, map, catchError, tap, mergeMap } from 'rxjs/operators';
import {
  autoLogin,
  autoLogout,
  loginStart,
  loginSuccess
} from './auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import {User} from '../../models/user.model';

@Injectable()
export class AuthEffects {
  private roles: string[];
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.username, action.password).pipe(
          map((data) => {
            this.authService.saveToken(data.accessToken)
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            this.authService.saveUser(data);
            const user= new User(data.accessToken,this.authService.getUserFromLocalStorage().roles)
            return loginSuccess({ user, redirect: true });
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.authService.getErrorMessage(
              errResp.error.error.message
            );
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess]),
        tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          if (action.redirect) {
            this.router.navigate(['posts']);
          }
        })
      );
    },
    { dispatch: false }
  );


  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user = this.authService.getUserFromLocalStorage();
        return of(loginSuccess({ user, redirect: false }));
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(autoLogout),
        map((action) => {
          this.authService.logout();
          this.router.navigate(['auth']);
        })
      );
    },
    { dispatch: false }
  );
}
