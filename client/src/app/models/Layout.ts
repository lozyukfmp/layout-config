import {FragmentInstance} from "./FragmentInstance";

export class Layout {
  _id?: string;
  name: string;
  tenant: string;
  structure: LayoutStructure;
  innerHtml: string;
  portalName: string;

  constructor() {
    this.name = "";
    this.tenant = "DEFAULT";
    this.structure = new LayoutStructure();
    this.innerHtml = "";
    this.portalName = "";
  }
}

export class LayoutColumn {
  cssClass: string;
  fragments: FragmentInstance[];
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
