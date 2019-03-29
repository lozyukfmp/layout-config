import {Component, OnInit} from '@angular/core';
import {Layout} from "../../models/Layout";
import {Observable} from "rxjs/index";
import {LayoutsService} from "../../services/layouts.service";
import {MatSnackBar} from '@angular/material';
import {MatExpansionPanel} from '@angular/material/expansion';
import {Fragment} from "../../models/Fragment";
import {FragmentsService} from "../../services/fragments.service";
import {FragmentsDialogComponent} from "./fragments-dialog/fragments-dialog.component";
import {MatDialog} from '@angular/material';
import htmlBuilder from "./html-builder";

@Component({
  selector: 'app-layouts',
  viewProviders: [MatExpansionPanel],
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.less']
})
export class LayoutsComponent implements OnInit {

  public _expandedNewForm = false;
  public _crudLoading = false;
  public _layouts: Observable<Layout[]>;
  public _fragments: Fragment[] = [];
  public _newLayoutForm: Layout = new Layout();

  _filterValue: string;

  constructor(private layoutsService: LayoutsService,
              private fragmentsService: FragmentsService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.updateLayouts();
    this.fragmentsService.fetch().subscribe(res => {
      this._fragments = res;
    });
  }

  updateLayouts() {
    this._expandedNewForm = false;
    this._layouts = this.layoutsService.fetch();
    this._crudLoading = false;
  }

  _revertData() {
    this.updateLayouts();
  }

  public _createLayout() {
    this._crudLoading = true;
    this._newLayoutForm.innerHtml = htmlBuilder(this._newLayoutForm);
    this.layoutsService.create(this._newLayoutForm).subscribe(_ => {
      this.snackBar.open("Layout has been created", "", {duration: 2000, panelClass: "_success"});
      this._rollBackNewFrom();
      this.updateLayouts();
    })
  }

  _deleteLayout(layout: Layout) {
    this._crudLoading = true;
    this.layoutsService.delete(layout._id).subscribe(_ => {
      this.snackBar.open("Layout has been deleted", "", {duration: 2000, panelClass: "_success"});
      this._rollBackNewFrom();
      this.updateLayouts();
    })
  }

  _editLayout(layout: Layout) {
    this._crudLoading = true;
    layout.innerHtml = htmlBuilder(layout);
    this.layoutsService.update(layout).subscribe(_ => {
      this.snackBar.open("Fragment has been updated", "", {duration: 2000, panelClass: "_success"});
      this._rollBackNewFrom();
      this.updateLayouts();
    })
  }

  public _rollBackNewFrom() {
    this._newLayoutForm = new Layout();
  }

  _moveDownFragment(fragments: Fragment[], index: number) {
    if (index < fragments.length - 1) {
      this.moveFragment(fragments, index, index + 1);
    }
  }

  _moveUpFragment(fragments: Fragment[], index: number) {
    if (index > 0) {
      this.moveFragment(fragments, index, index - 1);
    }
  }

  private moveFragment(fragments, from: number, to: number): void {
    const elem = fragments[from];
    fragments.splice(from, 1);
    fragments.splice(to, 0, elem);
  }

  _openDialog(fragments: Fragment[]): void {
    const dialogRef = this.dialog.open(FragmentsDialogComponent, {
      width: '250px',
      data: this._fragments
    });
    dialogRef.afterClosed().subscribe(selectedFragment => {
      if (selectedFragment != undefined) {
        fragments.push(selectedFragment)
      }
    })
  }
}
