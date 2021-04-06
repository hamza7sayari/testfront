import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from "../_models";
import {environment} from "../../environments/environment";


@Injectable({providedIn: 'root'})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    const userStored = localStorage.getItem('user')
    this.userSubject = new BehaviorSubject<User>( userStored ? JSON.parse(localStorage.getItem('user')).user :
      null);

    this.user = this.userSubject.asObservable();
    console.log('OUr Subject is ', this.userSubject)
    console.log('OUr User is ', this.user)
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  // tslint:disable-next-line:typedef
  login(username, password) {
    return this.http.post<User>(`${environment.apiUrl}/authentication/login`, {username, password})
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  // tslint:disable-next-line:typedef
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  // tslint:disable-next-line:typedef
  register(user: User) {
    return this.http.post(`${environment.apiUrl}/authentication/register`, user);
  }
}
