import {FragmentSchema} from './FragmentSchema';

export class FragmentInstance {
  _id?: string;
  fragmentSchema: FragmentSchema;
  preferenceValues: {[key: string]: string};
  constructor(fragmentSchema: FragmentSchema) {
    this.fragmentSchema = fragmentSchema;
    this.preferenceValues = {};
  }
}
