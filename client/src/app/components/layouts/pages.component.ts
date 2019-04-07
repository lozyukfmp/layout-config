import {Component, OnDestroy, OnInit} from '@angular/core';
import {Layout} from '../../models/Layout';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material';
import {MatExpansionPanel} from '@angular/material/expansion';
import {FragmentsService} from '../../services/fragments.service';
import {Page} from '../../models/Page';
import {PagesService} from '../../services/pages.service';
import {FragmentSchema} from '../../models/FragmentSchema';
import {switchMap} from "rxjs/operators";
import {PortalService} from "../../services/portal.service";
import {Tenant} from "../../models/Tenant";
import {TenantService} from "../../services/tenants.service";

@Component({
  selector: 'app-layouts',
  viewProviders: [MatExpansionPanel],
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.less']
})
export class PagesComponent implements OnInit, OnDestroy {
  public _expandedNewForm = false;
  public _crudLoading = false;
  public pages$: Observable<Page[]>;
  public fragmentSchemas$: Observable<FragmentSchema[]>;
  public tenants$: Observable<Tenant[]>;
  public selectedLayout: Layout;
  public _newPageForm: Page = new Page();

  private portalChange: Subscription;

  _filterValue: string;

  constructor(private pagesService: PagesService,
              private fragmentService: FragmentsService,
              private tenantService: TenantService,
              private portalService: PortalService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.pages$ = this.pagesService.entities$;
    this.fragmentSchemas$ = this.fragmentService.entities$;
    this.tenants$ = this.tenantService.entities$;

    this.tenantService.fetch().subscribe();

    this.portalChange = this.portalService.entity$
      .pipe(
        switchMap(value => forkJoin(
          this.fragmentService.fetch({
            params: {
              portalName: value
            }
          }),
          this.pagesService.fetch()
        ))
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.portalChange.unsubscribe();
    this.portalChange = null;
  }

  resetState() {
    this._newPageForm = new Page();
    this._expandedNewForm = false;
    this._crudLoading = false;
  }

  _revertData() {
    this.resetState();
  }

  public _createPage() {
    this._crudLoading = true;
    this.pagesService.create(this._newPageForm).subscribe(_ => {
      this.snackBar.open('Layout has been created', '', {duration: 2000, panelClass: '_success'});
      this.resetState();
    });
  }

  _deletePage(page: Page) {
    this._crudLoading = true;
    this.pagesService.delete(page._id).subscribe(_ => {
      // todo delete preferences for fragment instances
      this.snackBar.open('Layout has been deleted', '', {duration: 2000, panelClass: '_success'});
      this.resetState();
    });
  }

  _editPage(page: Page) {
    this._crudLoading = true;
    this.pagesService.update(page).subscribe(_ => {
      this.snackBar.open('Fragment has been updated', '', {duration: 2000, panelClass: '_success'});
      this.resetState();
    });
  }

  findLayoutByTenant(page: Page, tenant: Tenant) {
    let layout = page.layouts.find(layout => layout.tenant === tenant.name);

    if (!layout) {
      layout = new Layout(tenant.name);
      page.layouts.push(layout);
    }

    return layout;
  }
}
