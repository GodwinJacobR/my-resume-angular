import { Component, OnInit, ɵɵupdateSyntheticHostBinding, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable, Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.css']
})
export class ResetPwdComponent implements OnInit {

  resetPwdForm: FormGroup;
  constructor(private authService: AuthService) { }
  pwdSubscription: Subscription;
  pwdResetMailSent = false;

  get inputEmail() { return this.resetPwdForm.get('inputEmail'); }

  ngOnInit(): void {
    this.pwdResetMailSent = false;
    this.resetPwdForm = new FormGroup({
      'inputEmail': new FormControl (null,
        [Validators.required, Validators.email],
        [this.checkMailExists.bind(this)])
    })
  }

  checkMailExists(control: FormControl) : Promise<any> | Observable<any> {

    const promise = new Promise((resolve, reject) => {
      this.authService.getAllUsers().subscribe(
        users => {
          if (!users.includes(control.value)) {
            resolve({'unknownMailId': true})
          }
          resolve(null);
        }
      );
    })
    return promise;
  }

  onSubmit() {
    const email = this.resetPwdForm.value.inputEmail;

    this.pwdSubscription = this.authService.resetPassword(email).subscribe(
      success => {
        this.pwdResetMailSent = true;
      }
    );
  }

}
