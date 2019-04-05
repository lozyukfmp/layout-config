import {Layout} from './Layout';

export class Page {
  _id?: string;
  name: string;
  innerHtml: string;
  portalName: string;
  layouts: Layout[] = [];

  constructor() {
    this.layouts.push(new Layout());
  }
}
