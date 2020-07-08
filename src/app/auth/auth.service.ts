import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, mergeMap } from 'rxjs/operators';
import { User } from './user.model';
import { BehaviorSubject, throwError, Subject } from 'rxjs';
import { Router } from '@angular/router';


export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  autoLogOut = new Subject<string>();

  tokenExpirationTimer: any;

  constructor(private http: HttpClient,
    private router: Router) {}

  signUp(email: string, pwd: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQrXIuLvGVDIJCvWsRyoesygwK1v5_oqA',
      {
        email: email,
        password: pwd,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(email, resData.localId, resData.idToken, +resData.expiresIn);
    }
    ));
  }

  login(email: string, pwd: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQrXIuLvGVDIJCvWsRyoesygwK1v5_oqA',
      {
        email: email,
        password: pwd,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(email, resData.localId, resData.idToken, +resData.expiresIn);
    }
    ));
  }

  guestLogin() {
    this.handleAuthentication('Guest', '123', '123', 3000);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred.'
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This mail exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email could not be found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
      case 'USER_DISABLED':
        errorMessage = 'This user is disabled'
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(email: string, localId: string, idToken: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      const user = new User(email, localId, idToken, expirationDate);
      this.user.next(user);
      this.autoLogout(expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string,
    } = JSON.parse(localStorage.getItem('userData'))
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.autoLogOut.next('You have been logged out');
      this.logout();
    }, expirationDuration)
  };

  getAllUsers() {
    return this.http.get<string[]>(
      'https://my-resume---angular.firebaseio.com/users.json'
    );
  }

  addUser(email: string) {

    this.http.get<string[]>(
      'https://my-resume---angular.firebaseio.com/users.json'
    ).subscribe(users => {
      users.push(email);
      this.http.put(
        'https://my-resume---angular.firebaseio.com/users.json',
        users
      ).subscribe();
    });
  }

  resetPassword(email: string) {

    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCQrXIuLvGVDIJCvWsRyoesygwK1v5_oqA', {
      requestType:  'PASSWORD_RESET',
      email: email
    })
  }
}
