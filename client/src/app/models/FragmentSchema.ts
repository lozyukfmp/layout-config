import {PreferenceSchema} from './PreferencesSchema';
import {BaseEntity} from "./BaseEntity";

export class FragmentSchema extends BaseEntity{
  name: string;
  description?: string;
  renderTag: string;
  isCustom: boolean;
  customContent: string;
  hasPreferences: boolean;
  preferenceSchemas: PreferenceSchema[];
  portalName: string;

  constructor() {
    super();

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
