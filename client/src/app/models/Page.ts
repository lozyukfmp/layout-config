import {Layout} from './Layout';

export class Page {
  _id?: string;
  name: string;
  portalName: string;
  level: number;
  layouts: Layout[] = [];
  children: Page[] = [];

  constructor() {
    this.name = '';
    this.portalName = '';
    this.level = 0;
    this.layouts.push(new Layout());
  }
}
