import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FragmentSchema} from '../models/FragmentSchema';
import {environment} from '../../environments/environment';
import {MatSnackBar} from '@angular/material';
import {DataBaseService} from './dataBase.service';
import {Observable} from 'rxjs';
import {PortalService} from './portal.service';
import {switchMap} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class FragmentsService extends DataBaseService<FragmentSchema> {
  constructor(private http: HttpClient,
              public snackBar: MatSnackBar,
              private portalService: PortalService) {
    super(http, snackBar, `${environment.baseApiUrl}/fragments`);
  }

  public fetch(): Observable<FragmentSchema[]> {
    return this.portalService.entity$
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
    return this.portalService.entity$
      .pipe(
        switchMap(portal => {
          return super.create({
            ...body,
            portalName: portal
            });
        })
      );
  }
}
