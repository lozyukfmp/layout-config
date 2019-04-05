import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FragmentInstance} from '../../../../models/FragmentInstance';

@Component({
  selector: 'preferences-dialog',
  templateUrl: 'preferences-dialog.component.html',
  styleUrls: ['./preferences-dialog.component.less']
})
export class PreferencesDialogComponent {
  public fragmentInstance: FragmentInstance;

  constructor(
    public dialogRef: MatDialogRef<PreferencesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.fragmentInstance = data.fragmentInstance;
  }

  _onCancelClick(): void {
    this.dialogRef.close();
  }
}
