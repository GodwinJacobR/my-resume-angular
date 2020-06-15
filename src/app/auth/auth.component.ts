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
  isLoginMode = true;

  get inputEmail() { return this.loginForm.get('inputEmail'); }
  get inputPassword() { return this.loginForm.get('inputPassword'); }
  get inputPasswordConfirm() { return this.loginForm.get('inputPasswordConfirm'); }

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'inputEmail': new FormControl (null, [
        Validators.required,
        Validators.email,
        forbiddenNameValidator(/test/i)
      ]),
      'inputPassword': new FormControl (null, [Validators.required]),
      'inputPasswordConfirm': new FormControl (null, [Validators.required])
    }, {
      validators: [MustMatch('inputPassword', 'inputPasswordConfirm')]
    });
    this.setConiditionalValidators(this.isLoginMode);
  }

  onLogin() {
    console.log(this.loginForm);
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

  onSignUp() {
    console.log(this.loginForm);
    this.isLoginMode = false;
    this.loginForm.reset();
  }

  asyncForbiddenNames(control: FormControl) : Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(()=> {
        if (control.value === "test@test.com") {
          resolve({'nameisForbidden': true})
        }
        resolve(null);
      }, 3000)
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
      this.loginForm.updateValueAndValidity();
    }
  }

}
