import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Layout} from '../../../models/Layout';
import {FragmentsDialogComponent} from './fragments-dialog/fragments-dialog.component';
import {isNullOrUndefined} from 'util';
import {filter} from 'rxjs/internal/operators';
import {FragmentInstance} from '../../../models/FragmentInstance';
import {PreferencesDialogComponent} from './preferences-dialog/preferences-dialog.component';
import {FragmentSchema} from '../../../models/FragmentSchema';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'layout-configuration-component',
  templateUrl: 'layout-configuration.component.html',
  styleUrls: ['./layout-configuration.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutConfigurationComponent {
  private _layout: Layout;
  @Input() fragmentSchemas: FragmentSchema[];
  @Output() layoutChange = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  @Input()
  set layout(value: Layout) {
    this._layout = {...value};
  }

  get layout(): Layout {
    return this._layout;
  }

  _addFragmentInstance(fragmentInstances: FragmentInstance[]): void {
    const dialogRef = this.dialog.open(FragmentsDialogComponent, {
      width: 'auto',
      data: this.fragmentSchemas
    });

    dialogRef.afterClosed()
      .pipe(
        filter(selectedFragmentSchema => !isNullOrUndefined(selectedFragmentSchema))
      )
      .subscribe(selectedFragmentSchema => {
        const fragmentInstance: FragmentInstance = new FragmentInstance(selectedFragmentSchema);
        fragmentInstances.push(fragmentInstance);
        this.layoutChange.emit(this._layout);
      });
  }

  _deleteFragmentInstance(fragmentInstances: FragmentInstance[], index: number): void {
    fragmentInstances = fragmentInstances.filter((_, i) => i !== index);
    this.layoutChange.emit(this._layout);
  }

  _editPreferences(fragmentInstances: FragmentInstance[], index: number): void {
    const dialogRef = this.dialog.open(PreferencesDialogComponent, {
      width: 'auto', data: {fragmentInstance: fragmentInstances[index]}
    });

    dialogRef.afterClosed()
      .pipe(
        filter(editedFragmentInstance => !isNullOrUndefined(editedFragmentInstance))
      )
      .subscribe(editedFragmentInstance => {
        fragmentInstances[index] = editedFragmentInstance;
        this.layoutChange.emit(this._layout);
      });
  }

  _moveDownFragmentInstance(fragmentInstances: FragmentInstance[], index: number): void {
    if (index < fragmentInstances.length - 1) {
      this.moveFragment(fragmentInstances, index, index + 1);
      this.layoutChange.emit(this._layout);
    }
  }

  _moveUpFragmentInstance(fragmentInstances: FragmentInstance[], index: number) {
    if (index > 0) {
      this.moveFragment(fragmentInstances, index, index - 1);
      this.layoutChange.emit(this._layout);
    }
  }

  private moveFragment(fragments, from: number, to: number): void {
    const elem = fragments[from];
    fragments.splice(from, 1);
    fragments.splice(to, 0, elem);
  }
}
