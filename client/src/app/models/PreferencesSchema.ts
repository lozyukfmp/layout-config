export class PreferenceSchema {
  _id?: string;
  key: string;
  displayName: string;
  type: any;
  defaultValue: any = 'default';
}
