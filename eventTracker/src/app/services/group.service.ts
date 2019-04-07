import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Group } from '../models/group';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private baseUrl = 'http://localhost:8082/';
  private url = this.baseUrl + 'api/groups';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  index() {
    return this.http.get<Group[]>(this.url + '?sorted=true', this.httpOptions)
         .pipe(
               catchError((err: any) => {
                 console.log(err);
                 return throwError('KABOOM');
               })
          );
  }

  show(id: any) {
    return this.http.get<any>(this.url + `/${id}`, this.httpOptions)
          .pipe(
              catchError((err: any) => {
                console.log(err);
                return throwError('KABOOM');
              })
          );
  }

  showGroupUsers(id: any) {
    return this.http.get<any[]>(this.url + `/${id}/users`, this.httpOptions)
          .pipe(
              catchError((err: any) => {
                console.log(err);
                return throwError('KABOOM');
              })
          );
  }

  update(group: Group) {
    return this.http.put<any>(this.url + `/${group.id}`, group, this.httpOptions)
    .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('KABOOM');
        })
    );
  }

  create(group: Group) {
    return this.http.post<any>(this.url, group, this.httpOptions)
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

  removeUserFromGroup(uid: number, gid: number) {
    return this.http.delete<any>(this.url + `/${gid}/users/${uid}`, this.httpOptions)
    .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('KABOOM');
        })
    );
  }

  constructor(private http: HttpClient) { }
}
