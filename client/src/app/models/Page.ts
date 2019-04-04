import {Layout} from "./Layout";

export class Page {
  _id?: string;
  url: string;
  layout: Layout;
  level: number;
  children: Page[];

  constructor() {
    this.url = '';
    this.layout = new Layout();
    this.children = [];
    this.level = 0;
  }
}
