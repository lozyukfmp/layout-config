import {Fragment} from "./Fragment";

export class Preferences {
  _id?: string;
  fragmentInstanceId: string;
  tenant: string;
  fragment: Fragment;
  values: any[];
}
