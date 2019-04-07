import {BaseEntity} from "./BaseEntity";

export class PreferenceSchema extends BaseEntity {
  key: string;
  displayName: string;
  type: any;
  defaultValue: any = 'default';
}
