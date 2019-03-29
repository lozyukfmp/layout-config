import {Fragment} from "./Fragment";

export class Preferences {
  _id?: string;
  fragmentInstanceId: string;
  tenant: string;
  fragment: Fragment;
  values: any;

  constructor(fragmentInstanceId: string, tenant: string, fragment: Fragment, values: any) {
    this.fragmentInstanceId = fragmentInstanceId;
    this.tenant = tenant;
    this.fragment = fragment;
    this.values = values;
  }
}
