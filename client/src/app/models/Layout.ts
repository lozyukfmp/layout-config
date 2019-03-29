import {Fragment} from "./Fragment";

export class Layout {
  _id?: string;
  name: string;
  structure: LayoutStructure;
  description?: string;
  innerHtml: string;

  constructor() {
    this.name = "";
    this.structure = new LayoutStructure();
    this.description = "";
    this.innerHtml = "1";
  }
}

export class LayoutColumn {
  cssClass: string;
  fragments: Fragment[];
}

export class LayoutRow {
  maxWidth: string;
  columns: LayoutColumn[];
}

export class LayoutStructure {
  headFragments: Fragment[];
  rows: LayoutRow[];

  constructor() {
    this.headFragments = [];
    this.rows = [];
    const row1 = {
      maxWidth: '1200px',
      columns: [{cssClass: "col col-100", fragments: []}]
    };
    const row2 = {
      maxWidth: '1200px',
      columns: [
        {cssClass: "col col-70", fragments: []},
        {cssClass: "col col-30", fragments: []}
      ]
    };
    const row3 = {
      maxWidth: '1200px',
      columns: [
        {cssClass: "col col-50", fragments: []},
        {cssClass: "col col-50", fragments: []}
      ]
    };
    const row4 = {
      maxWidth: '1200px',
      columns: [
        {cssClass: "col col-30", fragments: []},
        {cssClass: "col col-70", fragments: []}
      ]
    };
    const row5 = {
      maxWidth: '1200px',
      columns: [{cssClass: "col col-100", fragments: []}]
    };
    this.rows.push(row1, row2, row3, row4, row5);
  }
}
