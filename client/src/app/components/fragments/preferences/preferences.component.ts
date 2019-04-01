import {Component, Input, OnInit} from "@angular/core";
import {PreferencesType} from "../../../models/PreferencesType";

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.less']
})
export class PreferencesComponent implements OnInit {

  @Input() public preferencesDefinitions: PreferencesType[];

  public newPref: PreferencesType = new PreferencesType();
  public types: string[] = ['number', 'string', 'boolean', 'array'];

  ngOnInit(): void {
  }

  addPref() {
    this.preferencesDefinitions.push(this.newPref);
    this.newPref = new PreferencesType();
  }

  removePref(pref: PreferencesType) {
    this.preferencesDefinitions = this.preferencesDefinitions.filter(item => item.key != pref.key);
  }
}
