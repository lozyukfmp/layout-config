import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {MatSnackBar} from '@angular/material';
import {DataBaseService} from './dataBase.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Layout} from '../models/Layout';
import {first, switchMap, tap} from 'rxjs/internal/operators';
import {PageTreeService} from './page-tree/page-tree.service';
import htmlBuilder from "../components/layouts/html-builder";

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
          if(data && data.length > 0) {
            this.activeLayout.next(data[0]);
          } else {
            this.setActiveLayout();
          }
        })
      );
  }

  processLayout(): Observable<Layout> {
    const layout = this.activeLayout.getValue();
    layout.innerHtml = htmlBuilder(layout);
    if (layout._id) {
      return this.update(layout).pipe(
        tap(data =>
          this.snackBar.open('Layout has been created', '', {duration: 2000, panelClass: '_success'})
        )
      ) as Observable<Layout>;
    } else {
      return this.create(layout).pipe(
        tap(data =>
          this.snackBar.open('Layout has been updated', '', {duration: 2000, panelClass: '_success'})
        )
      ) as Observable<Layout>;
    }
  }

  setActiveLayout(tenant?: string): void {
    let layout = this.layouts.getValue().find(value => value.tenant === tenant);
    if (!layout) {
      layout = new Layout(tenant);
      this.layouts.next([...this.layouts.getValue(), layout]);
    }
    this.activeLayout.next(layout);
  }

  public create(body: any): Observable<Layout> {
    return this.pageTreeService.activePage
      .pipe(
        switchMap(value => super.create({
          ...body,
          page: value.name
        })),
        first()
      );
  }
}
