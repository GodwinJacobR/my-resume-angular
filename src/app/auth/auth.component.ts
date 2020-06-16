import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, ControlContainer } from '@angular/forms';
import { Observable } from 'rxjs';
import { forbiddenNameValidator } from '../shared/forbidden-name.directive';
import { MustMatch } from '../shared/must-match.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  forgotPwdForm: FormGroup;
  isLoginMode = true;
  fieldTextType: boolean;
  repeatFieldTextType: boolean;

  get inputEmail() { return this.loginForm.get('inputEmail'); }
  get inputPassword() { return this.loginForm.get('inputPassword'); }
  get inputPasswordConfirm() { return this.loginForm.get('inputPasswordConfirm'); }

  constructor() { }

  ngOnInit(): void {
    this.isLoginMode = true;
    this.loginForm = new FormGroup({
      'inputEmail': new FormControl (null, [
        Validators.required,
        Validators.email,
        forbiddenNameValidator(/test/i)
      ], [this.asyncForbiddenNames.bind(this)]),
      'inputPassword': new FormControl (null, [Validators.required]),
      'inputPasswordConfirm': new FormControl (null, [Validators.required])
    }, {
      validators: [MustMatch('inputPassword', 'inputPasswordConfirm')]
    });
    this.setConiditionalValidators(this.isLoginMode);
  }

  onSubmit() {
    console.log(this.loginForm);
    if (this.isLoginMode) {
      console.log('Log In')
    }
    else {
      console.log('Sign Up')
    }
  }

  onForgotPassword() {
    console.log('Forgot Password');
    console.log(this.loginForm);
  }

  switchSignIn() {
    this.loginForm.reset();
    this.isLoginMode = !this.isLoginMode;
    this.setConiditionalValidators(this.isLoginMode);
  }

  asyncForbiddenNames(control: FormControl) : Promise<any> | Observable<any> {

    const promise = new Promise((resolve, reject) => {
      if (this.isLoginMode) {
        resolve(null);
      }
      else {
        setTimeout(()=> {
          if (control.value === "godwin@gmail.com") {
            resolve({'mailAlreadyTaken': true})
          }
          resolve(null);
        }, 3000)
      }
    })
    return promise;
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

}
