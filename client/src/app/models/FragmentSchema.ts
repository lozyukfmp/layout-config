import {PreferenceSchema} from './PreferencesSchema';

export class FragmentSchema {
  _id?: string;
  name: string;
  description?: string;
  renderTag: string;
  isCustom: boolean;
  customContent: string;
  hasPreferences: boolean;
  preferenceSchemas: PreferenceSchema[];
  portalName: string;

  constructor() {
    this.isCustom = false;
    this.name = '';
    this.description = '';
    this.renderTag = '';
    this.customContent = '';
    this.hasPreferences = false;
    this.preferenceSchemas = [];
    this.portalName = '';
  }
}
