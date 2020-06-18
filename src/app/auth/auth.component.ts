import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, ControlContainer } from '@angular/forms';
import { Observable } from 'rxjs';
import { forbiddenNameValidator } from '../shared/forbidden-name.directive';
import { MustMatch } from '../shared/must-match.directive';
import { AuthResponseData, AuthService } from './auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  forgotPwdForm: FormGroup;
  isLoginMode;
  isLoading: boolean;
  isLoggedIn: boolean;
  fieldTextType: boolean;
  repeatFieldTextType: boolean;
  error = null;
  username = '';

  get inputEmail() { return this.loginForm.get('inputEmail'); }
  get inputPassword() { return this.loginForm.get('inputPassword'); }
  get inputPasswordConfirm() { return this.loginForm.get('inputPasswordConfirm'); }

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoginMode = true;
    this.initializeForm();
    this.authService.user.subscribe(user => {
      this.isLoggedIn = !!user;
      if (user) {
        this.username = user.email.split('@')[0];
      }
    })
  }

  initializeForm() {
    this.loginForm = new FormGroup({
      'inputEmail': new FormControl (null, [
        Validators.required,
        Validators.email,
        forbiddenNameValidator(/test/i)
      ], [this.checkMailExists.bind(this)]),
      'inputPassword': new FormControl (null,
        [ Validators.required,
          this.passwordLengthValidator.bind(this)]),
      'inputPasswordConfirm': new FormControl (null, [Validators.required])
    }, {
      validators: [MustMatch('inputPassword', 'inputPasswordConfirm')]
    });
    this.setConiditionalValidators(this.isLoginMode);
  }

  onSubmit() {
    if(!this.loginForm.valid) {
      return;
    }

    const email = this.loginForm.value.inputEmail;
    const password = this.loginForm.value.inputPassword;

    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      this.authService.addUser(email);
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      resData => {
        this.isLoading = false;
        this.error = '';
        this.isLoggedIn = true;
        this.username = resData.email.split('@')[0];
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    this.loginForm.reset();
  }

  onGuestLogin() {
    this.authService.guestLogin();
  }

  onForgotPassword() {
    console.log('Forgot Password');
    console.log(this.loginForm);
    this.router.navigate(['auth', 'reset']);
  }

  switchSignIn() {
    this.loginForm.reset();
    this.isLoginMode = !this.isLoginMode;
    this.setConiditionalValidators(this.isLoginMode);
  }

  checkMailExists(control: FormControl) : Promise<any> | Observable<any> {

    const promise = new Promise((resolve, reject) => {
      this.authService.getAllUsers().subscribe(
        users => {
          if (this.isLoginMode || !control.value) {
            resolve(null);
          }
          if (users.includes(control.value)) {
            resolve({'mailAlreadyTaken': true})
          }
          resolve(null);
        }
      );
    })
    return promise;
  }

  passwordLengthValidator(control: FormControl) {

    if (this.isLoginMode || !control.value) {
      return;
    }
    else {
      if (control.value.length < 6) {
        return({'passwordminLength': true})
      }
      return;
    }
  }

  setConiditionalValidators(isLoginMode: boolean) {

    const inputPasswordConfirm = this.loginForm.get('inputPasswordConfirm');
    if (isLoginMode) {
      this.loginForm.setValidators(null);
      inputPasswordConfirm.setValidators(null);

      this.loginForm.updateValueAndValidity();
      inputPasswordConfirm.updateValueAndValidity();
    }
    else {
      this.loginForm.setValidators(MustMatch('inputPassword', 'inputPasswordConfirm'));
      inputPasswordConfirm.setValidators(Validators.required);

      this.loginForm.updateValueAndValidity();
      inputPasswordConfirm.updateValueAndValidity();
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }

  onLogOut() {
    this.authService.logout();
  }

}
