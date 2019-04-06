import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {MatSnackBar} from '@angular/material';
import {DataBaseService} from './dataBase.service';
import {PortalService} from './portal.service';
import {Observable} from 'rxjs';
import {Page} from '../models/Page';
import {switchMap} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class PagesService extends DataBaseService<Page> {

  constructor(private http: HttpClient,
              public snackBar: MatSnackBar,
              private portalService: PortalService) {
    super(http, snackBar, `${environment.baseApiUrl}/page`);
  }

  public fetch(): Observable<Page[]> {
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

  public create(body: any): Observable<Page> {
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
