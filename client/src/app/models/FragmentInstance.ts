import {FragmentSchema} from './FragmentSchema';
import {BaseEntity} from "./BaseEntity";

export class FragmentInstance extends BaseEntity{
  fragmentSchema: FragmentSchema;
  preferenceValues: {[key: string]: string};
  constructor(fragmentSchema: FragmentSchema) {
    super();
    this.fragmentSchema = fragmentSchema;
    this.preferenceValues = {};
  }
}
