import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FragmentSchema} from '../models/FragmentSchema';
import {environment} from '../../environments/environment';
import {MatSnackBar} from '@angular/material';
import {DataBaseService} from './dataBase.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {PortalService} from './portal.service';
import {switchMap, tap} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class FragmentsService extends DataBaseService<FragmentSchema> {

  private fragment = new BehaviorSubject<FragmentSchema>();
  private fragment$ = this.fragment.asObservable;
  private fragments = new BehaviorSubject<FragmentSchema[]>();
  private fragments$ = this.fragments.asObservable;

  constructor(private http: HttpClient,
              public snackBar: MatSnackBar,
              private portalService: PortalService) {
    super(http, snackBar, `${environment.baseApiUrl}/fragments`);
  }

  public setSelectedFragment(_id: string) {
    this.getById(_id).subscribe(result => this.fragment.next(result));
  }

  public fetch(): Observable<FragmentSchema[]> {
    return this.portalService.currentPortal
      .pipe(
        switchMap(portal => {
          return super.fetch({
            params: {
              portalName: portal
            }
          });
        })
      );
  }

  public create(body: any): Observable<FragmentSchema> {
    return this.portalService.currentPortal
      .pipe(
        switchMap(portal => {
          return super.create({
            ...body,
            portalName: portal
            });
        }),
        tap(val =>
          this.fetch().subscribe(result => this.fragments.next(result))
        )
      );
  }
}
