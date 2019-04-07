import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8082/';
  private url = this.baseUrl + 'api/users';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  index() {
    return this.http.get<User[]>(this.url + '?sorted=true', this.httpOptions)
         .pipe(
               catchError((err: any) => {
                 console.log(err);
                 return throwError('KABOOM');
               })
          );
  }

  showUser(id: any) {
    return this.http.get<any>(this.url + `/${id}`, this.httpOptions)
          .pipe(
              catchError((err: any) => {
                console.log(err);
                return throwError('KABOOM');
              })
          );
  }

  showUserGroups(id: any) {
    return this.http.get<any[]>(this.url + `/${id}/groups`, this.httpOptions)
          .pipe(
              catchError((err: any) => {
                console.log(err);
                return throwError('KABOOM');
              })
          );
  }

  update(user: User) {
    return this.http.put<any>(this.url + `/${user.id}`, user, this.httpOptions)
    .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('KABOOM');
        })
    );
  }

  addToGroup(uid: number, gid: number) {
    return this.http.put<any>(this.url + `/${uid}/groups/${gid}`, this.httpOptions)
    .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('KABOOM');
        })
    );
  }

  create(user: User) {
    return this.http.post<any>(this.url, user, this.httpOptions)
    .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('KABOOM');
        })
    );
  }

  destroy(id: number) {
    return this.http.delete<any>(this.url + `/${id}`, this.httpOptions)
    .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('KABOOM');
        })
    );
  }

  removeFromGroup(uid: number, gid: number) {
    return this.http.delete<any>(this.url + `/${uid}/groups/${gid}`, this.httpOptions)
    .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('KABOOM');
        })
    );
  }

  constructor(private http: HttpClient) { }
}
