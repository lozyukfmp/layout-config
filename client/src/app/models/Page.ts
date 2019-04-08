import {Layout} from './Layout';

export class Page {
  _id?: string;
  name: string;
  portalName: string;
  layouts: Layout[] = [];
  pages: Page[];

  constructor() {
    this.layouts.push(new Layout());
  }
}
