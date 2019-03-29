import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FragmentInstance} from "../../../models/FragmentInstance";
import {Preferences} from "../../../models/Preferences";

@Component({
  selector: 'preferences-dialog',
  templateUrl: 'preferences-dialog.component.html',
  styleUrls: ['./preferences-dialog.component.less']
})
export class PreferencesDialogComponent {
  public _fragment: FragmentInstance;
  public _preferences: Preferences[] = [];
  public _tenant: string;

  constructor(
    public dialogRef: MatDialogRef<PreferencesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this._fragment = data.fragment;
    this._preferences = data.preferences;
    this._tenant = data.tenant;
  }

  _onCancelClick(): void {
    this.dialogRef.close();
  }

}
