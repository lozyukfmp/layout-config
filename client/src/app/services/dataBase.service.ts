import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';


export abstract class DataBaseService<T> {

  constructor(protected _http: HttpClient, public snackBar: MatSnackBar, protected baseUrl: string) {
  }

  fetch(options?: {
    params?: HttpParams | {[param: string]: string | string[]; }
  }): Observable<T[]> {
    return this._http.get<T[]>(this.baseUrl, options).pipe(
      tap(
        data => data,
        error => this.handleError(error)
      )
    ) as Observable<T[]>;
  }


  getById(id: string): Observable<T> {
    return this._http.get<T>(`${this.baseUrl}/${id}`) as Observable<T>;
  }

  create(body: any): Observable<T> {
    return this._http.post<T>(this.baseUrl, body).pipe(
      tap(
        data => data,
        error => this.handleError(error)
      )
    ) as Observable<T>;
  }

  update( body: any) {
    return this._http.patch(`${this.baseUrl}/${body._id}`, body).pipe(
      tap(
        data => console.log(data),
        error => this.handleError(error)
      )
    );
  }

  delete(id: string): Observable<T> {
    return this._http.delete<T>(`${this.baseUrl}/${id}`).pipe(
      tap(
        data => data,
        error => this.handleError(error)
      )
    ) as Observable<T>;
  }

  handleError(error) {
    this.snackBar.open(error.error.message, '', {duration: 5000, panelClass: '_error'});
  }
}
