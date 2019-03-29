import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FragmentInstance} from "../../../models/FragmentInstance";
import {Preferences} from "../../../models/Preferences";
import {PreferencesType} from "../../../models/PreferencesType";

@Component({
  selector: 'preferences-dialog',
  templateUrl: 'preferences-dialog.component.html',
  styleUrls: ['./preferences-dialog.component.less']
})
export class PreferencesDialogComponent {
  public _fragment: FragmentInstance;
  public _instancePreferencesValues: any = {};
  public _instancePreferences: Preferences;
  public _preferencesDefinition: PreferencesType[];

  constructor(
    public dialogRef: MatDialogRef<PreferencesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this._fragment = data.fragment;
    this._preferencesDefinition = this._fragment.fragmentType.preferencesDefinition;
    this._instancePreferences = this.checkAndGetPreferencesValues(data.preferences, this._fragment, data.tenant);
    this._instancePreferencesValues = this._instancePreferences.values;
  }

  _onCancelClick(): void {
    this.dialogRef.close();
  }

  private checkAndGetPreferencesValues(preferences: Preferences[], fragment: FragmentInstance, tenant:string) {
    let matchedPref = preferences.filter(item => item.fragmentInstanceId == fragment.instanceId);
    if (matchedPref.length > 0) {
      return matchedPref[0]
    } else {
      let values = {};
      fragment.fragmentType.preferencesDefinition.forEach( def=> {
        values[ def.key ] = def.defaultValue;
      });
      return new Preferences(fragment.instanceId, tenant, fragment.fragmentType, values);
    }
  }
}
