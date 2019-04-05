import {Component, OnInit} from '@angular/core';
import {Layout} from '../../models/Layout';
import {Observable} from 'rxjs/index';
import {MatSnackBar} from '@angular/material';
import {MatExpansionPanel} from '@angular/material/expansion';
import {FragmentsService} from '../../services/fragments.service';
import {Page} from '../../models/Page';
import {PagesService} from '../../services/pages.service';
import {FragmentSchema} from '../../models/FragmentSchema';

@Component({
  selector: 'app-layouts',
  viewProviders: [MatExpansionPanel],
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.less']
})
export class PagesComponent implements OnInit {
  public _expandedNewForm = false;
  public _crudLoading = false;
  public pages$: Observable<Page[]>;
  public fragmentSchemas$: Observable<FragmentSchema[]>;
  public selectedLayout: Layout;
  public _newPageForm: Page = new Page();

  _filterValue: string;

  constructor(private pagesService: PagesService,
              private fragmentsService: FragmentsService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.pages$ = this.pagesService.fetch();
    this.fragmentSchemas$ = this.fragmentsService.fetch();
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
}
