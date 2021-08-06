import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AppState} from '../store/app.state';
import {Store} from '@ngrx/store';
import {getToken} from '../auth/state/auth.selector';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private AUTH_API=environment.apiBaseUrl;
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      this.AUTH_API+'/api/auth/signin',
      { username, password,returnSecureToken:true },httpOptions,
    );
  }

  public getToken(): any {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }


  getErrorMessage(message: string) {
    switch (message) {
      case 'USERNAME_NOT_FOUND':
        return 'Email Not Found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
      case 'USERNAME_EXISTS':
        return 'Username already exists';
      default:
        return 'Login failed';
    }
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    console.log(this.store.select(getToken));
  }


  getUserFromLocalStorage() {
    const user=window.sessionStorage.getItem(USER_KEY);
    if (user){
      return JSON.parse(user);
    }
    return{}
  }

  logout() {
    sessionStorage.removeItem('auth-user');
    sessionStorage.removeItem('auth-token');
  }
}
