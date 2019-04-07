import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from '../models/event';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseUrl = 'http://localhost:8082/';
  private url = this.baseUrl + 'api/events';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  index() {
    return this.http.get<Event[]>(this.url + '?sorted=true', this.httpOptions)
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

  update(event: Event) {
    return this.http.put<any>(this.url + `/${event.id}`, event, this.httpOptions)
    .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('KABOOM');
        })
    );
  }

  create(event: Event) {
    return this.http.post<any>(this.url, event, this.httpOptions)
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

  constructor(private http: HttpClient) { }
}
