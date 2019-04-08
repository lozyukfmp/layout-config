import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {MatSnackBar} from '@angular/material';
import {DataBaseService} from './dataBase.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Page} from '../models/Page';
import {Layout} from '../models/Layout';
import {first, switchMap, tap} from 'rxjs/internal/operators';
import {PageTreeService} from './page-tree/page-tree.service';

@Injectable({
  providedIn: 'root'
})
export class LayoutsService extends DataBaseService<Layout> {
  private activeLayout: BehaviorSubject<Layout> = new BehaviorSubject(null);
  public activeLayout$: Observable<Layout> = this.activeLayout.asObservable();
  private layouts: BehaviorSubject<Layout[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient,
              public snackBar: MatSnackBar,
              private pageTreeService: PageTreeService) {
    super(http, snackBar, `${environment.baseApiUrl}/layouts`);
  }

  public fetch() {
    return this.pageTreeService.activePage
      .pipe(
        switchMap(value => super.fetch({
          params: {
            pageId: value.name
          }
        })),
        tap(data => {
          this.layouts.next(data);
          if (data && data.length) {
            this.setActiveLayout();
          }
        })
      );
  }

  setActiveLayout(tenant: string = 'DEFAULT'): void {
    const layout = this.layouts.getValue().find(value => value.tenant === tenant);
    if (!layout) {
      layout = new Layout(tenant);
    }
    this.activeLayout.next(layout);
  }

  public create(body: any): Observable<Layout> {
    return this.pageTreeService.activePage
      .pipe(
        switchMap(value => super.create({
          params: {
            pageId: value.name
          }
        })),
        first()
      );
  }
}
