import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {BaseEntity} from "../models/BaseEntity";

export abstract class DataBaseService<T extends BaseEntity> {
  protected entity: BehaviorSubject<T> = new BehaviorSubject<T>(null);
  public entity$: Observable<T> = this.entity.asObservable();
  protected entities: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  public entities$: Observable<T[]> = this.entities.asObservable();

  protected constructor(protected _http: HttpClient, public snackBar: MatSnackBar, protected baseUrl: string) {}

  public fetch(options?: { params?: HttpParams | {[param: string]: string | string[]} }): Observable<T[]> {
    console.log("SDFSDF");
    return this._http.get<T[]>(this.baseUrl, options)
      .pipe(
        tap(
          data => this.entities.next(data),
          error => this.handleError(error)
        )
      ) as Observable<T[]>;
  }

  public getById(id: string): Observable<T> {
    return this._http.get<T>(`${this.baseUrl}/${id}`)
      .pipe(
        tap(data => this.entity.next(data),
            error => this.handleError(error)
        )
      ) as Observable<T>;
  }

  public create(body: any): Observable<T> {
    return this._http.post<T>(this.baseUrl, body)
      .pipe(
        tap(
          data => {
            const entityArray = this.entities.getValue();
            this.entities.next([...entityArray, data]);
          },
          error => this.handleError(error)
        )
      ) as Observable<T>;
  }

  public update( body: any): Observable<T> {
    return this._http.patch<T[]>(`${this.baseUrl}/${body._id}`, body)
      .pipe(
        tap(
          (data: BaseEntity) => {
            const entityArray = this.entities.getValue(),
              index = entityArray.findIndex(entity => entity._id === body._id);
            entityArray[index] = body;
            this.entities.next(entityArray);
          },
          error => this.handleError(error)
        )
      ) as Observable<T>;
  }

  public delete(id: string): Observable<T> {
    return this._http.delete<T[]>(`${this.baseUrl}/${id}`)
      .pipe(
        tap(
          data => {
            let entityArray = this.entities.getValue();
            entityArray = entityArray.filter(entity => entity._id !== id);
            this.entities.next(entityArray);
          },
          error => this.handleError(error)
        )
      ) as Observable<T>;
  }

  public handleError(error) {
    this.snackBar.open(error.error.message, '', {duration: 5000, panelClass: '_error'});
  }
}
