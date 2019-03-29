import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Fragment} from "../../../models/Fragment";
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from "rxjs/index";

@Component({
  selector: 'fragments-dialog',
  templateUrl: 'fragments-dialog.component.html',
  styleUrls: ['./fragments-dialog.component.less']
})
export class FragmentsDialogComponent {
  public _fragments: Fragment[] = [];
  public _filteredOptions: Observable<Fragment[]>;
  public _fragmentsControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<FragmentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Fragment[]) {
    this._fragments = data;
    this._filteredOptions = this._fragmentsControl.valueChanges
      .pipe(
        startWith<string | Fragment>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this._fragments.slice())
      );
  }

  _onCancelClick(): void {
    this.dialogRef.close();
  }

  _displayFragmentName(fragment?: Fragment): string | undefined {
    return fragment ? fragment.name : undefined;
  }

  private _filter(name: string): Fragment[] {
    const filterValue = name.toLowerCase();
    return this._fragments.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
