import {Component, OnInit} from '@angular/core';
import {PreferencesService} from "../../services/pages.service";
import {TailorPage, TailorPageViewModel} from "../../models/TailorPage";
import {MatChipInputEvent, MatSnackBar} from "@angular/material";
import {Layout} from "../../models/Layout";
import {LayoutsService} from "../../services/layouts.service";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {COMMA, ENTER} from '@angular/cdk/keycodes';


@Component({
  selector: 'app-tailor-pages',
  templateUrl: './tailor-pages.component.html',
  styleUrls: ['./tailor-pages.component.less']
})
export class TailorPagesComponent implements OnInit {

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public _expandedNewForm: boolean;
  public _crudLoading = false;
  public _tailorPages: Observable<TailorPageViewModel[]>;
  public _newPageForm: TailorPage = new TailorPage();
  public _layoutsControl = new FormControl();
  public _layouts: Layout[] = [];
  public _filteredLayouts: Observable<Layout[]>;

  _filterValue: string;

  constructor(private pagesService: PreferencesService, private layoutsService: LayoutsService, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.updatePages();
    this.initLayoutsData();
  }

  initLayoutsData() {
    this.layoutsService.fetch().subscribe(res => {
      this._layouts = res;
      this._filteredLayouts = this._layoutsControl.valueChanges
        .pipe(
          startWith<string | Layout>(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name) : this._layouts.slice())
        );
    });
  }

  updatePages() {
    this._expandedNewForm = false;
    this._tailorPages = this.pagesService.fetch()
      .pipe(
        map(tailorPages => this.convertPages(tailorPages))
      )
    ;
    this._crudLoading = false;
  }

  _revertData() {
    this.updatePages();
  }

  _createPage() {
    this._crudLoading = true;
    this.pagesService.create(this._newPageForm).subscribe(_ => {
      this.snackBar.open("Page has been created", "", {duration: 2000, panelClass: "_success"});
      this._rollBackNewFrom();
      this.updatePages();
    })
  }

  _deletePage(page: TailorPage) {
    this._crudLoading = true;
    this.pagesService.delete(page._id).subscribe(_ => {
      this.snackBar.open("Page has been deleted", "", {duration: 2000, panelClass: "_success"});
      this._rollBackNewFrom();
      this.updatePages();
    })
  }

  _editPage(page: TailorPageViewModel) {
    this._crudLoading = true;
    const pageData = {
      _id: page._id,
      requestUrls: page.requestUrls,
      layout: page.layout
    };
    this.pagesService.update(pageData).subscribe(_ => {
      this.snackBar.open("Page has been updated", "", {duration: 2000, panelClass: "_success"});
      this._rollBackNewFrom();
      this.updatePages();
    })
  }

  public _rollBackNewFrom() {
    this._newPageForm = new TailorPageViewModel();
  }

  _displayLayoutName(layout?: Layout): string | undefined {
    return layout ? layout.name : undefined;
  }

  private _filter(name: string): Layout[] {
    const filterValue = name.toLowerCase();
    return this._layouts.filter(layout => layout.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private convertPages(tailorPages: TailorPage[]): TailorPageViewModel[] {
    return tailorPages.map(page => {
      let tailorPageViewModel: TailorPageViewModel = Object.assign(page);
      tailorPageViewModel.formControl = new FormControl();
      tailorPageViewModel.filteredLayouts = tailorPageViewModel.formControl.valueChanges
        .pipe(
          startWith<string | Layout>(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name) : this._layouts.slice())
        );
      return tailorPageViewModel;
    });
  }

  _addExtraPath(tailorPage:TailorPageViewModel, event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      tailorPage.requestUrls.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  _removeExtraPath(url:string, tailorPage:TailorPageViewModel): void {
    const index = tailorPage.requestUrls.indexOf(url);
    if (index >= 0) {
      tailorPage.requestUrls.splice(index, 1);
    }
  }

}
