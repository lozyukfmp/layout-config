import {Component, OnInit} from '@angular/core';
import {FragmentSchema} from '../../models/FragmentSchema';
import {FragmentsService} from '../../services/fragments.service';
import {MatSnackBar} from '@angular/material';
import {Observable} from 'rxjs/index';

@Component({
  selector: 'app-fragments',
  templateUrl: './fragments.component.html',
  styleUrls: ['./fragments.component.less']
})
export class FragmentsComponent implements OnInit {

  public _expandedNewForm = false;
  public _crudLoading = false;
  public fragments$: Observable<FragmentSchema[]>;
  public _newFragmentForm: FragmentSchema = new FragmentSchema();

  _filterValue: string;

  constructor(private fragmentService: FragmentsService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.fragments$ = this.fragmentService.entities$;
    this.fragmentService.fetch().subscribe();
  }

  resetState() {
    this._expandedNewForm = false;
    this._newFragmentForm = new FragmentSchema();
  }

  _revertData() {
    this.resetState();
  }

  public _createFragment() {
    this.fragmentService.create(this._newFragmentForm).subscribe(_ => {
      this.snackBar.open('Fragment has been created', '', {duration: 2000, panelClass: '_success'});
      this.resetState();
    });
  }

  _deleteFragment(fragment: FragmentSchema) {
    this.fragmentService.delete(fragment._id).subscribe(_ => {
      this.snackBar.open('Fragment has been deleted', '', {duration: 2000, panelClass: '_success'});
      this.resetState();
    });
  }

  _editFragment(fragment: FragmentSchema) {
    this.fragmentService.update(fragment).subscribe(_ => {
      this.snackBar.open('Fragment has been updated', '', {duration: 2000, panelClass: '_success'});
      this.resetState();
    });
  }
}
