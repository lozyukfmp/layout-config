import {Component, OnInit} from '@angular/core';
import {Layout} from "../../models/Layout";
import {Observable} from "rxjs/index";
import {LayoutsService} from "../../services/layouts.service";
import {MatDialog, MatSnackBar} from '@angular/material';
import {MatExpansionPanel} from '@angular/material/expansion';
import {Fragment} from "../../models/Fragment";
import {FragmentsService} from "../../services/fragments.service";
import {FragmentsDialogComponent} from "./fragments-dialog/fragments-dialog.component";
import {PreferencesDialogComponent} from "./preferences-dialog/preferences-dialog.component";
import htmlBuilder from "./html-builder";
import {FragmentInstance} from "../../models/FragmentInstance";
import {PreferencesService} from "../../services/preferences.service";
import {Preferences} from "../../models/Preferences";
import {PortalService} from "../../services/portal.service";

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
  public _preferences: Preferences[];

  _filterValue: string;

  constructor(private layoutsService: LayoutsService,
              private fragmentsService: FragmentsService,
              private preferencesService: PreferencesService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog,
              private portalService: PortalService) {
  }

  ngOnInit() {
    this.portalService.currentPortal.subscribe(_ => {
      this.updateLayouts();
      this.fragmentsService.fetch().subscribe(res => {
        this._fragments = res;
      });
      this.updatePreferencesData();
    });
  }

  updatePreferencesData(){
    this.preferencesService.fetch().subscribe(res => {
      this._preferences = res;
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
      // todo delete preferences for fragment instances
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

  _deleteFragment(fragments, index){
    // todo delete preferences for fragment instance
    fragments.splice(index, 1)
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

  _openAddFragmentDialog(fragments: FragmentInstance[]): void {
    const dialogRef = this.dialog.open(FragmentsDialogComponent, {
      width: 'auto',
      data: this._fragments
    });
    dialogRef.afterClosed().subscribe(selectedFragment => {
      if (selectedFragment != undefined) {
        fragments.push(new FragmentInstance(selectedFragment))
      }
    })
  }

  _openSetPreferencesDialog(fragment: FragmentInstance, tenant:string ){
    const dialogRef = this.dialog.open(PreferencesDialogComponent, {
      width: 'auto',
      data: {fragment: fragment, preferences: this._preferences, tenant: tenant}
    });
    dialogRef.afterClosed().subscribe(preferences => {
      if (preferences != undefined) {
        if( preferences._id != null){
         console.log('update pref ', preferences)
          this.preferencesService.update(preferences).subscribe(_ => {
            this.snackBar.open("Preferences has been updated", "", {duration: 2000, panelClass: "_success"});
            this.updatePreferencesData();
          });
        } else {
          this.preferencesService.create(preferences).subscribe(_ => {
            this.snackBar.open("Preferences has been created", "", {duration: 2000, panelClass: "_success"});
            this.updatePreferencesData();
          });;
          console.log('save new pref ', preferences)
        }
        //todo  save newPreferences
      }
    })
  }
}
