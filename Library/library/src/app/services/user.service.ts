import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/User';
import { IUserLogin } from '../interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { BOOKS_URL, USER_LOGIN_URL, USER_REGISTER_URL } from '../constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../interfaces/IUserRegister';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;

  constructor(private http:HttpClient, private toastrService:ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to MuchBooks ${user.name}`,
            `Login Successful`
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login failed');
        }
      })
    );
  }

  register(userRegister:IUserRegister): Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to MuchBooks ${user.name}`,
            `Registration Successful`
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, `Registartion Failed`);
        }
      })
    )
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.replace('');
  }

  private setUserToLocalStorage(user: User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);

    if(userJson){
      return JSON.parse(userJson) as User;
    }

    return new User();
  }
}
