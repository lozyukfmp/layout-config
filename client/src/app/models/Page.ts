import {Layout} from './Layout';
import {BaseEntity} from "./BaseEntity";

export class Page extends BaseEntity {
  name: string;
  innerHtml: string;
  portalName: string;
  layouts: Layout[] = [];

  constructor() {
    super();

    this.layouts.push(new Layout());
  }
}
