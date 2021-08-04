import { setLoadingSpinner } from '../../store/Shared/shared.actions';
import { loginStart } from '../state/auth.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form:any={
    username:null,
    password:null
  };
  errorMessage = 'login failed';
  isLoginFailed: true;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {

  }
  onLoginSubmit() {
    const username = this.form.username;
    const password = this.form.password;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(loginStart({username , password }));
  }
}
