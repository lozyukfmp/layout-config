import {PreferencesType} from "./PreferencesType";

export class Fragment {
  _id?: string;
  name: string;
  description?: string;
  renderTag: string;
  isCustom: boolean;
  customContent: string;
  hasPreferences: boolean;
  preferencesDefinition: PreferencesType[];

  constructor() {
    this.isCustom = false;
    this.name = "";
    this.description = "";
    this.renderTag = "";
    this.customContent = "";
    this.hasPreferences = false;
    this.preferencesDefinition = [];
  }
}
