import {Component, OnInit} from '@angular/core';
import {Fragment} from "../../models/Fragment";
import {FragmentsService} from "../../services/fragments.service";
import {MatSnackBar} from '@angular/material';
import {Observable} from "rxjs/index";
import {PortalService} from "../../services/portal.service";

@Component({
  selector: 'app-fragments',
  templateUrl: './fragments.component.html',
  styleUrls: ['./fragments.component.less']
})
export class FragmentsComponent implements OnInit {

  public _expandedNewForm = false;
  public _crudLoading = false;
  public _fragments: Observable<Fragment[]>;
  public _newFragmentForm: Fragment = new Fragment();
  public _attributesValues: string[] = ['', 'async', 'primary'];
  public _portals$: Observable<string[]>;

  _filterValue: string;

  readonly URL_PATTERN: string = '(http://|https://)\\S+';

  constructor(private fragmentService: FragmentsService,
              public snackBar: MatSnackBar,
              private portalService: PortalService) {
  }

  ngOnInit() {
    this.updateFragments();
    this._portals$ = this.portalService.getPortals();
  }

  updateFragments() {
    this._expandedNewForm = false;
    this._fragments = this.fragmentService.fetch()
  }

  _revertData() {
    this.updateFragments();
  }

  public _createFragment() {
    this.fragmentService.create(this._newFragmentForm).subscribe(_ => {
      this.snackBar.open("Fragment has been created", "", {duration: 2000, panelClass: "_success"});
      this._rollBackNewFrom();
      this.updateFragments();
    })
  }

  _deleteFragment(fragment:Fragment){
    this.fragmentService.delete(fragment._id).subscribe(_ => {
      this.snackBar.open("Fragment has been deleted", "", {duration: 2000, panelClass: "_success"});
      this._rollBackNewFrom();
      this.updateFragments();
    })
  }

  _editFragment(fragment:Fragment){
    this.fragmentService.update(fragment).subscribe(_ => {
      this.snackBar.open("Fragment has been updated", "", {duration: 2000, panelClass: "_success"});
      this._rollBackNewFrom();
      this.updateFragments();
    })
  }

  public _rollBackNewFrom() {
    this._newFragmentForm = new Fragment();
  }
}
