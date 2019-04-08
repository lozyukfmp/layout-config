import {Fragment} from './Fragment';

export class FragmentInstance {
  _id?: string;
  instanceId: string;
  fragmentType: Fragment;
  constructor(  fragmentType: Fragment) {
    this.fragmentType = fragmentType;
    this.instanceId = new Date().getTime().toString();
  }
}
