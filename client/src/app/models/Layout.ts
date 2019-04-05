import {FragmentInstance} from './FragmentInstance';

export class Layout {
  _id?: string;
  tenant: string;
  innerHtml: string;
  structure: LayoutStructure;

  constructor() {
    this.tenant = 'DEFAULT';
    this.structure = new LayoutStructure();
  }
}

export class LayoutColumn {
  cssClass: string;
  fragmentInstances: FragmentInstance[];
}

export class LayoutRow {
  maxWidth: string;
  columns: LayoutColumn[];
}

export class LayoutStructure {
  rows: LayoutRow[];
  constructor() {
    this.rows = [];
    const row1 = {
      maxWidth: '1200px',
      columns: [{cssClass: 'col col-100', fragmentInstances: []}]
    };
    const row2 = {
      maxWidth: '1200px',
      columns: [
        {cssClass: 'col col-70', fragmentInstances: []},
        {cssClass: 'col col-30', fragmentInstances: []}
      ]
    };
    const row3 = {
      maxWidth: '1200px',
      columns: [
        {cssClass: 'col col-50', fragmentInstances: []},
        {cssClass: 'col col-50', fragmentInstances: []}
      ]
    };
    const row4 = {
      maxWidth: '1200px',
      columns: [
        {cssClass: 'col col-30', fragmentInstances: []},
        {cssClass: 'col col-70', fragmentInstances: []}
      ]
    };
    const row5 = {
      maxWidth: '1200px',
      columns: [{cssClass: 'col col-100', fragmentInstances: []}]
    };
    this.rows.push(row1, row2, row3, row4, row5);
  }
}
