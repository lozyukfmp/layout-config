import {Component, Input, OnInit} from '@angular/core';
import {PreferenceSchema} from '../../../models/PreferencesSchema';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.less']
})
export class PreferencesComponent implements OnInit {

  @Input() public preferencesDefinitions: PreferenceSchema[];

  public newPref: PreferenceSchema = new PreferenceSchema();
  public types: string[] = ['number', 'string', 'boolean', 'array'];

  ngOnInit(): void {}

  addPref() {
    this.preferencesDefinitions.push(this.newPref);
    this.newPref = new PreferenceSchema();
  }

  removePref(pref: PreferenceSchema, index: number) {
    this.preferencesDefinitions = this.preferencesDefinitions.filter((_, i) => i !== index);
  }
}
